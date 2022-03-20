// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/ts';
// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { returnNewsInitialState } from './initialState';

import {
	// TNewsContextReducerAction,
	// INewsContextState,
	TNewsContextStateReducer,
} from './ts';

const reducer: TNewsContextStateReducer = (
	state = returnNewsInitialState(),
	actions
) => {
	// if (process.env.NODE_ENV !== 'production')
	// 	console.log('actions.type', actions.type);

	switch (actions.type) {
		//
		case NewsItemContextConstants.INIT_GET_COMMENTS_PENDING: {
			const { news_id } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							init: {
								...(state.actions.items[news_id]?.init || {}),
								// (state.actions[news_id]?state.actions[news_id]?.init || {}),
								getMainComments: {
									isLoading: true,
									error: '',
									success: false,
								},
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS: {
			const { news_id, commentsMainData, hit_comments_limit } = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.map((item) => {
						if (item.news_id === news_id)
							return {
								...item,
								comments: commentsMainData,
								hit_comments_limit,
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
							init: {
								...(state.actions.items[news_id]?.init || {}),
								// (state.actions[news_id]?state.actions[news_id]?.init || {}),
								getMainComments: {
									isLoading: false,
									error: '',
									success: true,
								},
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_GET_COMMENTS_FAIL: {
			const { news_id, error } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							init: {
								...(state.actions.items[news_id]?.init || {}),
								// (state.actions[news_id]?state.actions[news_id]?.init || {}),
								getMainComments: {
									isLoading: false,
									error,
									success: false,
								},
							},
						},
					},
				},
			};
		}

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
							init: {
								...(state.actions.items[news_id]?.init || {}),
								modal: {
									...(state.actions.items[news_id]?.init?.modal || {}),
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
							init: {
								...(state.actions.items[news_id]?.init || {}),
								modal: {
									...(state.actions.items[news_id]?.init?.modal || {}),
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
							init: {
								...(state.actions.items[news_id]?.init || {}),
								modal: {
									...(state.actions.items[news_id]?.init?.modal || {}),
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
			};
		}

		//
		case NewsContextConstants.GET_MORE_ITEMS_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					getMoreNewsItems: {
						...(state.actions.getMoreNewsItems || {}),
						isLoading: true,
						error: '',
						success: false,
					},
				},
			};
		}
		case NewsContextConstants.GET_MORE_ITEMS_SUCCESS: {
			const { newNewsItems, hit_news_items_limit } = actions.payload;

			const newNewsExtra: typeof state.data.newsExtra = {};

			newNewsItems.forEach((item) => {
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
				actions: {
					...state.actions,
					items: {
						...(state.actions.items || {}),
						[newNewsItems[0].news_id]: {
							init: {
								priorityForHeaderImage: true,
							},
						},
					},
					getMoreNewsItems: {
						...(state.actions.getMoreNewsItems || {}),
						isLoading: false,
						error: '',
						success: false,
					},
				},
			};
		}
		case NewsContextConstants.GET_MORE_ITEMS_FAIL: {
			const { error } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					getMoreNewsItems: {
						...(state.actions.getMoreNewsItems || {}),
						isLoading: false,
						error,
						success: false,
					},
				},
			};
		}

		// NewsContextConstants

		default:
			return state;
	}
};

export default reducer;
