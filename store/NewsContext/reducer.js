import types from './types';

const reducer = (state, action) => {
	if (action.type === types.INIT_STATE) {
		const { news } = action.payload;

		return {
			...state,
			newsType: action.payload.newsType,
			news: news?.map((item) => ({
				...item,
				comments: [],
				hit_comments_limit:
					parseInt(item.comments_counter) === 0 ? true : false,
			})),
			last_news_created_at: news[news.length - 1]
				? news[news.length - 1].created_at
				: undefined,
		};
	}
	if (action.type === types.ADDING_USER_ONE_NEWS_ITEM_TO_NEWS) {
		const { user, data, newsValues, newsType } = action.payload;

		return {
			...state,
			news: [
				{
					...newsValues,
					type: newsType,

					news_id: data.news_id,
					comments: [],
					comments_counter: 0,
					up_vote_counter: 0,
					down_vote_counter: 0,
					hit_comments_limit: true,

					author_id: user.id,

					author_first_name: user.first_name,
					author_last_name: user.last_name,
					author_profile_picture: user.profile_picture,
					author_user_name_id: user.user_name_id,
					author_bio: user.bio,

					created_at: new Date().toUTCString(),
					updated_on: new Date().toUTCString(),
				},
				...state.news,
			],
		};
	}
	if (action.type === types.UPDATING_USER_ONE_NEWS_ITEM_IN_NEWS) {
		const { bodyObj, tags } = action.payload;

		const toAdd = {
			...bodyObj,
			updated_on: new Date().toUTCString(),
		};

		if (tags?.length !== 0) {
			toAdd.tags = newsItem.tags;
		}

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === bodyObj.news_id) {
					return {
						...newsItem,
						...toAdd,
					};
				}

				return newsItem;
			}),
		};
	}
	if (action.type === types.DELETING_USER_ONE_NEWS_ITEM_IN_NEWS) {
		const { news_id } = action.payload;

		return {
			...state,
			news: state.news.filter((newsItem) => newsItem.news_id !== news_id),
		};
	}

	if (action.type === types.ADD_CONTENT_TO_NEWS_ITEM) {
		const { content, news_id } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						content,
					};
				}

				return newsItem;
			}),
		};
	}

	if (action.type === types.ADD_COMMENTS_TO_NEWS_ITEM) {
		const { dataToAdd, news_id } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						...dataToAdd,
					};
				}

				return newsItem;
			}),
		};
	}
	if (action.type === types.ADD_COMMENT_TO_NEWS_ITEM_AFTER_POSTING) {
		const { user, news_id, comment, commentContent } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						comments: [
							{
								author_id: user.id,

								author_first_name: user.first_name,
								author_last_name: user.last_name,
								author_profile_picture: user.profile_picture,
								author_user_name_id: user.user_name_id,
								author_user_name_id: user.bio,

								replies_counter: 0,
								content: commentContent,
								news_comment_id: comment.news_comment_id,
								type: 'comment_main',
								created_at: new Date().toUTCString(),
								updated_on: new Date().toUTCString(),
							},
							...newsItem.comments,
						],
						comments_counter: parseInt(newsItem.comments_counter) + 1,
						comments_to_not_fetch: newsItem.comments_to_not_fetch
							? [...newsItem.comments_to_not_fetch, comment.news_comment_id]
							: [comment.news_comment_id],
					};
				}

				return newsItem;
			}),
		};
	}
	if (action.type === types.LOADING_COMMENT_REPLIES_IN_A_NEWS_ITEM) {
		const { news_id, data, parent_id } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						comments: newsItem.comments.map((comment) => {
							if (comment.news_comment_id === parent_id) {
								const last_reply_created_at = data.comments[
									data.comments.length - 1
								]
									? data.comments[data.comments.length - 1].created_at
									: comment.last_reply_created_at
									? comment.last_reply_created_at
									: undefined;

								const replies = comment.replies
									? [...comment.replies, ...data.comments /*.reverse()*/]
									: data.comments; /*.reverse()*/

								return {
									...comment,
									replies,
									hit_replies_limit: data.hit_replies_limit,
									last_reply_created_at,
								};
							}

							return comment;
						}),
					};
				}

				return newsItem;
			}),
		};
	}
	if (
		action.type ===
		types.ADDING_REPLY_TO_A_MAIN_COMMENT_OR_A_REPLY_TO_A_COMMENT_IN_A_NEWS_ITEM
	) {
		const { user, bodyObj, news_comment_id } = action.payload;

		const commentReplyObj = {
			...bodyObj,

			author_first_name: user.first_name,
			author_last_name: user.last_name,
			author_profile_picture: user.profile_picture,
			author_user_name_id: user.user_name_id,

			author_id: user.id,
			news_comment_id: news_comment_id,
			created_at: new Date().toUTCString(),
			updated_on: new Date().toUTCString(),
		};

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === bodyObj.news_id) {
					return {
						...newsItem,
						comments: newsItem.comments.map((comment) => {
							if (comment.news_comment_id === bodyObj.parent_id) {
								let replies = comment.replies || [];

								replies.push(commentReplyObj);

								return {
									...comment,
									replies_counter: parseInt(comment.replies_counter) + 1,
									replies_to_not_fetch: newsItem.replies_to_not_fetch
										? [
												...newsItem.replies_to_not_fetch,
												commentReplyObj.news_comment_id,
										  ]
										: [commentReplyObj.news_comment_id],
									replies,
								};
							}

							return comment;
						}),
					};
				}

				return newsItem;
			}),
		};
	}
	if (
		action.type === types.UPDATING_A_MAIN_OR_A__REPLY_COMMENT_IN_A_NEWS_ITEM
	) {
		const { bodyObj, news_id, comment, parent_data_id } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					if (comment.type === 'comment_main') {
						return {
							...newsItem,
							comments: newsItem.comments.map((comment) => {
								if (comment.news_comment_id === bodyObj.news_comment_id) {
									return {
										...comment,
										content: bodyObj.content,
										updated_on: new Date().toUTCString(),
									};
								}
								return comment;
							}),
						};
					} else if (comment.type === 'comment_main_reply') {
						return {
							...newsItem,
							comments: newsItem.comments.map((comment) => {
								if (
									comment.news_comment_id === parent_data_id // props.parent_data.news_comment_id
								) {
									return {
										...comment,
										replies: comment.replies.map((reply) => {
											if (reply.news_comment_id === bodyObj.news_comment_id) {
												return {
													...reply,
													content: bodyObj.content,
													updated_on: new Date().toUTCString(),
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
				}

				return newsItem;
			}),
		};
	}
	if (
		action.type === types.DELETING_A_MAIN_OR_A__REPLY_COMMENT_IN_A_NEWS_ITEM
	) {
		const { bodyObj, news_id, comment } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					if (comment.type === 'comment_main') {
						return {
							...newsItem,
							comments_counter: parseInt(newsItem.comments_counter) - 1,
							comments: newsItem.comments.filter(
								(commentItem) =>
									commentItem.news_comment_id !== bodyObj.news_comment_id
							),
						};
					} else if (comment.type === 'comment_main_reply') {
						return {
							...newsItem,
							comments: newsItem.comments.map((commentItem) => {
								if (commentItem.news_comment_id === bodyObj.parent_id) {
									let replies = commentItem.replies.filter(
										(reply) => reply.news_comment_id !== bodyObj.news_comment_id
									);

									return {
										...commentItem,
										replies_counter: parseInt(commentItem.replies_counter) - 1,
										replies,
									};
								}
								return commentItem;
							}),
						};
					}
				}

				return newsItem;
			}),
		};
	}

	if (action.type === types.ADD_USER_VOTE_FOR_NEWS_ITEM) {
		const { news_id, vote_type } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						[`${vote_type}_votes_counter`]: newsItem[
							`${vote_type}_votes_counter`
						]
							? parseInt(newsItem[`${vote_type}_votes_counter`]) + 1
							: 1,
						user_vote_type: vote_type,
					};
				}

				return newsItem;
			}),
		};
	}
	if (action.type === types.DELETE_USER_VOTE_FOR_NEWS_ITEM) {
		const { news_id, vote_type } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						[`${vote_type}_votes_counter`]: newsItem[
							`${vote_type}_votes_counter`
						]
							? parseInt(newsItem[`${vote_type}_votes_counter`]) - 1
							: 0,
						user_vote_type: '',
					};
				}

				return newsItem;
			}),
		};
	}
	if (action.type === types.CHANGE_USER_VOTE_FOR_NEWS_ITEM) {
		const { news_id, old_vote_type, new_vote_type } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						[`${old_vote_type}_votes_counter`]: newsItem[
							`${old_vote_type}_votes_counter`
						]
							? parseInt(newsItem[`${old_vote_type}_votes_counter`]) - 1
							: 0,
						[`${new_vote_type}_votes_counter`]: newsItem[
							`${new_vote_type}_votes_counter`
						]
							? parseInt(newsItem[`${new_vote_type}_votes_counter`]) + 1
							: 1,
						user_vote_type: new_vote_type,
					};
				}

				return newsItem;
			}),
		};
	}

	if (action.type === types.LOAD_USER_VOTE_FOR_NEWS_ITEM) {
		const { news_id, user_vote_type } = action.payload;

		return {
			...state,
			news: state.news.map((newsItem) => {
				if (newsItem.news_id === news_id) {
					return {
						...newsItem,
						user_vote_type,
					};
				}

				return newsItem;
			}),
		};
	}
};

export default reducer;
