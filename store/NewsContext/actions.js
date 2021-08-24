import types from './types';

// const fetcher = async ({ bodyObj, token, method = 'POST' }) =>
// await fetch(`/api/v1/data`, {
// 	method,
// 	body: JSON.stringify(bodyObj),
// 	headers: {
// 		'Content-Type': 'application/json',
// 		authorization: `Bearer ${token}`,
// 	},
// });

export const handleLoadingNewsItemContent = async ({ dispatch, news_id }) => {
	const { message, status, data } = await fetch(
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

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.ADD_CONTENT_TO_NEWS_ITEM,
		payload: { content: data.content, news_id },
	});

	return {
		status,
		message,
	};
};

export const handleCreatingNewsItem = async ({
	dispatch,
	user,
	newsValues,
	newsType,
}) => {
	let bodyObj = {};

	bodyObj = {
		type: newsType,
		author_user_name_id: user.user_name_id,
		...newsValues,
	};

	const { message, status, data } = await fetch('/api/v1/news', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: user.token ? `Bearer ${user.token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: error.message,
			};
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.ADDING_USER_ONE_NEWS_ITEM_TO_NEWS,
		payload: { user, data, newsValues, newsType },
	});

	return {
		status,
		message,
	};
};
export const handleUpdatingUserNewsItem = async ({
	dispatch,
	user,
	newsType,
	oldValues,
	newValues,
}) => {
	let bodyObj = {};
	let dataChanged = false;

	bodyObj = {
		type: newsType,
		news_id: oldValues.news_id,
		news_data: {},
	};

	const tags = [];

	if (newsType === 'article') {
		const removedTags = [];
		const addedTags = [];

		const oldTags = oldValues.tags;
		const newTags = newValues.tags;

		if (oldTags.length <= newTags.length) {
			newTags.forEach((item, index) => {
				if (oldTags.includes(item)) return tags.push(item);
				addedTags.push(item);
				tags.push(item);
				if (index <= oldTags.length - 1) {
					if (!newTags.includes(oldTags[index]))
						removedTags.push(oldTags[index]);
				}
				if (!dataChanged) dataChanged = true;
			});
		} else if (oldTags.length > newTags.length) {
			oldTags.forEach((item, index) => {
				if (newTags.includes(item)) return tags.push(item);
				removedTags.push(item);
				if (index <= newTags.length - 1) {
					if (!oldTags.includes(newTags[index])) {
						addedTags.push(newTags[index]);
						tags.push(item);
					}
				}
				if (!dataChanged) dataChanged = true;
			});
		}

		bodyObj.tags = {
			removed: removedTags,
			added: addedTags,
		};
	}

	for (let item in newValues) {
		if (item !== 'tags') {
			if (JSON.stringify(oldValues[item]) !== JSON.stringify(newValues[item])) {
				bodyObj.news_data[item] = newValues[item];
				if (!dataChanged) dataChanged = true;
			}
		}
	}

	if (!dataChanged) {
		return {
			status: 'error',
			message: 'There no change in the data!',
		};
	}

	const { message, status, data } = await fetch('/api/v1/news', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: user.token ? `Bearer ${user.token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: error.message,
			};
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.UPDATING_USER_ONE_NEWS_ITEM_IN_NEWS,
		payload: {
			user,
			bodyObj,
			newsType,
			tags:
				(tags?.added?.length !== 0) | (tags?.removed?.length !== 0)
					? tags
					: undefined,
		},
	});

	return {
		status,
		message,
	};
};
export const handleDeletingUserNewsItem = async ({
	dispatch,
	user,
	news_id,
}) => {
	const { message, status, data } = await fetch('/api/v1/news', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: user.token ? `Bearer ${user.token}` : undefined,
		},
		body: JSON.stringify({ news_id }),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: error.message,
			};
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.DELETING_USER_ONE_NEWS_ITEM_IN_NEWS,
		payload: {
			news_id,
		},
	});

	return {
		status,
		message,
	};
};

export const handleLoadingNewsItemComments = async ({ dispatch, newsItem }) => {
	// setLoadingComments(true);

	let fetchInput = `/api/v1/news/comments/comment/?type=comment_main&news_id=${newsItem.news_id}`;

	if (newsItem.last_comment_created_at) {
		fetchInput += `&last_comment_created_at=${newsItem.last_comment_created_at}`;
	}

	if (newsItem?.comments_to_not_fetch?.length > 0) {
		fetchInput += `&comments_to_not_fetch=${newsItem.comments_to_not_fetch.join(
			','
		)}`;
	}

	const { status, message, data } = await fetch(fetchInput).then((response) =>
		response.json()
	);

	if (!status || (status && status === 'error')) {
		// setLoadingComments(false);
		console.error(message);

		return {
			status: 'error',
			message,
		};
	}

	const dataToAdd = {};

	if (data?.comments.length > 0) {
		dataToAdd.last_comment_created_at = data.comments[data.comments.length - 1]
			? data.comments[data.comments.length - 1].created_at
			: data.comments[data.comments.length - 1].created_at
			? data.comments[data.comments.length - 1].created_at
			: undefined;
		dataToAdd.comments = [...newsItem.comments, ...data.comments];
	}

	if (
		data.hit_comments_limit ||
		(dataToAdd.comments &&
			dataToAdd.comments.length === newsItem.comments_counter) ||
		!dataToAdd.comments
	) {
		dataToAdd.hit_comments_limit = true;
		// setHitCommentsLimit(true);
	}

	dispatch({
		type: types.ADD_COMMENTS_TO_NEWS_ITEM,
		payload: { dataToAdd, news_id: newsItem.news_id },
	});

	return {
		status,
		message,
	};
};
export const handlePostingCommentToNewsItem = async ({
	dispatch,
	news_id,
	commentType,
	commentContent,
	user,
}) => {
	const body = JSON.stringify({
		type: commentType,
		content: commentContent,
		news_id: news_id,
	});

	const {
		status,
		message,
		data: comment,
	} = await fetch('/api/v1/news/comments/comment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: user.token ? `Bearer ${user.token}` : undefined,
		},
		body,
	})
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message, data: {} };
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.ADD_COMMENT_TO_NEWS_ITEM_AFTER_POSTING,
		payload: { user, news_id, comment, commentContent },
	});

	return {
		status,
		message,
	};
};
export const handleLoadingCommentRepliesInNewsItem = async ({
	dispatch,
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

	const { status, message, data } = await fetch(fetchInput).then((response) =>
		response.json()
	);

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.LOADING_COMMENT_REPLIES_IN_A_NEWS_ITEM,
		payload: { news_id, data, parent_id },
	});

	return {
		status,
		message,
	};
};
export const handleReplyingToMainOrReplyCommentInNewsItem = async ({
	dispatch,
	user,
	bodyObj,
}) => {
	const { status, message, data } = await fetch(
		'/api/v1/news/comments/comment',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: user.token ? `Bearer ${user.token}` : undefined,
			},
			body: JSON.stringify(bodyObj),
		}
	)
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.ADDING_REPLY_TO_A_MAIN_COMMENT_OR_A_REPLY_TO_A_COMMENT_IN_A_NEWS_ITEM,
		payload: { user, bodyObj, news_comment_id: data.news_comment_id },
	});

	return {
		status,
		message,
	};
};
export const handleUpdatingMainOrReplyCommentInNewsItem = async ({
	dispatch,
	user,
	bodyObj,
	comment,
	news_id,
	parent_data_id,
}) => {
	const { status, message, data } = await fetch(
		'/api/v1/news/comments/comment',
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: user.token ? `Bearer ${user.token}` : undefined,
			},
			body: JSON.stringify(bodyObj),
		}
	)
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.UPDATING_A_MAIN_OR_A__REPLY_COMMENT_IN_A_NEWS_ITEM,
		payload: { bodyObj, news_id, comment, parent_data_id },
	});

	return {
		status,
		message,
	};
};
export const handleDeletingMainOrReplyCommentInNewsItem = async ({
	dispatch,
	user,
	bodyObj,
	news_id,
	comment,
}) => {
	const { status, message, data } = await fetch(
		'/api/v1/news/comments/comment',
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: user.token ? `Bearer ${user.token}` : undefined,
			},
			body: JSON.stringify(bodyObj),
		}
	)
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.DELETING_A_MAIN_OR_A__REPLY_COMMENT_IN_A_NEWS_ITEM,
		payload: { bodyObj, news_id, comment },
	});

	return {
		status,
		message,
	};
};

export const HandleAddingUserVote = async ({
	dispatch,
	user,
	news_id,
	vote_type,
}) => {
	const { status, message, data } = await fetch('/api/v1/news/votes/vote', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: user.token ? `Bearer ${user.token}` : undefined,
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

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.ADD_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, vote_type },
	});

	return {
		status,
		message,
	};
};

export const HandleDeletingUserVote = async ({
	dispatch,
	user,
	news_id,
	vote_type,
}) => {
	const { status, message, data } = await fetch('/api/v1/news/votes/vote', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			authorization: user.token ? `Bearer ${user.token}` : undefined,
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

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.DELETE_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, vote_type },
	});

	return {
		status,
		message,
	};
};

export const HandleChangingUserVote = async ({
	dispatch,
	user,
	news_id,
	old_vote_type,
	new_vote_type,
}) => {
	const { status, message, data } = await fetch('/api/v1/news/votes/vote', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: user.token ? `Bearer ${user.token}` : undefined,
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

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.CHANGE_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, old_vote_type, new_vote_type },
	});

	return {
		status,
		message,
	};
};

export const HandleLoadingUserVote = async ({
	dispatch,
	news_id,
	user,
	state,
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

	const { status, message, data } = await fetch(
		`/api/v1/news/votes/vote/?${query}`
	)
		.then((response) => response.json())
		.catch((error) => {
			return { status: 'error', message: error.message };
		});

	if (!status || (status && status === 'error')) {
		console.error(message);
		return {
			status: 'error',
			message,
		};
	}

	dispatch({
		type: types.LOAD_USER_VOTE_FOR_NEWS_ITEM,
		payload: { news_id, user_vote_type: data.user_vote_type },
	});

	return {
		status,
		message,
	};
};
