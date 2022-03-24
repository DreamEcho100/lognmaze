// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/ts';
// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { TNewsItemData } from '@coreLib/ts/global';
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
	if (process.env.NODE_ENV !== 'production')
		console.log('actions.type', actions.type);

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
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								init: {
									...(state.actions.items[news_id]?.requests?.init || {}),
									getMainComments: {
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
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								init: {
									...(state.actions.items[news_id]?.requests?.init || {}),
									getMainComments: {
										isLoading: false,
										error: '',
										success: true,
									},
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
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								init: {
									...(state.actions.items[news_id]?.requests?.init || {}),
									getMainComments: {
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

		//
		case NewsContextConstants.GET_MORE_ITEMS_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						getMoreNewsItems: {
							...(state.actions?.requests?.getMoreNewsItems || {}),
							isLoading: true,
							error: '',
							success: false,
						},
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
							priorityForHeaderImage: true,
						},
					},
					requests: {
						getMoreNewsItems: {
							...(state.actions?.requests?.getMoreNewsItems || {}),
							isLoading: false,
							error: '',
							success: false,
						},
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
					requests: {
						getMoreNewsItems: {
							...(state.actions?.requests?.getMoreNewsItems || {}),
							isLoading: false,
							error,
							success: false,
						},
					},
				},
			};
		}

		//
		case NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_PENDING: {
			const { news_id } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								getMoreMainComments: {
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
		case NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_SUCCESS: {
			const { news_id, newCommentsMainData, hit_comments_limit } =
				actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.map((item) => {
						if (item.news_id === news_id)
							return {
								...item,
								comments: [...(item?.comments || []), ...newCommentsMainData],
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
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								getMoreMainComments: {
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
		case NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_FAIL: {
			const { news_id, error } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								getMoreMainComments: {
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
		case NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_PENDING: {
			const { news_id, newsCommentParentId } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								mainComments: {
									...(state.actions.items[news_id]?.requests?.mainComments ||
										{}),
									[newsCommentParentId]: {
										...(state.actions.items[news_id]?.requests?.mainComments
											?.newsCommentParentId || {}),
										getMoreReplies: {
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
		case NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_SUCCESS: {
			const {
				news_id,
				hit_replies_limit,
				newCommentMainRepliesData,
				newsCommentParentId,
			} = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.map((item) => {
						if (item.news_id === news_id) {
							const itemComments = item?.comments || [];

							return {
								...item,
								comments: itemComments.map((comment) => {
									if (comment.news_comment_id === newsCommentParentId) {
										return {
											...comment,
											replies: [
												...(comment?.replies || []),
												...newCommentMainRepliesData,
											],
											hit_replies_limit: !!hit_replies_limit,
										};
									}

									return comment;
								}),
							};
						}

						return item;
					}),
				},
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								mainComments: {
									...(state.actions.items[news_id]?.requests?.mainComments ||
										{}),
									[newsCommentParentId]: {
										...(state.actions.items[news_id]?.requests?.mainComments
											?.newsCommentParentId || {}),
										getMoreReplies: {
											isLoading: false,
											error: '',
											success: true,
										},
									},
								},
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_FAIL: {
			const { news_id, newsCommentParentId, error } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								mainComments: {
									...(state.actions.items[news_id]?.requests?.mainComments ||
										{}),
									[newsCommentParentId]: {
										...(state.actions.items[news_id]?.requests?.mainComments
											?.newsCommentParentId || {}),
										getMoreReplies: {
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

		//
		case NewsItemContextConstants.CREATE_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						createItem: {
							isLoading: true,
							error: '',
							success: false,
						},
					},
				},
			};
		}
		case NewsItemContextConstants.CREATE_SUCCESS: {
			const { newNewsItemAuthorData, newNewsItemId, newsItemBasicData } =
				actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: [
						{
							news_id: newNewsItemId,
							// ...newsItemBasicData,
							type: newsItemBasicData.type,
							type_data: newsItemBasicData.basics,
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
				},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						createItem: {
							isLoading: false,
							error: '',
							success: true,
						},
					},
				},
			};
		}
		case NewsItemContextConstants.CREATE_FAIL: {
			const { error } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						createItem: {
							isLoading: false,
							error,
							success: false,
						},
					},
				},
			};
		}

		default:
			return state;
	}
};

export default reducer;
