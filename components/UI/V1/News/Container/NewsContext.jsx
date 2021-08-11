import { createContext, useState, useEffect } from 'react';

const NewsContext = createContext({
	news: {},
	// handleUpdateNewsDataForFirstTime: () => {},
	// handleSetNewsDataForFirstTime: () => {},
	checkDataForUpdates: () => {},
});

export const NewsContextProvider = ({ children }) => {
	const [news, setNews] = useState({});

	const checkDataForUpdates = (data) => {
		console.log('data', data);};

	// const handleSetNewsDataForFirstTime = (data) => {
	// 	console.log('data', data);
	// 	setNews(data);
	// };

	// const handleUpdateNewsDataForFirstTime = (data) => {
	// 	console.log('data', data);
	// 	setNews(data);
	// };

	const context = {
		news,
		// handleUpdateNewsDataForFirstTime,
		// handleSetNewsDataForFirstTime,
		checkDataForUpdates,
	};

	return (
		<NewsContext.Provider value={context}>{children}</NewsContext.Provider>
	);
};

export default NewsContext;
