import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { TCreativeWorkBlogPost } from '@ts/index';
import type { BlogPosting } from 'schema-dts';
import type { NextSeoProps } from 'next-seo';

import { useState } from 'react';
import { jsonLdScriptProps } from 'react-schemaorg';
import { prisma } from '@server/db/client';
import { z } from 'zod';
import { CreativeWorkStatus, CreativeWorkType } from '@prisma/client';
import { CreativeWorkComp } from '@components/shared/core/CreativeWorks';
import Head from 'next/head';
import CustomNextSeo from '@components/shared/common/CustomNextSeo';
import { defaultSiteName, websiteBasePath } from '@utils/core/app';
import { useGetFullURLPathName } from '@components/shared/common/hooks';
import { useRouter } from 'next/router';

type BlogPostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const BlogPostPage = (props: BlogPostPageProps) => {
	const router = useRouter();
	const fullPathName = useGetFullURLPathName();

	const [creativeWork, setCreativeWork] = useState(props.creativeWork);

	if (
		!creativeWork?.status ||
		creativeWork.status === CreativeWorkStatus.DELETED
	)
		return (
			<section className='section-p-y xl-2-sm:section-p mx-auto w-full max-w-[120ch]'>
				<h1>Deleted</h1>
			</section>
		);

	return (
		<section className='section-p-y xl-2-sm:section-p mx-auto w-full max-w-[120ch]'>
			{/* https://developers.google.com/search/docs/appearance/structured-data/ */}
			<Head>
				<script
					id='jsonLdBlogPostingScript'
					{...jsonLdScriptProps<BlogPosting>({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						name: creativeWork.typeData.title,
						url: fullPathName,
						description: creativeWork.typeData.description,
						commentCount: 0,
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': fullPathName
						},
						inLanguage: creativeWork.typeData.languageTag.code,
						headline: creativeWork.typeData.title,
						image: creativeWork.typeData.thumbnailUrl,
						author: creativeWork.author?.profile
							? {
									'@type': 'Person',
									name: `${creativeWork.author.profile.firstName} ${creativeWork.author.profile.lastName} - ${creativeWork.author.name}`,
									url: `${websiteBasePath}/users/${creativeWork.author.name}`, // creativeWork.author.profile.profilePicture || undefined,
									jobTitle: creativeWork.author.profile.work || undefined
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
						},
						datePublished: creativeWork.createdAt.toISOString(),
						dateModified:
							creativeWork.typeData.updatedAt?.toISOString() || undefined,
						keywords: creativeWork.tags.map((tag) => tag.name).join(',')
						// aggregateRating: {
						// 	'@type': 'AggregateRating',
						// 	ratingValue: 5,
						// 	ratingCount: 1
						// }
					})}
				/>
			</Head>
			<CustomNextSeo
				title={`${creativeWork.typeData.title} | ${defaultSiteName}`}
				description={creativeWork.typeData.description}
				openGraph={{
					images: (() => {
						const images: NonNullable<NextSeoProps['openGraph']>['images'] = [
							{
								url: creativeWork.typeData.thumbnailUrl,
								alt: creativeWork.typeData.title,
								width: 800,
								height: 500
							}
						];

						// if (creativeWork.author?.profile?.profilePicture)
						// 	images.push(creativeWork.author?.profile?.profilePicture);

						return images;
					})()
				}}
			/>

			<CreativeWorkComp
				compProps={{
					thumbnailProps: { priority: true },
					authorProfilePictureProps: { priority: true }
				}}
				data={creativeWork}
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
							tags: [
								...(Array.isArray(removedTags) && removedTags.length !== 0
									? prevData.tags.filter((tag) =>
											removedTags.includes(tag.name)
									  )
									: prevData.tags),
								...(addedTags || []).map((tagName) => ({
									name: tagName
								}))
							],
							...((props.updatedCreativeWork || {}) as any),
							typeData: {
								...prevData.typeData,
								...(props.updatedTypeData || {})
							}
						};
					});
				}}
			/>
		</section>
	);
};

export const getStaticPaths = async () => {
	const paths = await prisma.blogPost
		.findMany({
			select: {
				slug: true,
				creativeWork: { select: { author: { select: { name: true } } } }
			},
			where: { creativeWork: { status: CreativeWorkStatus.PUBLIC } }
		})
		.then((result) =>
			result.map((blogPost) => ({
				params: {
					slug: blogPost.slug,
					username: blogPost.creativeWork.author.name
				}
			}))
		);

	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<{
	creativeWork: TCreativeWorkBlogPost;
}> = async ({ params }) => {
	const result = await z
		.object({ slug: z.string(), username: z.string() })
		.safeParseAsync(params);

	if (!result.success) return { notFound: true };

	const slug = result.data.slug;

	const _blogPost = await prisma.blogPost.findFirst({
		include: {
			creativeWork: {
				include: {
					tags: true,
					author: {
						select: {
							name: true,
							profile: {
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
			languageTag: true
		},
		where: {
			slug,
			AND: {
				creativeWork: {
					status: CreativeWorkStatus.PUBLIC
				}
			}
		}
	});

	if (!_blogPost) return { notFound: true };

	const { creativeWork, ...blogPost } = _blogPost;

	if (!blogPost?.id) return { notFound: true };

	return {
		props: {
			creativeWork: {
				...creativeWork,
				type: CreativeWorkType.BLOG_POST,
				typeData: blogPost
			} satisfies TCreativeWorkBlogPost
		},
		revalidate: 5 * 60
	};
};

export default BlogPostPage;
