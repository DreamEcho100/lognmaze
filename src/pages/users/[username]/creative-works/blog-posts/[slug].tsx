import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeoProps, ArticleJsonLd } from 'next-seo';

import { useState } from 'react';
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
import { drizzleClient } from '@server/utils/drizzle/orm';

const GoogleAdSenseHResponsiveImageV1 = dynamic(
	() => import('@components/shared/common/GoogleAdSense/HResponsiveImageV1')
);

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
			{/* author: creativeWork.author?.profile
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
						}, */}
			<CustomNextSeo
				title={`${creativeWork.typeData.title} | ${defaultSiteName}`}
				description={creativeWork.typeData.description}
				openGraph={{
					type: 'article',
					locale: `${creativeWork.typeData.languageTag.code.toLowerCase()}-${creativeWork.typeData.languageTag.countryCode.toUpperCase()}`,
					article: {
						publishedTime: creativeWork.createdAt.toISOString(),
						modifiedTime: creativeWork.typeData.updatedAt?.toISOString(),
						authors: creativeWork.author?.name
							? [`${websiteBasePath}/users/${creativeWork.author.name}`]
							: undefined
						// tags: creativeWork.tags.map((tag) => tag.name)
					},
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

			<ArticleJsonLd
				type='BlogPosting'
				url={creativeWork.typeData.title}
				title={fullPathName}
				images={[creativeWork.typeData.thumbnailUrl]}
				datePublished={creativeWork.createdAt.toISOString()}
				dateModified={
					creativeWork.typeData.updatedAt?.toISOString() || undefined
				}
				// keywords={creativeWork.tags.map((tag) => tag.name).join(',')}
				authorName={creativeWork.author?.name}
				description={creativeWork.typeData.description}
				inLanguage={creativeWork.typeData.languageTag.code}
				commentCount={0}
			/>

			<CreativeWorkComp
				compProps={{
					thumbnailProps: { priority: true },
					authorProfilePictureProps: { priority: true }
				}}
				MdContentFormatterComp={MdToHTMLFormatter}
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
							...((props.updatedCreativeWork || {}) satisfies Partial<
								Omit<TCreativeWorkBlogPost, 'tags'>
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
	const paths = await drizzleClient.query
		.blogPost!.findMany({
			columns: { slug: true },
			with: {
				creativeWork: {
					columns: {},
					with: { author: { columns: { name: true } } }
				}
			}
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

	// const _blogPost = await prisma.blogPost.findFirst({
	// 	include: {
	// 		creativeWork: {
	// 			include: {
	// 				tags: true,
	// 				author: {
	// 					select: {
	// 						name: true,
	// 						profile: {
	// 							select: {
	// 								firstName: true,
	// 								lastName: true,
	// 								education: true,
	// 								work: true,
	// 								profilePicture: true
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		},
	// 		languageTag: true
	// 	},
	// 	where: {
	// 		slug,
	// 		AND: {
	// 			creativeWork: {
	// 				status: CreativeWorkStatus.PUBLIC
	// 			}
	// 		}
	// 	}
	// });

	// console.log('\n\n\n');
	// console.log(CreativeWorkStatus.PUBLIC);
	const _blogPost = await drizzleClient.query.blogPost.findFirst({
		where: (blogPost, { eq, sql, and }) => eq(blogPost.slug, slug),
		// and(
		// 	eq(blogPost.slug, slug),
		// 	sql`("creativeWork"::json -> 0 -> 2) = ${CreativeWorkStatus.PUBLIC}`
		// ),
		with: {
			creativeWork: {
				with: {
					author: {
						columns: { name: true },
						with: {
							profile: {
								columns: {
									firstName: true,
									lastName: true,
									education: true,
									work: true,
									profilePicture: true
								}
							}
						}
					},
					tagsToBlogPosts: true
				}
				// where: (creativeWork, { eq }) =>
				// 	eq(creativeWork.status, CreativeWorkStatus.PUBLIC)
			},
			languageTag: true
		}
	});
	// console.log('\n\n\n');

	if (_blogPost?.creativeWork?.status !== CreativeWorkStatus.PUBLIC)
		return { notFound: true };

	_blogPost.creativeWork.tagsToBlogPosts;

	const { creativeWork, ...blogPost } = _blogPost;

	if (!blogPost?.id) return { notFound: true };

	return {
		props: {
			creativeWork: {
				...creativeWork,
				tags: creativeWork.tagsToBlogPosts.map((item) => ({
					name: item.tagName
				})),
				type: CreativeWorkType.BLOG_POST,
				typeData: {
					...blogPost,
					creativeWork: { id: creativeWork.id }
				}
			} satisfies TCreativeWorkBlogPost
		},
		revalidate: 5 * 60
	};
};

export default BlogPostPage;
