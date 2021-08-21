import types from './types';

const reducer = (state, action) => {
	console.log('state', state);
	console.log('action', action);

	if (action.type === types.INIT_STATE) {
		return {
			newsType: action.payload.newsType,
			news: action.payload.news?.map((item) => ({
				...item,
				comments: [],
				hit_comments_limit: item.comments_counter === 0 ? true : false,
			})),
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
};

export default reducer;
