/* eslint-disable no-mixed-spaces-and-tabs */
import { NewsContextConstants } from '@coreLib/constants';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { TNewsItemData } from '@coreLib/ts/global';
import { returnNewsInitialState } from './initialState';

import { INewsContextState, TNewsContextStateReducer } from './ts';

const reducer: TNewsContextStateReducer = (
	state: INewsContextState = returnNewsInitialState(),
	actions
): INewsContextState => {
	if (process.env.NODE_ENV !== 'production') {
		console.log('actions.type', actions.type);
	}

	switch (actions.type) {
		//
		case NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING: {
			const { news_id } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							updatedToRenderDate: Date.now(),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								init: {
									...(state.actions.items[news_id]?.requests?.init || {}),
									modal: {
										...(state.actions.items[news_id]?.requests?.init?.modal ||
											{}),
										getTypeBlogContent: {
											isLoading: true,
											error: '',
											success: false,
										},
									},
								},
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS: {
			const { news_id, newsItemTypeBlogContent } = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.map((item) => {
						if (item.news_id === news_id && item.type === 'blog')
							return {
								...item,
								type_data: {
									...item.type_data,
									content: newsItemTypeBlogContent,
								},
							};

						return item;
					}),
				},
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							updatedToRenderDate: Date.now(),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								init: {
									...(state.actions.items[news_id]?.requests?.init || {}),
									modal: {
										...(state.actions.items[news_id]?.requests?.init?.modal ||
											{}),
										getTypeBlogContent: {
											isLoading: false,
											error: '',
											success: false,
										},
									},
								},
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL: {
			const { news_id, error } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							updatedToRenderDate: Date.now(),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								init: {
									...(state.actions.items[news_id]?.requests?.init || {}),
									modal: {
										...(state.actions.items[news_id]?.requests?.init?.modal ||
											{}),
										getTypeBlogContent: {
											isLoading: false,
											error,
											success: false,
										},
									},
								},
							},
						},
					},
				},
			};
		}

		// refactored
		case NewsContextConstants.ADD_NEWS_ITEMS: {
			const { newNewsItems, hit_news_items_limit } = actions.payload;

			const newNewsExtra: typeof state.data.newsExtra = {};

			newNewsItems.forEach((item: { news_id: string }) => {
				newNewsExtra[item.news_id] = {
					hit_comments_limit: false,
					newsItemDetailsType: 'description',
					newsItemModelDetailsType: 'content',
				};
			});

			return {
				...state,
				data: {
					...state.data,
					news: [...state.data.news, ...newNewsItems],
					hit_news_items_limit,
					newsExtra: {
						...(state.data.newsExtra || {}),
						...newNewsExtra,
					},
				},
			};
		}

		//
		case NewsItemContextConstants.CREATE_NEW_NEWS_ITEM: {
			const { newNewsItemAuthorData, newNewsItemId, newsItemBasicData } =
				actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: [
						{
							news_id: newNewsItemId,
							type: newsItemBasicData.type,
							type_data: newsItemBasicData.type_data,
							...newNewsItemAuthorData,
							comments_counter: 0,
							up_votes_counter: 0,
							down_votes_counter: 0,
							created_at: new Date().toISOString(),
							updated_at: new Date().toISOString(),
							comments: [],
							hit_comments_limit: true,
						} as unknown as TNewsItemData,
						...state.data.news,
					],
					newsExtra: {
						...(state.data.newsExtra || {}),
						[newNewsItemId]: {
							hit_comments_limit: false,
							newsItemDetailsType: 'description',
							newsItemModelDetailsType: 'content',
						},
					},
				},
			};
		}

		//
		case NewsItemContextConstants.UPDATE_NEWS_ITEM: {
			const { news_id, dataToUpdate } = actions.payload;

			const newDataToUpdate: Partial<TNewsItemData['type_data']> = {};

			let item: keyof typeof newDataToUpdate;
			for (item in dataToUpdate) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (item === 'tags') {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const newTags: string[] = [...(dataToUpdate?.tags?.added || [])];
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					const remainedTags = dataToUpdate?.tags?.removed
						? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
						  // @ts-ignore
						  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
						  // @ts-ignore
						  state.data.news
								.find((item) => item.news_id === news_id)
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								?.type_data.tags // @ts-ignore
								.filter(
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									(item) => !dataToUpdate.tags.removed.includes(item)
								) || [
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								state.data.news
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									.find((item) => item.news_id === news_id)?.type_data.tags,
						  ]
						: [];

					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					if (newTags.length !== 0 || remainedTags.length !== 0)
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						newDataToUpdate.tags = [...remainedTags, ...newTags];
				} else {
					newDataToUpdate[item] = dataToUpdate[item];
				}
			}

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.map((item) => {
						if (item.news_id === news_id)
							return {
								...item,
								type_data: {
									...item.type_data,
									// ...(newDataToUpdate as typeof item.type_data),
									...newDataToUpdate,
								},
								updated_at: new Date().toISOString(),
							} as typeof item;

						return item;
					}),
				},
			};
		}

		//
		case NewsItemContextConstants.DELETE_NEWS_ITEM: {
			const { news_id } = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.filter((item) => item.news_id !== news_id),
				},
			};
		}

		default:
			return state;
	}
};

export default reducer;
