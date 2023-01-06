import { CreativeWorkType } from '@prisma/client';

import { trpcAPI } from '@utils/trpc';

import slug from 'slug';

import type { TOnAddingCreativeWork } from '../utils/ts';

import type { BlogPostFormProps } from '.';
import BlogPostForm from '.';

export type CreateBlogPostFormProps = Omit<
	BlogPostFormProps,
	'handleOnSubmit'
> & { authorId: string; onAddingCreativeWork?: TOnAddingCreativeWork };

const CreateBlogPostForm = ({
	authorId,
	onAddingCreativeWork,
	...props
}: CreateBlogPostFormProps) => {
	const createBlogPost =
		trpcAPI.creativeWorks.authors.blogPosts.createOne.useMutation();

	return (
		<>
			<BlogPostForm
				{...props}
				handleOnSubmit={async (event, data) => {
					event.preventDefault();

					const input = {
						authorId,
						typeData: data.typeData,
						tags: data.tags,
						status: data.creativeWork.status
					};

					return await createBlogPost
						.mutateAsync(input)
						.then((result) => {
							onAddingCreativeWork?.({
								slug: slug(result.blogPost.title),
								type: CreativeWorkType.BLOG_POST,
								input,
								creativeWorkId: result.id,
								typeDataId: result.blogPost.id
							});
							return true;
						})
						.catch(() => false);
				}}
				resetFormOnSuccessfulSubmission
				isDisabled={createBlogPost.isLoading || props.isDisabled}
			/>
			{createBlogPost.isError && (
				<p>
					{createBlogPost.error.message.startsWith('[')
						? JSON.parse(createBlogPost.error.message)
								.map((item: { message: string }) => item.message)
								.join('\n')
						: createBlogPost.error.message}
				</p>
			)}
		</>
	);
};

export default CreateBlogPostForm;
