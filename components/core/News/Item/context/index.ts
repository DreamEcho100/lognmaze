import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// import { INewsContextState, INewsContextStateData } from './ts';
import reducer from './reducer';
import { returnNewsItemExtraDataInitialState } from './initialState';
import { INewsItemExtraDataContext } from './ts';

let initialState = returnNewsItemExtraDataInitialState();

const useNewsItemExtraDataState = () => useReducer(reducer, initialState);

let createdContainer = createContainer(useNewsItemExtraDataState);

export const NewsItemExtraDataContextSharedProvider = createdContainer.Provider;
export const useNewsItemExtraDataSharedState = createdContainer.useTracked;

const NewsItemExtraDataContextStore = {
	NewsItemExtraDataContextSharedProvider,
	useNewsItemExtraDataSharedState,
};

export default NewsItemExtraDataContextStore;

export const setNewsItemExtraDataContextStore = ({
	data,
}: {
	data: Partial<INewsItemExtraDataContext['data']>;
}) => {
	const init = returnNewsItemExtraDataInitialState();

	initialState = {
		...init,
		data: {
			...init.data,
			...data,
		},
	};

	const useNewsItemExtraDataState = () => useReducer(reducer, initialState);

	createdContainer = createContainer(useNewsItemExtraDataState);

	return NewsItemExtraDataContextStore;
};
