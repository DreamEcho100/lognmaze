import type { Dispatch, SetStateAction } from 'react';
import type { TOnAddingCreativeWork } from './utils/ts';

import { Tab } from '@headlessui/react';
import { CreativeWorkType } from '@prisma/client/edge';
import CreateBlogPostForm from './BlogPost/Create';
import CreatePostForm from './Post/Create';
import { handleButtonVariants } from '@components/shared/common/Button';

const allowedFormsTypeIndex = {
	0: CreativeWorkType.BLOG_POST,
	1: CreativeWorkType.POST,
	2: CreativeWorkType.DISCUSSION_FORUM,
	3: CreativeWorkType.DISCUSSION_FORUM_POST
} as const;

export type AllowedFormTypeIndex = keyof typeof allowedFormsTypeIndex;

const isFormsTypeIndexAllowed = (
	index: number,
	isHidden: { blogPost?: boolean } = {}
): index is AllowedFormTypeIndex =>
	(index === 0 && !isHidden.blogPost) ||
	index === 1 ||
	index === 2 ||
	index === 3;

type Props = {
	setSelectedIndex: Dispatch<SetStateAction<AllowedFormTypeIndex>>;
	selectedIndex: AllowedFormTypeIndex;
	blogPost?: boolean;
	post?: boolean;
	discussionForm?: boolean;
	discussionFormPost?: boolean;
	// | {
	// 	data: Omit<CreateBlogPostFormProps, 'authorId'>
	// }
	authorId: string;
	onAddingCreativeWork?: TOnAddingCreativeWork;
};

const CreateCreativeWork = ({
	authorId,
	selectedIndex,
	setSelectedIndex,
	blogPost,
	discussionForm,
	discussionFormPost,
	post,
	onAddingCreativeWork
}: Props) => {
	return (
		<Tab.Group
			selectedIndex={selectedIndex}
			onChange={(index) =>
				isFormsTypeIndexAllowed(index, {
					blogPost: !blogPost
				}) && setSelectedIndex(index)
			}
		>
			<Tab.List className='flex items-center justify-center gap-2'>
				<Tab className={handleButtonVariants({ p: 'sm' })} hidden={!blogPost}>
					Blog Post
				</Tab>
				<Tab className={handleButtonVariants({ p: 'sm' })} hidden={!post}>
					Post
				</Tab>
				<Tab
					className={handleButtonVariants({ p: 'sm' })}
					hidden={!discussionForm}
				>
					Tab 3
				</Tab>
				<Tab
					className={handleButtonVariants({ p: 'sm' })}
					hidden={!discussionFormPost}
				>
					Tab 4
				</Tab>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel hidden={!blogPost}>
					<CreateBlogPostForm
						authorId={authorId}
						onAddingCreativeWork={onAddingCreativeWork}
					/>
				</Tab.Panel>
				<Tab.Panel hidden={!post}>
					<CreatePostForm
						authorId={authorId}
						onAddingCreativeWork={onAddingCreativeWork}
					/>
				</Tab.Panel>
				<Tab.Panel hidden={!discussionForm}>Content 3</Tab.Panel>
				<Tab.Panel hidden={!discussionFormPost}>Content 4</Tab.Panel>
			</Tab.Panels>
		</Tab.Group>
	);
};

export default CreateCreativeWork;
