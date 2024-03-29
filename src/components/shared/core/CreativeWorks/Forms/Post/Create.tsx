import type { PostFormProps } from '.';
import type { TOnAddingCreativeWork } from '../utils/ts';

import { trpcAPI } from '@utils/trpc';
import PostForm from '.';
import { CreativeWorkType } from '@prisma/client';

export type CreatePostFormProps = Omit<PostFormProps, 'handleOnSubmit'> & {
	authorId: string;
	onAddingCreativeWork?: TOnAddingCreativeWork;
};

const CreatePostForm = ({
	authorId,
	onAddingCreativeWork,
	...props
}: CreatePostFormProps) => {
	const createPost =
		trpcAPI.creativeWorks.authors.posts.createOne.useMutation();

	return (
		<>
			<PostForm
				{...props}
				handleOnSubmit={async (event, data) => {
					event.preventDefault();

					const input = {
						authorId,
						typeData: data.typeData,
						tags: data.tags,
						status: data.creativeWork.status
					};

					return await createPost
						.mutateAsync(input)
						.then((result) => {
							onAddingCreativeWork?.({
								type: CreativeWorkType.POST,
								input,
								result,
								creativeWorkId: result.id,
								typeDataId: result.Post.id
							});
							return true;
						})
						.catch(() => false);
				}}
				resetFormOnSuccessfulSubmission
				isDisabled={createPost.isLoading || props.isDisabled}
			/>
			{createPost.isError && (
				<p>
					{createPost.error.message.startsWith('[')
						? JSON.parse(createPost.error.message)
								.map((item: { message: string }) => item.message)
								.join('\n')
						: createPost.error.message}
				</p>
			)}
		</>
	);
};

export default CreatePostForm;
