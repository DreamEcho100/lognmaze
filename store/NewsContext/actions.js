import types from './types';

export const handleAddingNewsFirstTime = ({
	newsDispatch,
	news,
	newsType,
	newsFetchRouteQuery,
}) => {
	if (news.length !== 0) {
		newsDispatch({
			type: types.INIT_STATE,
			payload: { news, newsType, newsFetchRouteQuery },
		});
	}
};

export const handleLoadingNewsItemContent = async ({
	newsDispatch,
	news_id,
}) => {
	newsDispatch({
		type: types.SET_IS_LOADING_CONTENT_IN_NEWS_ITEM,
		payload: { news_id: news_id, isLoadingContent: true },
	});

	const newsResult = await fetch(
		`/api/v1/news/articles/article/content/${news_id}`
	)
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: "# Couldn't load content! \n" + +error.message,
			};
		});

	if (newsResult?.status === 'error') {
		console.error(newsResult.message);
		return {
			status: 'error',
			message: newsResult.message,
		};
	}

	newsDispatch({
		type: types.ADD_CONTENT_TO_NEWS_ITEM,
		payload: {
			content: newsResult.data.content,
			news_id,
		},
	});

	return {
		status: newsResult.status,
		message: newsResult.message,
	};
};
export const handleLoadMoreNewsItems = async ({
	newsDispatch,
	last_news_item_created_at,
	newsFetchRouteQuery,
}) => {
	newsDispatch({
		type: types.SET_IS_LOADING_MORE_NEWS_ITEM,
		payload: { isLoadingMoreNewsItems: true },
	});

	const query =
		newsFetchRouteQuery?.length === 0
			? `/?last_news_item_created_at=${last_news_item_created_at}`
			: `${newsFetchRouteQuery}&last_news_item_created_at=${last_news_item_created_at}`;

	const newsResult = await fetch(`/api/v1/news${query}`)
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: "# Couldn't load more news! \n" + +error.message,
			};
		});

	if (newsResult?.status === 'error') {
		console.error(newsResult.message);
		return {
			status: 'error',
			message: newsResult.message,
		};
	}

	newsDispatch({
		type: types.ADD_MORE_NEWS_ITEM,
		payload: {
			newNewsItem: newsResult.data.news.map((item) => ({
				...item,
				...item.type_data,
				type_data: undefined,
			})),
			hit_news_items_limit: newsResult.data.hit_news_items_limit,
			isLoadingMoreNewsItems: false,
		},
	});

	return {
		status: newsResult.status,
		message: newsResult.message,
	};
};
export const handleCreatingNewsItem = async ({
	newsDispatch,
	user,
	token,
	newsValues,
	newsType,
}) => {
	let bodyObj = {};

	bodyObj = {
		type: newsType,
		author_user_name_id: user.user_name_id,
		...{ ...newsValues, tags: [...new Set(newsValues.tags)] },
	};

	const newsResult = await fetch('/api/v1/news', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: error.message,
			};
		});

	if (newsResult?.status === 'error') {
		console.error(newsResult.message);
		return {
			status: 'error',
			message: newsResult.message,
		};
	}

	newsDispatch({
		type: types.ADDING_USER_ONE_NEWS_ITEM_TO_NEWS,
		payload: { user, data: newsResult.data, newsValues, newsType },
	});

	return {
		status: newsResult.status,
		message: newsResult.message,
	};
};
export const handleUpdatingUserNewsItem = async ({
	newsDispatch,
	user,
	token,
	newsType,
	newValues,
	oldValues,
}) => {
	let bodyObj = {};
	let dataChanged = false;

	bodyObj = {
		type: newsType,
		news_id: oldValues.news_id,
		news_data: {},
	};

	let tagsChanged = false;
	let tags;

	if (newsType === 'article') {
		const removedTags = [];
		const addedTags = [];

		const oldTags = [...new Set([oldValues.tags])];
		const newTags =
			newValues.tags.length !== 0
				? [...new Set([newValues.tags.filter((item) => item.length !== 0)])]
				: [];

		if (oldTags.length <= newTags.length) {
			newTags.forEach((item, index) => {
				if (!oldTags.includes(item) && item.length !== 0) {
					addedTags.push(item);
				}

				if (index <= oldTags.length - 1) {
					if (!newTags.includes(oldTags[index])) {
						removedTags.push(oldTags[index]);
					}
				}
			});
		} else if (oldTags.length > newTags.length) {
			oldTags.forEach((item, index) => {
				if (!newTags.includes(item) && item.length !== 0) {
					removedTags.push(item);
				}

				if (index <= newTags.length - 1) {
					if (!oldTags.includes(newTags[index])) {
						addedTags.push(newTags[index]);
					}
				}
			});
		}

		tags = [
			...oldTags.filter((item) => {
				return !removedTags.includes(item);
			}),
			...addedTags,
		];

		if (tags?.added?.length !== 0 || tags?.removed?.length !== 0) {
			if (!tagsChanged) tagsChanged = true;
			if (!dataChanged) dataChanged = true;
		}

		bodyObj.tags = {
			removed: removedTags,
			added: addedTags,
		};
	}

	console.log('tags', tags);
	console.log('bodyObj.tags', bodyObj.tags);

	for (let item in newValues) {
		if (item !== 'tags') {
			if (JSON.stringify(oldValues[item]) !== JSON.stringify(newValues[item])) {
				bodyObj.news_data[item] = newValues[item];
				if (!dataChanged) dataChanged = true;
			}
		}
	}

	// return {
	// 	status: 'error',
	// 	message: 'There no change in the data!',
	// };

	if (!dataChanged) {
		return {
			status: 'error',
			message: 'There no change in the data!',
		};
	}

	const /* { message, status, data } */ newsResult = await fetch(
			'/api/v1/news',
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					authorization: token ? `Bearer ${token}` : undefined,
				},
				body: JSON.stringify(bodyObj),
			}
		)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error.message);
				return {
					status: 'error',
					message: error.message,
				};
			});

	if (newsResult?.status === 'error') {
		console.error(newsResult.message);
		return {
			status: 'error',
			message: newsResult.message,
		};
	}

	newsDispatch({
		type: types.UPDATING_USER_ONE_NEWS_ITEM_IN_NEWS,
		payload: {
			user,
			bodyObj,
			newsType,
			tags,
			tagsChanged,
		},
	});

	return {
		status: newsResult.status,
		message: newsResult.message,
	};
};
export const handleDeletingUserNewsItem = async ({
	newsDispatch,
	token,
	news_id,
	newsType,
	tags,
}) => {
	const newsResult = await fetch('/api/v1/news', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify({ news_id, type: newsType, tags }),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: error.message,
			};
		});

	if (newsResult?.status === 'error') {
		console.error(newsResult.message);
		return {
			status: 'error',
			message: newsResult.message,
		};
	}

	newsDispatch({
		type: types.DELETING_USER_ONE_NEWS_ITEM_IN_NEWS,
		payload: {
			news_id,
		},
	});

	return {
		status: newsResult.status,
		message: newsResult.message,
	};
};

export const handleLoadingNewsItemComments = async ({
	newsDispatch,
	newsItem,
}) => {
	let fetchInput = `/api/v1/news/comments/comment/?type=comment_main&news_id=${newsItem.news_id}`;

	if (newsItem.last_comment_created_at) {
		fetchInput += `&last_comment_created_at=${newsItem.last_comment_created_at}`;
	}

	if (newsItem?.comments_to_not_fetch?.length > 0) {
		fetchInput += `&comments_to_not_fetch=${newsItem.comments_to_not_fetch.join(
			','
		)}`;
	}

	const newsResult = await fetch(fetchInput).then((response) =>
		response.json()
	);

	if (newsResult?.status === 'error') {
		console.error(newsResult.message);

		return {
			status: 'error',
			message: newsResult.message,
		};
	}

	const dataToAdd = {};

	if (newsResult?.data?.comments.length > 0) {
		dataToAdd.last_comment_created_at = newsResult.data.comments[
			newsResult.data.comments.length - 1
		]
			? newsResult.data.comments[newsResult.data.comments.length - 1].created_at
			: newsResult.data.comments[newsResult.data.comments.length - 1].created_at
			? newsResult.data.comments[newsResult.data.comments.length - 1].created_at
			: undefined;
		dataToAdd.comments = [...newsItem.comments, ...newsResult.data.comments];
	}

	if (
		newsResult.data.hit_comments_limit ||
		(dataToAdd.comments &&
			dataToAdd.comments.length === newsItem.comments_counter) ||
		!dataToAdd.comments
	) {
		dataToAdd.hit_comments_limit = true;
	}

	newsDispatch({
		type: types.ADD_COMMENTS_TO_NEWS_ITEM,
		payload: { dataToAdd, news_id: newsItem.news_id },
	});

	return {
		status: newsResult.status,
		message: newsResult.message,
	};
};
export const handlePostingCommentToNewsItem = async ({
	newsDispatch,
	news_id,
	commentType,
	commentContent,
	user,
	token,
}) => {
	const body = JSON.stringify({
		type: commentType,
		content: commentContent,
		news_id: news_id,
	});

	const commentResult = await fetch('/api/v1/news/comments/comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body,
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message, data: {} };
		});

	if (commentResult?.status === 'error') {
		console.error(commentResult.message);
		return {
			status: 'error',
			message: commentResult.message,
		};
	}

	newsDispatch({
		type: types.ADD_COMMENT_TO_NEWS_ITEM_AFTER_POSTING,
		payload: { user, news_id, comment: commentResult.data, commentContent },
	});

	return {
		status: commentResult.status,
		message: commentResult.message,
	};
};
export const handleLoadingCommentRepliesInNewsItem = async ({
	newsDispatch,
	comment,
	parent_id,
	news_id,
}) => {
	let fetchInput = `/api/v1/news/comments/comment/?type=comment_main_reply&parent_id=${parent_id}`;

	if (comment.last_reply_created_at) {
		fetchInput += `&last_reply_created_at=${comment.last_reply_created_at}`;
	}

	if (comment.replies_to_not_fetch && comment.replies_to_not_fetch.length > 0) {
		fetchInput += `&replies_to_not_fetch=${comment.replies_to_not_fetch.join(
			','
		)}`;
	}

	const repliesResult = await fetch(fetchInput).then((response) =>
		response.json()
	);

	if (repliesResult?.status === 'error') {
		console.error(repliesResult.message);
		return {
			status: 'error',
			message: repliesResult.message,
		};
	}

	newsDispatch({
		type: types.LOADING_COMMENT_REPLIES_IN_A_NEWS_ITEM,
		payload: { news_id, data: repliesResult.data, parent_id },
	});

	return {
		status: repliesResult.status,
		message: repliesResult.message,
	};
};
export const handleReplyingToMainOrReplyCommentInNewsItem = async ({
	newsDispatch,
	user,
	token,
	bodyObj,
}) => {
	const replyResult = await fetch('/api/v1/news/comments/comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (replyResult?.status === 'error') {
		console.error(replyResult.message);
		return {
			status: 'error',
			message: replyResult.message,
		};
	}

	newsDispatch({
		type: types.ADDING_REPLY_TO_A_MAIN_COMMENT_OR_A_REPLY_TO_A_COMMENT_IN_A_NEWS_ITEM,
		payload: {
			user,
			bodyObj,
			news_comment_id: replyResult.data.news_comment_id,
		},
	});

	return {
		status: replyResult.status,
		message: replyResult.message,
	};
};
export const handleUpdatingMainOrReplyCommentInNewsItem = async ({
	newsDispatch,
	token,
	bodyObj,
	comment,
	news_id,
	parent_data_id,
}) => {
	const result = await fetch('/api/v1/news/comments/comment', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (result?.status === 'error') {
		console.error(result.message);
		return {
			status: 'error',
			message: result.message,
		};
	}

	newsDispatch({
		type: types.UPDATING_A_MAIN_OR_A__REPLY_COMMENT_IN_A_NEWS_ITEM,
		payload: { bodyObj, news_id, comment, parent_data_id },
	});

	return {
		status: result.status,
		message: result.message,
	};
};
export const handleDeletingMainOrReplyCommentInNewsItem = async ({
	newsDispatch,
	token,
	bodyObj,
	news_id,
	comment,
}) => {
	const result = await fetch('/api/v1/news/comments/comment', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (result?.status === 'error') {
		console.error(result.message);
		return {
			status: 'error',
			message: result.message,
		};
	}

	newsDispatch({
		type: types.DELETING_A_MAIN_OR_A__REPLY_COMMENT_IN_A_NEWS_ITEM,
		payload: { bodyObj, news_id, comment },
	});

	return {
		status: result.status,
		message: result.message,
	};
};

export const HandleAddingUserVote = async ({
	newsDispatch,
	token,
	news_id,
	vote_type,
}) => {
	const voteResult = await fetch('/api/v1/news/votes/vote', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify({
			news_id,
			vote_type,
		}),
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (voteResult?.status === 'error') {
		console.error(voteResult.message);
		return {
			status: 'error',
			message: voteResult.message,
		};
	}

	newsDispatch({
		type: types.ADD_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, vote_type },
	});

	return {
		status: voteResult.status,
		message: voteResult.message,
	};
};

export const HandleDeletingUserVote = async ({
	newsDispatch,
	token,
	news_id,
	vote_type,
}) => {
	const voteResult = await fetch('/api/v1/news/votes/vote', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify({
			news_id,
			vote_type,
		}),
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (voteResult?.status === 'error') {
		console.error(voteResult.message);
		return {
			status: 'error',
			message: voteResult.message,
		};
	}

	newsDispatch({
		type: types.DELETE_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, vote_type },
	});

	return {
		status: voteResult.status,
		message: voteResult.message,
	};
};

export const HandleChangingUserVote = async ({
	newsDispatch,
	token,
	news_id,
	old_vote_type,
	new_vote_type,
}) => {
	const voteResult = await fetch('/api/v1/news/votes/vote', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify({
			news_id,
			old_type: old_vote_type,
			new_type: new_vote_type,
		}),
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (voteResult?.status === 'error') {
		console.error(voteResult.message);
		return {
			status: 'error',
			message: voteResult.message,
		};
	}

	newsDispatch({
		type: types.CHANGE_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, old_vote_type, new_vote_type },
	});

	return {
		status: voteResult.status,
		message: voteResult.message,
	};
};

export const HandleLoadingUserVote = async ({
	newsDispatch,
	news_id,
	user,
}) => {
	if (!user) {
		console.error('No user been detected to retrieve his/her vote');
		return {
			status: 'error',
			message: 'No user been detected to retrieve his/her vote',
		};
	}

	let query = `news_id=${news_id}`;
	if (user.id) query += `&voter_id=${user.id}`;

	const voteResult = await fetch(`/api/v1/news/votes/vote/?${query}`)
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (voteResult?.status === 'error') {
		console.error(voteResult.message);
		return {
			status: 'error',
			message: voteResult.message,
		};
	}

	newsDispatch({
		type: types.LOAD_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, user_vote_type: voteResult.data.user_vote_type },
	});

	return {
		status: voteResult.status,
		message: voteResult.message,
	};
};
