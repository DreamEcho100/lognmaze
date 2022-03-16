import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { returnNewsItemInitialState } from './initialState';
import { TNewsItemContextReducerAction, INewsItemContextState } from './ts';

type TReducer = (
	state: INewsItemContextState | undefined,
	actions: TNewsItemContextReducerAction
) => INewsItemContextState;

const newsItemContextStoreReducer = (
	state: INewsItemContextState = returnNewsItemInitialState(),
	actions: TNewsItemContextReducerAction
): INewsItemContextState => {
	if (process.env.NODE_ENV !== 'production')
		console.log('actions.type', actions.type);

	switch (actions.type) {
		case NewsItemContextConstants.INIT_GET_COMMENTS_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						getComments: {
							isLoading: true,
							error: '',
							success: false,
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS: {
			const { commentsMainData, hit_comments_limit } = actions.payload;
			return {
				...state,
				data: {
					...state.data,
					newsItem: {
						...state.data.newsItem,
						comments: commentsMainData,
					},
					hit_comments_limit,
				},
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						getComments: {
							isLoading: false,
							error: '',
							success: true,
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_GET_COMMENTS_FAIL: {
			const { error } = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					// commentsMainData,
					newsItem: {
						...state.data.newsItem,
						comments: [],
					},
					hit_comments_limit: false,
				},
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						getComments: {
							isLoading: false,
							error,
							success: false,
						},
					},
				},
			};
		}

		case NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						modal: {
							getTypeBlogContent: {
								isLoading: true,
								error: '',
								success: false,
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS: {
			const { newsItemTypeBlogContent } = actions.payload;

			if (state.data.newsItem.type !== 'blog') return state;

			return {
				...state,
				data: {
					...state.data,
					newsItem: {
						...state.data.newsItem,
						type_data: {
							...state.data.newsItem.type_data,
							content: newsItemTypeBlogContent,
						},
					},
				},
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						modal: {
							getTypeBlogContent: {
								isLoading: false,
								error: '',
								success: true,
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL: {
			const { error } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					init: {
						...state.actions.init,
						modal: {
							getTypeBlogContent: {
								isLoading: false,
								error,
								success: false,
							},
						},
					},
				},
			};
		}

		default:
			return state;
	}
};

export default newsItemContextStoreReducer;
