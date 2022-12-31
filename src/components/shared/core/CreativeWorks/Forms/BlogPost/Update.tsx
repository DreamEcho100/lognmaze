import type { BlogPostFormProps } from '.';

import { trpcAPI } from '@utils/trpc';
import BlogPostForm from '.';
import { objChanges } from '@utils/common/ds/objects';
import { arrChanges } from '@utils/common/ds/array';
import { CreativeWorkType } from '@prisma/client';
import { useCreativeWorkSharedState } from '../..';

export type UpdateBlogPostFormProps = Omit<
	Omit<
		BlogPostFormProps,
		'typeDataDefaults' | 'creativeWorkDefaults' | 'tagsDefaults'
	> & {
		typeDataDefaults: NonNullable<BlogPostFormProps['typeDataDefaults']>;
		creativeWorkDefaults: NonNullable<
			BlogPostFormProps['creativeWorkDefaults']
		>;
		tagsDefaults: NonNullable<BlogPostFormProps['tagsDefaults']>;
	},
	'handleOnSubmit'
> & { authorId: string; creativeWorkId: string };

const UpdateBlogPostForm = ({
	authorId,
	creativeWorkId,
	...props
}: UpdateBlogPostFormProps) => {
	const { onUpdatingCreativeWork } = useCreativeWorkSharedState();
	const updateBlogPost =
		trpcAPI.creativeWorks.authors.blogPosts.updateOne.useMutation();

	return (
		<>
			<BlogPostForm
				{...props}
				handleOnSubmit={async (event, data) => {
					event.preventDefault();

					if (!props.typeDataDefaults) return false;

					const { added: addedTags, removed: removedTags } = arrChanges(
						props.tagsDefaults.map((tag) => tag.value),
						data.tags
					);

					const updatedTypeData = objChanges(
						props.typeDataDefaults,
						data.typeData
					);
					const updatedCreativeWork = objChanges(
						props.creativeWorkDefaults,
						data.creativeWork
					);

					let tags:
						| { added: string[] | undefined; removed: string[] | undefined }
						| undefined = {
						added: addedTags.length !== 0 ? addedTags : undefined,
						removed: removedTags.length !== 0 ? removedTags : undefined
					};
					if (Object.keys(tags).length === 0) tags = undefined;

					let creativeWorkBasics: typeof updatedCreativeWork | undefined =
						updatedCreativeWork;
					if (Object.keys(creativeWorkBasics).length === 0)
						creativeWorkBasics = undefined;

					let typeData: typeof updatedTypeData | undefined = updatedTypeData;
					if (Object.keys(typeData).length === 0) typeData = undefined;

					return await updateBlogPost
						.mutateAsync({
							authorId,
							creativeWorkId,
							tags,
							creativeWorkBasics,
							typeData
						})
						.then(() => {
							onUpdatingCreativeWork({
								authorId,
								creativeWorkId,
								updatedCreativeWork,
								addedTags,
								removedTags,
								type: CreativeWorkType.BLOG_POST,
								updatedTypeData
							});

							return true;
						})
						.catch(() => false);
				}}
				disabled={updateBlogPost.isLoading || props.disabled}
				creativeWorkDataToGetContentFor={{
					creativeWorkId,
					authorId
				}}
				handleOnUpdatingCreativeWork={(result) => {
					onUpdatingCreativeWork({
						authorId,
						creativeWorkId,
						updatedTypeData: { content: result.content },
						type: CreativeWorkType.BLOG_POST,
						updatedCreativeWork: undefined
					});
				}}
			/>
			{updateBlogPost.isError && (
				<p>
					{updateBlogPost.error.message.startsWith('[')
						? JSON.parse(updateBlogPost.error.message)
								.map((item: { message: string }) => item.message)
								.join('\n')
						: updateBlogPost.error.message}
				</p>
			)}
		</>
	);
};

export default UpdateBlogPostForm;
