import { createContext, useReducer } from 'react';

import types from './types';
import reducer from './reducer';

const NewsContext = createContext({
	state: [],
	dispatch: () => {},
	types: {},
});

const initialState = {
	newsType: '',
	news: [],
};

export const NewsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const context = {
		state,
		dispatch,
		types,
	};

	return (
		<NewsContext.Provider value={context}>{children}</NewsContext.Provider>
	);
};

export default NewsContext;
