import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { INewsContextState, INewsContextStateData } from './ts';
import reducer from './reducer';
import { returnNewsInitialState } from './initialState';

let initialState: INewsContextState = returnNewsInitialState();

const useNewsState = () => useReducer(reducer, initialState);

let createdContainer = createContainer(useNewsState);

export let NewsContextSharedProvider = createdContainer.Provider;
export let useNewsSharedState = createdContainer.useTracked;

let NewsContextStore = {
	NewsContextSharedProvider,
	useNewsSharedState,
};

export default NewsContextStore;

export interface ISetNewsContextStorePropsActionInit {
	initWithMainComments?: boolean;
	initModalWithGetTypeBlogContent?: boolean;
}

export interface ISetNewsContextStoreProps {
	data: {
		news: INewsContextStateData['news'];
		newsExtra: INewsContextStateData['newsExtra'];
		hit_news_items_limit: INewsContextStateData['hit_news_items_limit'];
	};
	actions?: {
		items: INewsContextState['actions']['items'];
	};
}

export const setNewsContextStore = (props: ISetNewsContextStoreProps) => {
	const init = returnNewsInitialState();

	initialState = {
		...init,
		data: {
			...init.data,
			...props.data,
		},
		actions: {
			...init.actions,
			...props.actions,
		},
	};

	const useNewsState = () => useReducer(reducer, initialState);

	createdContainer = createContainer(useNewsState);

	return NewsContextStore;
};
