import type { LanguageTag } from '@prisma/client';
import type {
	TCreativeWorkBlogPost,
	TCreativeWorkDiscussionForum,
	TCreativeWorkDiscussionForumPost,
	TCreativeWorkNoType,
	TCreativeWorkPost,
	TCreativeWorkTypeData
} from '@ts/index';
import type { HTMLAttributes, CSSProperties } from 'react';
import type { BlogPostFormProps } from './Forms/BlogPost';
import type { PostFormProps } from './Forms/Post';
import type { CreativeWorkType } from '@prisma/client';

import { Fragment, useState } from 'react';
import CustomNextImage from '@components/shared/common/CustomNextImage';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import {
	isCreativeWorABlogPost,
	isCreativeWorAPost
} from '@utils/core/creative-works';
import { useTypedSession } from '@utils/common/hooks';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import UpdateCreativeWorkDialog from './Dialogs/Update';
import { createContainer } from 'react-tracked';
import DeleteCreativeWorkDialog from './Dialogs/Delete';
import MdToHTMLFormatter from '@components/shared/common/Format/MdToHTML';

const CreateWorkContainer = ({
	languageTag,
	...props
}: {
	languageTag?: LanguageTag | null;
} & HTMLAttributes<HTMLElement>) => {
	return (
		<article
			lang={
				languageTag
					? `${languageTag.code.toLowerCase()}-${languageTag.countryCode.toLowerCase()}`
					: undefined
			}
			className={cx(
				'border-[0.0625rem] border-solid border-theme-bg-900 border-opacity-25',
				'p-4',
				'flex flex-col gap-2',
				'xl-2-sm:rounded-lg',
				props.className
			)}
			{...props}
		></article>
	);
};

export const CreateWorkLoading = () => {
	return (
		<CreateWorkContainer className='flex flex-col gap-4 bg-theme-bg-500 p-4'>
			<div
				className='skeleton-loading'
				style={
					{
						'--skeleton-loading-w': '100%',
						'--skeleton-loading-h': '1rem'
					} as CSSProperties
				}
			></div>
			<div
				className='skeleton-loading'
				style={
					{
						'--skeleton-loading-w': '90%',
						'--skeleton-loading-h': '1rem'
					} as CSSProperties
				}
			></div>
			<div className='flex flex-wrap gap-2'>
				<div
					className='skeleton-loading h-16 w-16 rounded-full'
					style={
						{
							'--skeleton-loading-w': '4rem',
							'--skeleton-loading-h': '4rem'
						} as CSSProperties
					}
				></div>
				<div className='flex flex-grow flex-col gap-2 py-2'>
					<div
						className='skeleton-loading'
						style={
							{
								'--skeleton-loading-w': '40%',
								'--skeleton-loading-h': '1rem'
							} as CSSProperties
						}
					></div>
					<div
						className='skeleton-loading'
						style={
							{
								'--skeleton-loading-w': '35%',
								'--skeleton-loading-h': '1rem'
							} as CSSProperties
						}
					></div>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<div
					className='skeleton-loading'
					style={
						{
							'--skeleton-loading-w': '15%',
							'--skeleton-loading-h': '0.5rem'
						} as CSSProperties
					}
				></div>

				<div
					className='skeleton-loading'
					style={
						{
							'--skeleton-loading-w': '25%',
							'--skeleton-loading-h': '0.5rem'
						} as CSSProperties
					}
				></div>
			</div>
			<div
				className='skeleton-loading'
				style={
					{
						'--skeleton-loading-w': '100%',
						'--skeleton-loading-h': '12rem'
					} as CSSProperties
				}
			></div>
			<div
				className='skeleton-loading'
				style={
					{
						'--skeleton-loading-w': '100%',
						'--skeleton-loading-h': '6rem'
					} as CSSProperties
				}
			></div>
		</CreateWorkContainer>
	);
};

const CreativeWorkAuthor = ({
	author,
	authorProfilePictureProps = {}
}: {
	author: TCreativeWorkTypeData['author'];
	authorProfilePictureProps?: Partial<Parameters<typeof CustomNextImage>[0]>;
}) => {
	const authorUserName = author?.name || "Can't find this author";
	const authorName = author?.profile
		? `${author.profile.firstName} ${author.profile.lastName}`
		: "Can't find this author";

	return (
		<div className='flex gap-2'>
			<div className='aspect-square h-16 w-16 min-w-fit overflow-hidden rounded-full bg-theme-bg-700'>
				{author?.profile?.profilePicture && (
					<Link href={`/users/${authorUserName}`}>
						<CustomNextImage
							src={author.profile.profilePicture}
							alt={authorUserName}
							width={250}
							height={250}
							className='h-full w-full object-cover'
							{...authorProfilePictureProps}
						/>
					</Link>
				)}
			</div>
			<div className='flex flex-col'>
				<p
					className='max-w-full overflow-hidden text-ellipsis'
					title={authorUserName}
				>
					{!author ? (
						<p>{authorUserName}</p>
					) : (
						<Link href={`/users/${authorUserName}`}>{authorUserName}</Link>
					)}
				</p>
				<small className='max-w-[12rem] overflow-hidden text-ellipsis font-bold'>
					{authorName}
				</small>
			</div>
		</div>
	);
};

const CreativeWorkTime = ({
	createdAt,
	updatedAt
}: {
	createdAt: Date;
	updatedAt: Date | null;
}) => {
	return (
		<small className='flex flex-wrap'>
			<span className='flex flex-wrap'>
				<strong className='capitalize'>created at:</strong>
				&nbsp;
				<time dateTime={createdAt.toISOString()}>
					{createdAt.toDateString()}
				</time>
			</span>

			{updatedAt && (
				<>
					, &nbsp;
					<span className='flex flex-wrap'>
						<strong className='capitalize'>updated at:</strong>
						&nbsp;
						<time dateTime={updatedAt.toISOString()}>
							{updatedAt.toDateString()}
						</time>
					</span>
				</>
			)}
		</small>
	);
};
const CreativeWorkTags = ({ tags }: { tags: { name: string }[] }) => {
	return (
		<small>
			<strong>tags:</strong>&nbsp;
			{tags.map((tag) => tag.name).join(', ')}
		</small>
	);
};

const CreativeWorkFooter = () => {
	return (
		<footer className='flex flex-col gap-2'>
			{/* <CreativeWorkAuthor author={author} /> */}
		</footer>
	);
};

const CreativeWorkHeader = ({
	data,
	createdAt,
	updatedAt,
	tags,
	author,
	title,
	titleHref,
	authorProfilePictureProps
}: {
	title?: string;
	titleHref?: string;
	data: TCreativeWorkTypeData;
	authorProfilePictureProps?: Partial<Parameters<typeof CustomNextImage>[0]>;
} & Parameters<typeof CreativeWorkTime>[0] &
	Parameters<typeof CreativeWorkTags>[0] &
	Parameters<typeof CreativeWorkAuthor>[0]) => {
	return (
		<header className='relative flex max-w-full flex-col'>
			<div className='flex justify-end'>
				<HeaderSettings data={data} />
			</div>
			<div className='flex flex-col gap-1 overflow-hidden'>
				<div className='flex justify-between gap-2'>
					{title ? (
						<h2 className='text-h2'>
							{titleHref ? <Link href={titleHref}>{title}</Link> : title}
						</h2>
					) : (
						<span className='opacity-0'> </span>
					)}
				</div>
				<CreativeWorkAuthor
					author={author}
					authorProfilePictureProps={authorProfilePictureProps}
				/>
				<div className='flex flex-col px-2'>
					<CreativeWorkTime createdAt={createdAt} updatedAt={updatedAt} />
					<CreativeWorkTags tags={tags} />
				</div>
			</div>
		</header>
	);
};

const HeaderSettings = ({ data }: { data: TCreativeWorkTypeData }) => {
	const { data: session } = useTypedSession();
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const user = session?.user;
	const isAuthor = user?.id === data.authorId && user;

	const menuItems = [
		{
			title: 'edit',
			isHidden: !isAuthor,
			onClick: () => setIsUpdateModalOpen(true)
		},
		{
			title: 'delete',
			isHidden: !isAuthor,
			onClick: () => setIsDeleteModalOpen(true)
		}
	].filter((item) => !item.isHidden);

	return (
		<>
			<Menu as='div' className='relative inline-block text-left'>
				<div>
					<Menu.Button
						title='settings and other options'
						className='inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 p-2 font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
					>
						<BsThreeDotsVertical
							className='text-violet-100'
							aria-hidden='true'
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
						{menuItems.map((menuItem) => (
							<div className='px-1 py-1' key={menuItem.title}>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? 'bg-violet-500 text-white' : 'text-gray-900'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
											onClick={menuItem.onClick}
										>
											{/* {active ? (<UpdateActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" /> ) : ( <UpdateInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" /> )} */}
											{menuItem.title}
										</button>
									)}
								</Menu.Item>
							</div>
						))}
					</Menu.Items>
				</Transition>
			</Menu>
			{isAuthor && (
				<>
					<UpdateCreativeWorkDialog
						setIsDialogOpen={setIsUpdateModalOpen}
						isDialogOpen={isUpdateModalOpen}
						data={data}
					/>
					<DeleteCreativeWorkDialog
						setIsDialogOpen={setIsDeleteModalOpen}
						isDialogOpen={isDeleteModalOpen}
						creativeWorkId={data.id}
						authorId={isAuthor.id}
					/>
				</>
			)}

			{/* data */}
		</>
	);
};

const CreativeWorkPost = ({ data }: { data: TCreativeWorkPost }) => {
	return (
		<CreateWorkContainer>
			<CreativeWorkHeader
				data={data}
				createdAt={data.createdAt}
				updatedAt={data.typeData.updatedAt}
				tags={data.tags}
				author={data.author}
			/>
			<div className='color-theme-200 bg-opacity-50 p-2 font-medium'>
				{data.typeData.content}
			</div>
			<CreativeWorkFooter />
		</CreateWorkContainer>
	);
};
const CreativeWorkBlogPost = ({
	data,
	thumbnailProps = {},
	authorProfilePictureProps
}: {
	data: TCreativeWorkBlogPost;
	thumbnailProps?: Partial<Parameters<typeof CustomNextImage>[0]>;
	authorProfilePictureProps?: Partial<Parameters<typeof CustomNextImage>[0]>;
}) => {
	const { displayMode } = useCreativeWorkSharedState();
	const authorUserName = data.author?.name || "Can't find this author";

	return (
		<CreateWorkContainer languageTag={data.typeData.languageTag}>
			<CreativeWorkHeader
				data={data}
				title={data.typeData.title}
				titleHref={
					!!data.author && displayMode !== 'FULL'
						? `/users/${authorUserName}/creative-works/blog-posts/${data.typeData.slug}`
						: undefined
				}
				createdAt={data.createdAt}
				updatedAt={data.typeData.updatedAt}
				tags={data.tags}
				author={data.author}
				authorProfilePictureProps={authorProfilePictureProps}
			/>
			<div className='aspect-video w-full bg-theme-bg-900 opacity-90'>
				<CustomNextImage
					src={data.typeData.thumbnailUrl}
					alt={data.typeData.title}
					width={1024}
					height={800}
					className='h-full w-full object-contain object-center'
					{...thumbnailProps}
				/>
			</div>
			{displayMode === 'BASIC' && (
				<div className='color-theme-200 bg-opacity-50 p-2 font-medium'>
					{data.typeData.description}
				</div>
			)}
			{displayMode === 'FULL' &&
				(!data.typeData.content ? (
					<div>No data found!</div>
				) : (
					<div
						className={cx(
							'prose mx-auto flex max-w-full flex-col py-4 text-inherit',
							'prose-p:my-2',
							'lg:prose-xl',
							'prose-headings:text-inherit',
							'prose-strong:text-inherit',
							'prose-a:text-inherit',
							'prose-h2:mt-4 prose-h2:mb-2',
							'prose-pre:p-0'
						)}
					>
						<MdToHTMLFormatter content={data.typeData.content} />
					</div>
				))}
			<CreativeWorkFooter />
		</CreateWorkContainer>
	);
};

type CreativeWorkProps = {
	data: TCreativeWorkTypeData;
} & (
	| {
			type: TCreativeWorkBlogPost['type'];
			compProps?: Omit<Parameters<typeof CreativeWorkBlogPost>[0], 'data'>;
	  }
	| {
			type: TCreativeWorkPost['type'];
			compProps?: Omit<Parameters<typeof CreativeWorkPost>[0], 'data'>;
	  }
	| { type: TCreativeWorkDiscussionForum['type']; compProps?: any }
	| { type: TCreativeWorkDiscussionForumPost['type']; compProps?: any }
	| { type: TCreativeWorkNoType['type']; compProps?: any }
	| { type?: undefined; compProps?: any }
);

const CreativeWork_ = ({ data, compProps = {} }: CreativeWorkProps) => {
	if (isCreativeWorAPost(data))
		return <CreativeWorkPost key={data.id} {...compProps} data={data} />;
	if (isCreativeWorABlogPost(data))
		return <CreativeWorkBlogPost key={data.id} {...compProps} data={data} />;

	return <></>;
};

export type CreativeWorkSharedState = {
	onUpdatingCreativeWork: (
		props: { authorId: string; creativeWorkId: string } & (
			| {
					type: typeof CreativeWorkType.BLOG_POST;
					updatedTypeData?: Partial<
						Parameters<BlogPostFormProps['handleOnSubmit']>['1']['typeData']
					>;
					updatedCreativeWork?: Partial<
						Parameters<BlogPostFormProps['handleOnSubmit']>['1']['creativeWork']
					>;
					addedTags?: string[];
					removedTags?: string[];
			  }
			| {
					type: typeof CreativeWorkType.POST;
					updatedTypeData: Partial<
						Parameters<PostFormProps['handleOnSubmit']>['1']['typeData']
					>;
					updatedCreativeWork: Partial<
						Parameters<PostFormProps['handleOnSubmit']>['1']['creativeWork']
					>;
					addedTags?: string[];
					removedTags?: string[];
			  }
		)
	) => Promise<void> | void;
	onDeletingCreativeWork: (props: {
		creativeWorkId: string;
	}) => Promise<void> | void;
	// onGettingBlogPostContent?: (props: {
	// 	creativeWorkId: string;
	// }) => Promise<void> | void;
	displayMode: 'BASIC' | 'FULL';
};

const useCreativeWorkSharedValue = (props: CreativeWorkSharedState) =>
	useState<CreativeWorkSharedState>(props);

export const {
	Provider,
	useTrackedState: useCreativeWorkSharedState,
	useUpdate: useSetState
} = createContainer(useCreativeWorkSharedValue);

type SetToPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type CreativeWorkCompProps = CreativeWorkProps &
	SetToPartial<CreativeWorkSharedState, 'displayMode'>;

export const CreativeWorkComp = ({
	displayMode = 'BASIC',
	onDeletingCreativeWork,
	onUpdatingCreativeWork,
	...props
}: CreativeWorkCompProps) => {
	return (
		<Provider
			displayMode={displayMode}
			onDeletingCreativeWork={onDeletingCreativeWork}
			onUpdatingCreativeWork={onUpdatingCreativeWork}
		>
			<CreativeWork_ {...props} />
		</Provider>
	);
};
