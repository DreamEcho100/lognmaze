import types from './types';

export const handleLoadingNewsItemContent = async ({ dispatch, news_id }) => {
	const { message, status, data } = await fetch(
		`/api/v1/news/articles/article/content/${news_id}`
	)
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return {
				status: 'error',
				message: "# Couldn't load content!\n" + error.message,
			};
		});

	if (!status || status === 'error') {
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

	if (!status || status === 'error') {
		// setLoadingComments(false);
		console.error(message);

		return {
			status: 'error',
			message,
		};
	}

	const dataToAdd = {};

	if (data?.comments.length > 0) {
		dataToAdd.last_comment_created_at =
			data.comments[data.comments.length - 1].created_at;
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

// const actions = {
// 	handleLoadingNewsItemContent,

// 	handleLoadingNewsItemComments,
// };

// export default actions;
