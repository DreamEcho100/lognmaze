import type { AllowedFormTypeIndex } from '@components/shared/core/CreativeWorks/Forms/Create';
import type { TOnAddingCreativeWork } from '@components/shared/core/CreativeWorks/Forms/utils/ts';
import Button from '@components/shared/common/Button';
import {
	CreateWorkLoading,
	CreativeWorkComp
} from '@components/shared/core/CreativeWorks';
import CreateCreativeWorkDialog from '@components/shared/core/CreativeWorks/Dialogs/Create';
import GoogleAdSenseHResponsiveImageV1 from '@components/shared/common/GoogleAdSense/HResponsiveImageV1';

import { CreativeWorkStatus, CreativeWorkType } from '@prisma/client';

import type { AppRouter } from '@server/trpc/router/_app';

import type { inferRouterInputs } from '@trpc/server';

import type {
	TCreativeWorkBlogPostTypeData,
	TCreativeWorkPostTypeData,
	TCreativeWork,
	TCreativeWorkBlogPost,
	TCreativeWorkPost
} from '@ts/index';

import { useTypedSession } from '@utils/common/hooks';
import { trpcAPI } from '@utils/trpc';

import { Fragment, useMemo, useState } from 'react';

const FeelingCreativeButton = ({
	authorId,
	onAddingCreativeWork
}: {
	authorId: string;
	onAddingCreativeWork: TOnAddingCreativeWork;
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState<AllowedFormTypeIndex>(0);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>Feeling Creative?</Button>
			<CreateCreativeWorkDialog
				authorId={authorId}
				setIsDialogOpen={setIsDialogOpen}
				isDialogOpen={isDialogOpen}
				setSelectedIndex={setSelectedIndex}
				selectedIndex={selectedIndex}
				onAddingCreativeWork={onAddingCreativeWork}
			/>
		</>
	);
};

const useGetAllCreativeWorksOnStore = ({
	getAllCreativeWorksQueryInput
}: {
	getAllCreativeWorksQueryInput: inferRouterInputs<AppRouter>['creativeWorks']['getAll'];
}) => {
	const trpcAPIContext = trpcAPI.useContext();

	const get = () => trpcAPIContext.creativeWorks.getAll.getInfiniteData();

	const updateGetAllCreativeWorksOnStore = (
		cb: (prevData: ReturnType<typeof get>) => ReturnType<typeof get>
	) => {
		trpcAPIContext.creativeWorks.getAll.setInfiniteData(
			getAllCreativeWorksQueryInput,
			(prevData) => {
				if (!prevData) return prevData;

				return cb(prevData);
			}
		);
	};

	return {
		updateGetAllCreativeWorksOnStore
	};
};

const CreativeWorksFeed = ({
	getAllCreativeWorksInput = {}
}: {
	getAllCreativeWorksInput?: inferRouterInputs<AppRouter>['creativeWorks']['getAll'];
}) => {
	const { updateGetAllCreativeWorksOnStore } = useGetAllCreativeWorksOnStore({
		getAllCreativeWorksQueryInput: getAllCreativeWorksInput
	});
	const { data: session, status } = useTypedSession();

	const [isLastPage, setIsLastPage] = useState(false);
	const getAllCreativeWorksQueryInput = useMemo(
		() => ({
			...getAllCreativeWorksInput,
			checkForPrivileges:
				getAllCreativeWorksInput.checkForPrivileges &&
				typeof session?.user.id === 'string' &&
				getAllCreativeWorksInput.authorId === session.user.id
		}),
		[getAllCreativeWorksInput, session?.user.id]
	);

	const getAllCreativeWorks = trpcAPI.creativeWorks.getAll.useInfiniteQuery(
		getAllCreativeWorksQueryInput,
		{
			enabled: status !== 'loading' || isLastPage,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			onSuccess: (result) => {
				const lastPage = result.pages[result.pages.length - 1];

				setIsLastPage(!!lastPage?.isLastPage);
			}
		}
	);

	const data =
		getAllCreativeWorks.data?.pages
			.flat(1)
			.map((item) => item.items)
			.flat(1) || [];

	return (
		<section className='section-p-y-sm xl-2-sm:section-p-sm color-theme-100 flex flex-col gap-4'>
			{session?.user?.profile?.id && (
				<FeelingCreativeButton
					authorId={session?.user?.id}
					onAddingCreativeWork={({ creativeWorkId, ...props }) => {
						updateGetAllCreativeWorksOnStore((prevData) => {
							if (!prevData || !session?.user?.profile?.id) return prevData;

							let firstPage = prevData.pages[0] || {
								nextCursor: undefined,
								isLastPage: true,
								items: []
							};

							const creativeWorkBasic = {
								id: creativeWorkId,
								tags:
									props.input.tags?.map((tagName) => ({
										name: tagName
									})) || [],
								createdAt: new Date(),
								status: props.input.status || CreativeWorkStatus.PUBLIC,
								authorId: props.input.authorId,
								author: {
									name: session.user.name,
									profile: session.user.profile
								}
							} satisfies TCreativeWork;

							const typeWithData =
								props.type === CreativeWorkType.BLOG_POST &&
								props.type === CreativeWorkType.BLOG_POST
									? {
											type: CreativeWorkType.BLOG_POST,
											typeData: {
												...(props.input.typeData satisfies Partial<
													TCreativeWorkBlogPostTypeData['typeData']
												>),
												...props.result.blogPost
											}
									  }
									: {
											type: CreativeWorkType.POST,
											typeData: {
												...(props.input.typeData satisfies Partial<
													TCreativeWorkPostTypeData['typeData']
												>),
												...props.result.Post
											}
									  };

							const newItem = {
								...creativeWorkBasic,
								...typeWithData
							} as unknown as TCreativeWorkBlogPost | TCreativeWorkPost;

							firstPage = {
								...firstPage,
								items: [newItem, ...firstPage.items]
							};

							return {
								...prevData,
								pages: [firstPage, ...prevData.pages.slice(1)]
							};
						});
					}}
				/>
			)}

			{getAllCreativeWorks.isLoading
				? 'break'
						.repeat(9)
						.split('break')
						.map((_, index) => <CreateWorkLoading key={index} />)
				: data.map((item, index) => (
						<Fragment key={item.id}>
							<CreativeWorkComp
								data={item}
								onDeletingCreativeWork={(props) => {
									updateGetAllCreativeWorksOnStore((prevData) => {
										if (!prevData) return prevData;

										let isItemFounded = false;

										return {
											...prevData,
											pages: prevData.pages.map((page) => {
												if (isItemFounded) return page;

												const items = page.items.filter(
													(item) => item.id !== props.creativeWorkId
												);

												if (items.length !== page.items.length)
													isItemFounded = true;

												return { ...page, items };
											})
										};
									});
								}}
								onUpdatingCreativeWork={(props) => {
									updateGetAllCreativeWorksOnStore((prevData) => {
										if (!prevData) return prevData;

										let isItemFounded = false;
										const removedTags = props.removedTags;
										const addedTags = props.addedTags;

										return {
											...prevData,
											pages: prevData.pages.map((page) => {
												if (isItemFounded) return page;

												return {
													...page,
													items: page.items.map((item) => {
														if (
															!isItemFounded &&
															item.id === props.creativeWorkId &&
															item.type === props.type
														) {
															isItemFounded = true;

															return {
																...item,
																tags: [
																	...(Array.isArray(removedTags) &&
																	removedTags.length !== 0
																		? item.tags.filter((tag) =>
																				removedTags.includes(tag.name)
																		  )
																		: item.tags),
																	...(addedTags || []).map((tagName) => ({
																		name: tagName
																	}))
																],
																...((props.updatedCreativeWork || {}) as any),
																typeData: {
																	...item.typeData,
																	...(props.updatedTypeData || {})
																}
															};
														}

														return item;
													})
												};
											})
										};
									});
								}}
								{...(index < 2
									? {
											compProps: {
												thumbnailProps: { priority: true },
												authorProfilePictureProps: { priority: true }
											}
									  }
									: {})}
							/>
							{!!(index !== 0 && index % 2) && (
								<GoogleAdSenseHResponsiveImageV1 />
							)}
						</Fragment>
				  ))}
			<Button
				disabled={
					isLastPage ||
					getAllCreativeWorks.isLoading ||
					getAllCreativeWorks.isFetching
				}
				onClick={() => {
					if (
						isLastPage ||
						getAllCreativeWorks.isLoading ||
						getAllCreativeWorks.isFetching
					)
						return;
					getAllCreativeWorks.fetchNextPage();
				}}
			>
				load more
			</Button>
		</section>
	);
};

export default CreativeWorksFeed;
