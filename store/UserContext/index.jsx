import { createContext, useReducer } from 'react';

import types from './types';
import reducer from './reducer';

const UserContext = createContext({
	state: [],
	dispatch: () => {},
	types: {},
});

const initialState = {
	user: {},
	token: '',
	userExist: false,
	isVerifyingUserLoading: true,
};

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const context = {
		state,
		dispatch,
		types,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
