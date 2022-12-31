import type { PostFormProps } from '.';

import { trpcAPI } from '@utils/trpc';
import PostForm from '.';
import { objChanges } from '@utils/common/ds/objects';
import { arrChanges } from '@utils/common/ds/array';
import { useCreativeWorkSharedState } from '../..';
import { CreativeWorkType } from '@prisma/client';

export type UpdatePostFormProps = Omit<
	Omit<
		PostFormProps,
		'typeDataDefaults' | 'creativeWorkDefaults' | 'tagsDefaults'
	> & {
		typeDataDefaults: NonNullable<PostFormProps['typeDataDefaults']>;
		creativeWorkDefaults: NonNullable<PostFormProps['creativeWorkDefaults']>;
		tagsDefaults: NonNullable<PostFormProps['tagsDefaults']>;
	},
	'handleOnSubmit'
> & { authorId: string; creativeWorkId: string };

const UpdatePostForm = ({
	authorId,
	creativeWorkId,
	...props
}: UpdatePostFormProps) => {
	const { onUpdatingCreativeWork } = useCreativeWorkSharedState();
	const updatePost =
		trpcAPI.creativeWorks.authors.posts.updateOne.useMutation();

	return (
		<>
			<PostForm
				{...props}
				handleOnSubmit={async (event, data) => {
					event.preventDefault();

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

					return await updatePost
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
								type: CreativeWorkType.POST,
								updatedTypeData
							});

							return true;
						})
						.catch(() => false);
				}}
				disabled={updatePost.isLoading || props.disabled}
			/>
			{updatePost.isError && (
				<p>
					{updatePost.error.message.startsWith('[')
						? JSON.parse(updatePost.error.message)
								.map((item: { message: string }) => item.message)
								.join('\n')
						: updatePost.error.message}
				</p>
			)}
		</>
	);
};

export default UpdatePostForm;
