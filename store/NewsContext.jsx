import { createContext, useState, useEffect, useContext } from 'react';

import UserContext from '@store/UserContext';

const NewsContext = createContext({
	news: {},
	isLoadingUserVote: false,
	isLoadingContent: false,
	setNews: () => {},
	setIsLoadingUserVote: () => {},
	checkDataForUpdates: () => {},
	handleSetNewsDataForFirstTime: () => {},
	handleLoadingArticleContent: () => {},
});

export const NewsContextProvider = ({ children }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [news, setNews] = useState({});
	const [isLoadingUserVote, setIsLoadingUserVote] = useState(false);
	const [isLoadingContent, setIsLoadingContent] = useState(false);

	const checkDataForUpdates = (data) => {};

	const handleSetNewsDataForFirstTime = async (data) => {
		let extraData = {};

		if (
			/*!data.comments && */
			!data.comments ||
			(Array.isArray(data.comments) && data.comments.length === 0)
		) {
			extraData.comments = [];
		}

		setNews({
			...data,
			...extraData,
		});
	};

	const handleLoadingArticleContent = async () => {
		setIsLoadingContent(true);
		await fetch(`/api/v1/news/articles/article/content/${news.news_id}`)
			.then((response) => response.json())
			.then(({ message, status, data }) => {
				setNews((prev) => ({
					...prev,
					...data,
				}));
			})
			.catch((error) => console.error(error));
		setIsLoadingContent(false);
	};

	useEffect(() => {
		if (Object.keys(user).length === 0) {
			setNews((prev) => ({
				...prev,
				user_vote_type: '',
			}));
		}
	}, [user]);

	useEffect(async () => {
		if (!UserCxt.isLoading && isLoadingUserVote) {
			if (
				news.news_id &&
				(!news.user_vote_type ||
					(news.user_vote_type && news.user_vote_type.length === 0))
			) {
				let query = `news_id=${news.news_id}`;
				if (user.id) query += `&voter_id=${user.id}`;

				const {
					status,
					message,
					data: user_vote_typeData,
				} = await fetch(`/api/v1/news/votes/vote/?${query}`).then((response) =>
					response.json()
				);

				if (status === 'error') {
					console.error(message);
					return;
				}

				setNews((prev) => ({
					...prev,
					...user_vote_typeData,
				}));

				setIsLoadingUserVote(false);
			}
		}
	}, [UserCxt.isLoading, isLoadingUserVote]);

	useEffect(async () => {
		if (isLoadingContent) {
			if (!news.content) {
				await handleLoadingArticleContent();
			}
			setIsLoadingContent(false);
		}
	}, [isLoadingContent]);

	const context = {
		news,
		isLoadingUserVote,
		isLoadingContent,
		setNews,
		setIsLoadingUserVote,
		setIsLoadingContent,
		checkDataForUpdates,
		handleSetNewsDataForFirstTime,
		handleLoadingArticleContent,
	};

	return (
		<NewsContext.Provider value={context}>{children}</NewsContext.Provider>
	);
};

export default NewsContext;
