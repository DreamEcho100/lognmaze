import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { INewsItemContextState, INewsItemContextStateData } from './ts';
import reducer from './reducer';
import { returnNewsItemInitialState } from './initialState';

let initialState: INewsItemContextState = returnNewsItemInitialState();

const useNewsItemState = () => useReducer(reducer, initialState);

let createdContainer = createContainer(useNewsItemState);

export let NewsItemContextSharedProvider = createdContainer.Provider;
export let useNewsItemSharedState = createdContainer.useTracked;

let NewsItemContextStore = {
	NewsItemContextSharedProvider,
	useNewsItemSharedState,
};

export default NewsItemContextStore;

export const setNewsItemContextStore = ({
	newsItem,
	hit_comments_limit = false,
	newsItemDetailsType = 'description',
	newsItemModelDetailsType = 'content',
	initActions = {
		initWithMainComments: false,
		initModalWithGetTypeBlogContent: true,
	},
}: {
	newsItem: INewsItemContextStateData['newsItem'];
	hit_comments_limit?: INewsItemContextStateData['hit_comments_limit'];
	newsItemDetailsType?: INewsItemContextStateData['newsItemDetailsType'];
	newsItemModelDetailsType?: INewsItemContextStateData['newsItemModelDetailsType'];
	initActions?: {
		initWithMainComments?: boolean;
		initModalWithGetTypeBlogContent?: boolean;
	};
}) => {
	const initState = returnNewsItemInitialState();

	initialState = {
		data: {
			...initState.data,
			newsItem,
			hit_comments_limit,
			newsItemDetailsType,
			newsItemModelDetailsType,
		},
		actions: {
			...initState.actions,
			request: {
				...initState.actions.request,
			},
			init: {
				...initState.actions.init,
				getComments: {
					isLoading: initActions.initWithMainComments || false,
					error: '',
					success: false,
				},
				modal: {
					...initState.actions.init.modal,
					getTypeBlogContent: {
						isLoading: initActions.initModalWithGetTypeBlogContent || true,
						error: '',
						success: false,
					},
				},
			},
		},
	};

	const useNewsItemState = () => useReducer(reducer, initialState);

	createdContainer = createContainer(useNewsItemState);

	return NewsItemContextStore;
};
