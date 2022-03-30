// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/ts';
// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

// import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { TNewsItemData } from '@coreLib/ts/global';
import { returnNewsInitialState } from './initialState';

import {
	INewsContextState,
	// TNewsContextReducerAction,
	// INewsContextState,
	TNewsContextStateReducer,
} from './ts';

const reducer: TNewsContextStateReducer = (
	state: INewsContextState = returnNewsInitialState(),
	actions
): INewsContextState => {
	if (process.env.NODE_ENV !== 'production') {
		console.log(actions.type);
	}

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

		// update comment
		case NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING: {
			const payload = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[payload.news_id]: {
							...(state.actions.items[payload.news_id] || {}),
							requests: {
								...(state.actions.items[payload.news_id]?.requests || {}),
								mainComments: {
									...(state.actions.items[payload.news_id]?.requests
										?.mainComments || {}),
									...(payload.type === 'comment_main'
										? {
												[payload.news_comment_id]: {
													...(state.actions.items[payload.news_id]?.requests
														?.mainComments?.[payload.news_comment_id] || {}),
													update: {
														isLoading: true,
														error: '',
														success: false,
													},
												},
										  }
										: {
												[payload.parent_id]: {
													...(state.actions.items[payload.news_id]?.requests
														?.mainComments?.[payload.news_comment_id] || {}),
													replies: {
														...(state.actions.items[payload.news_id]?.requests
															?.mainComments?.[payload.news_comment_id]
															?.replies || {}),
														[payload.news_comment_id]: {
															update: {
																isLoading: true,
																error: '',
																success: false,
															},
														},
													},
												},
										  }),
								},
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS: {
			const payload = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.map((item) => {
						if (item.news_id === payload.news_id) {
							return {
								...item,
								comments: (item.comments || []).map((comment) => {
									if (
										payload.type === 'comment_main' &&
										comment.news_comment_id === payload.news_comment_id
									) {
										return {
											...comment,
											content: payload.newContent,
										};
									} else if (
										payload.type === 'comment_main_reply' &&
										comment.news_comment_id === payload.parent_id
									) {
										return {
											...comment,
											replies: (comment.replies || []).map((reply) => {
												if (reply.news_comment_id) {
													return {
														...reply,
														content: payload.newContent,
													};
												}

												return reply;
											}),
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
						[payload.news_id]: {
							...(state.actions.items[payload.news_id] || {}),
							requests: {
								...(state.actions.items[payload.news_id]?.requests || {}),
								mainComments: {
									...(state.actions.items[payload.news_id]?.requests
										?.mainComments || {}),
									...(payload.type === 'comment_main'
										? {
												[payload.news_comment_id]: {
													...(state.actions.items[payload.news_id]?.requests
														?.mainComments?.[payload.news_comment_id] || {}),
													update: {
														isLoading: false,
														error: '',
														success: false,
													},
												},
										  }
										: {
												[payload.parent_id]: {
													...(state.actions.items[payload.news_id]?.requests
														?.mainComments?.[payload.news_comment_id] || {}),
													replies: {
														...(state.actions.items[payload.news_id]?.requests
															?.mainComments?.[payload.news_comment_id]
															?.replies || {}),
														[payload.news_comment_id]: {
															update: {
																isLoading: false,
																error: '',
																success: false,
															},
														},
													},
												},
										  }),
								},
							},
						},
					},
				},
			};
		}
		case NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL: {
			const payload = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[payload.news_id]: {
							...(state.actions.items[payload.news_id] || {}),
							requests: {
								...(state.actions.items[payload.news_id]?.requests || {}),
								mainComments: {
									...(state.actions.items[payload.news_id]?.requests
										?.mainComments || {}),
									...(payload.type === 'comment_main'
										? {
												[payload.news_comment_id]: {
													...(state.actions.items[payload.news_id]?.requests
														?.mainComments?.[payload.news_comment_id] || {}),
													update: {
														isLoading: false,
														error: payload.error,
														success: false,
													},
												},
										  }
										: {
												[payload.parent_id]: {
													...(state.actions.items[payload.news_id]?.requests
														?.mainComments?.[payload.news_comment_id] || {}),
													replies: {
														...(state.actions.items[payload.news_id]?.requests
															?.mainComments?.[payload.news_comment_id]
															?.replies || {}),
														[payload.news_comment_id]: {
															update: {
																isLoading: false,
																error: payload.error,
																success: false,
															},
														},
													},
												},
										  }),
								},
							},
						},
					},
				},
			};
		}

		//
		case NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_PENDING: {
			const { news_id, parent_id } = actions.payload;

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
									[parent_id]: {
										...(state.actions.items[news_id]?.requests?.mainComments
											?.parent_id || {}),
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
				parent_id,
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
									if (comment.news_comment_id === parent_id) {
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
									[parent_id]: {
										...(state.actions.items[news_id]?.requests?.mainComments
											?.parent_id || {}),
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
			const { news_id, parent_id, error } = actions.payload;

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
									[parent_id]: {
										...(state.actions.items[news_id]?.requests?.mainComments
											?.parent_id || {}),
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
						create: {
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
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						create: {
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
						create: {
							isLoading: false,
							error,
							success: false,
						},
					},
				},
			};
		}
		case NewsItemContextConstants.CREATE_RESET: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						create: {
							isLoading: false,
							error: '',
							success: false,
						},
					},
				},
			};
		}

		//
		case NewsItemContextConstants.UPDATE_PENDING: {
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
								update: {
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
		case NewsItemContextConstants.UPDATE_SUCCESS: {
			const { news_id, dataToUpdate } = actions.payload;

			const newDataToUpdate: Partial<TNewsItemData['type_data']> = {};

			let item: keyof typeof newDataToUpdate;
			for (item in dataToUpdate) {
				// @ts-ignore
				if (item === 'tags') {
					// @ts-ignore
					const newTags: string[] = [...(dataToUpdate?.tags?.added || [])];
					// @ts-ignore
					const remainedTags = dataToUpdate?.tags?.removed
						? // @ts-ignore
						  // @ts-ignore
						  state.data.news
								.find((item) => item.news_id === news_id)
								// @ts-ignore
								?.type_data.tags // @ts-ignore
								.filter(
									// @ts-ignore
									(item) => !dataToUpdate.tags.removed.includes(item)
								) || [
								// @ts-ignore
								state.data.news
									// @ts-ignore
									.find((item) => item.news_id === news_id)?.type_data.tags,
						  ]
						: [];

					// @ts-ignore
					if (newTags.length !== 0 || remainedTags.length !== 0)
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
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								update: {
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
		case NewsItemContextConstants.UPDATE_FAIL: {
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
								update: {
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
		case NewsItemContextConstants.UPDATE_RESET: {
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
								update: {
									isLoading: false,
									error: '',
									success: false,
								},
							},
						},
					},
				},
			};
		}

		//
		case NewsItemContextConstants.DELETE_PENDING: {
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
								delete: {
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
		case NewsItemContextConstants.DELETE_SUCCESS: {
			const { news_id } = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					news: state.data.news.filter((item) => item.news_id !== news_id),
				},
				actions: {
					...state.actions,
					items: {
						...state.actions.items,
						[news_id]: {
							...(state.actions.items[news_id] || {}),
							requests: {
								...(state.actions.items[news_id]?.requests || {}),
								delete: {
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
		case NewsItemContextConstants.DELETE_FAIL: {
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
								delete: {
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
		case NewsItemContextConstants.DELETE_RESET: {
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
								delete: {
									isLoading: false,
									error: '',
									success: false,
								},
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

export default reducer;