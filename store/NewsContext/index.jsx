import { createContext, useMemo, useReducer } from 'react';

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

	const stateContext = useMemo(
		() => ({
			state,
			dispatch,
		}),
		[state, dispatch]
	);

	return (
		<NewsContext.Provider value={stateContext}>{children}</NewsContext.Provider>
	);
};

export default NewsContext;
