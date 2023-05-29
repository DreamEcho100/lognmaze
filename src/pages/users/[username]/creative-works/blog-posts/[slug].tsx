import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeoProps, ArticleJsonLd } from 'next-seo';

import { useState } from 'react';
import { prisma } from '@server/db/client';
import { z } from 'zod';
import { CreativeWorkStatus, CreativeWorkType } from '@prisma/client';
import { CreativeWorkComp } from '@components/shared/core/CreativeWorks';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { defaultSiteName, websiteBasePath } from '@utils/core/app';
import { useGetFullURLPathName } from '@components/shared/common/hooks';
import { useRouter } from 'next/router';
import MdToHTMLFormatter from '@components/shared/common/Format/MdToHTML';

import dynamic from 'next/dynamic';
import { TCreativeWorkBlogPost } from '@ts/index';

const GoogleAdSenseHResponsiveImageV1 = dynamic(
	() => import('@components/shared/common/GoogleAdSense/HResponsiveImageV1')
);

type BlogPostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPostPage = (props: BlogPostPageProps) => {
	const router = useRouter();
	const fullPathName = useGetFullURLPathName();

	const [CreativeWork, setCreativeWork] = useState(props.CreativeWork);

	if (
		!CreativeWork?.status ||
		CreativeWork.status === CreativeWorkStatus.DELETED
	)
		return (
			<section className='section-p-y xl-2-sm:section-p mx-auto w-full max-w-[120ch]'>
				<h1>Deleted</h1>
			</section>
		);

	return (
		<section className='section-p-y xl-2-sm:section-p mx-auto w-full max-w-[120ch]'>
			{/* author: CreativeWork.Author?.Profile
							? {
									'@type': 'Person',
									name: `${CreativeWork.Author.Profile.firstName} ${CreativeWork.Author.Profile.lastName} - ${CreativeWork.Author.name}`,
									url: `${websiteBasePath}/users/${CreativeWork.Author.name}`, // CreativeWork.Author.Profile.profilePicture || undefined,
									jobTitle: CreativeWork.Author.Profile.work || undefined
							  }
							: undefined,
						publisher: {
							'@type': 'Organization',
							name: defaultSiteName,
							logo: {
								'@type': 'ImageObject',
								url: `${websiteBasePath}/favicon.ico`
							},
							url: websiteBasePath
						}, */}
			<CustomNextSeo
				title={`${CreativeWork.typeData.title} | ${defaultSiteName}`}
				description={CreativeWork.typeData.description}
				openGraph={{
					type: 'article',
					locale: `${CreativeWork.typeData.LanguageTag.code.toLowerCase()}-${CreativeWork.typeData.LanguageTag.countryCode.toUpperCase()}`,
					article: {
						publishedTime: CreativeWork.createdAt.toISOString(),
						modifiedTime: CreativeWork.typeData.updatedAt?.toISOString(),
						authors: CreativeWork.Author?.name
							? [`${websiteBasePath}/users/${CreativeWork.Author.name}`]
							: undefined,
						tags: CreativeWork.Tags.map((tag) => tag.name)
					},
					images: (() => {
						const images: NonNullable<NextSeoProps['openGraph']>['images'] = [
							{
								url: CreativeWork.typeData.thumbnailUrl,
								alt: CreativeWork.typeData.title,
								width: 800,
								height: 500
							}
						];

						// if (CreativeWork.Author?.Profile?.profilePicture)
						// 	images.push(CreativeWork.Author?.Profile?.profilePicture);

						return images;
					})()
				}}
			/>

			<ArticleJsonLd
				type='BlogPosting'
				url={CreativeWork.typeData.title}
				title={fullPathName}
				images={[CreativeWork.typeData.thumbnailUrl]}
				datePublished={CreativeWork.createdAt.toISOString()}
				dateModified={
					CreativeWork.typeData.updatedAt?.toISOString() || undefined
				}
				keywords={CreativeWork.Tags.map((tag) => tag.name).join(',')}
				authorName={CreativeWork.Author?.name}
				description={CreativeWork.typeData.description}
				inLanguage={CreativeWork.typeData.LanguageTag.code}
				commentCount={0}
			/>

			<CreativeWorkComp
				compProps={{
					thumbnailProps: { priority: true },
					authorProfilePictureProps: { priority: true }
				}}
				MdContentFormatterComp={MdToHTMLFormatter}
				data={CreativeWork}
				displayMode='FULL'
				onDeletingCreativeWork={() => {
					setCreativeWork((prevData) => ({
						...prevData,
						status: CreativeWorkStatus.DELETED
					}));
					router.push('/');
				}}
				onUpdatingCreativeWork={(props) => {
					setCreativeWork((prevData) => {
						if (!prevData) return prevData;

						const removedTags = props.removedTags;
						const addedTags = props.addedTags;

						return {
							...prevData,
							Tags: [
								...(Array.isArray(removedTags) && removedTags.length !== 0
									? prevData.Tags.filter((tag) =>
											removedTags.includes(tag.name)
									  )
									: prevData.Tags),
								...(addedTags || []).map((tagName) => ({
									name: tagName
								}))
							],
							...((props.updatedCreativeWork || {}) satisfies Partial<
								Omit<TCreativeWorkBlogPost, 'Tags'>
							>),
							typeData: {
								...prevData.typeData,
								...(props.updatedTypeData || {})
							}
						};
					});
				}}
			/>
			<GoogleAdSenseHResponsiveImageV1 />
		</section>
	);
};

export const getStaticPaths = async () => {
	const paths = await prisma.blogPost
		.findMany({
			select: {
				slug: true,
				CreativeWork: { select: { Author: { select: { name: true } } } }
			},
			where: { CreativeWork: { status: CreativeWorkStatus.PUBLIC } }
		})
		.then((result) =>
			result.map((BlogPost) => ({
				params: {
					slug: BlogPost.slug,
					username: BlogPost.CreativeWork.Author.name
				}
			}))
		);

	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<{
	CreativeWork: TCreativeWorkBlogPost;
}> = async ({ params }) => {
	const result = await z
		.object({ slug: z.string(), username: z.string() })
		.safeParseAsync(params);

	if (!result.success) return { notFound: true };

	const slug = result.data.slug;

	const _blogPost = await prisma.blogPost.findFirst({
		include: {
			CreativeWork: {
				include: {
					Tags: true,
					Author: {
						select: {
							name: true,
							Profile: {
								select: {
									firstName: true,
									lastName: true,
									education: true,
									work: true,
									profilePicture: true
								}
							}
						}
					}
				}
			},
			LanguageTag: true
		},
		where: {
			slug,
			AND: {
				CreativeWork: {
					status: CreativeWorkStatus.PUBLIC
				}
			}
		}
	});

	if (!_blogPost) return { notFound: true };

	const { CreativeWork, ...BlogPost } = _blogPost;

	if (!BlogPost?.id) return { notFound: true };

	return {
		props: {
			CreativeWork: {
				...CreativeWork,
				type: CreativeWorkType.BLOG_POST,
				typeData: BlogPost
			} satisfies TCreativeWorkBlogPost
		},
		revalidate: 5 * 60
	};
};

export default BlogPostPage;
