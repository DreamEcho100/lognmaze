import { createContext, useMemo, useReducer } from 'react';

import types from './types';
import reducer from './reducer';

const UserContext = createContext({
	state: [],
	dispatch: () => {},
	types: {},
});

export const UserExistContext = createContext(false);

const initialState = {
	user: {},
	token: '',
	isVerifyingUserLoading: true,
};

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const userExist = state.token && state.user.id ? true : false;

	const stateContext = useMemo(
		() => ({
			state,
			dispatch,
		}),
		[state, dispatch]
	);
	const userExistContext = useMemo(() => ({ userExist }), [userExist]);

	return (
		<UserContext.Provider value={stateContext}>
			<UserExistContext.Provider value={userExistContext}>
				{children}
			</UserExistContext.Provider>
		</UserContext.Provider>
	);
};

export default UserContext;
