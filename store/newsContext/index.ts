import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { INewsContextState, INewsContextStateData } from './ts';
import reducer from './reducer';

let initialState: INewsContextState = {
	data: undefined,
};

const useNewsState = () => useReducer(reducer, initialState);

let createdContainer = createContainer(useNewsState);

export let NewsContextSharedProvider = createdContainer.Provider;
export let useNewsSharedState = createdContainer.useTracked;

let NewsContextStore = {
	NewsContextSharedProvider,
	useNewsSharedState,
};

export default NewsContextStore;

export const setNewsContextStore = ({
	news,
	hit_news_items_limit,
}: INewsContextStateData) => {
	initialState = {
		data: {
			news,
			hit_news_items_limit,
		},
	};

	const useNewsState = () => useReducer(reducer, initialState);

	createdContainer = createContainer(useNewsState);

	return NewsContextStore;
};
