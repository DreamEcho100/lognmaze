import { createContext, useReducer } from 'react';

import types from './types';
import reducer from './reducer';

const UserContextTest = createContext({
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

export const UserContextTestProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const context = {
		state,
		dispatch,
		types,
	};

	return (
		<UserContextTest.Provider value={context}>
			{children}
		</UserContextTest.Provider>
	);
};

export default UserContextTest;
