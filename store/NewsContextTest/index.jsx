import {
	createContext,
	useReducer,
	// , useState, useEffect, useContext
} from 'react';

// import UserContext from '@store/UserContext';
import types from './types';
import reducer from './reducer';

const NewsContextTest = createContext({
	state: [],
	dispatch: () => {},
	types: {},
});

const initialState = {
	newsType: '',
	news: [],
};

export const NewsContextProviderTest = ({ children }) => {
	// const { user /*, ...UserCxt*/ } = useContext(UserContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	const context = {
		state,
		dispatch,
		types,
	};

	return (
		<NewsContextTest.Provider value={context}>
			{children}
		</NewsContextTest.Provider>
	);
};

export default NewsContextTest;
