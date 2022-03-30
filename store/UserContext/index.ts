import { useReducer } from 'react';
import { createContainer } from 'react-tracked'; // @utils/v1/react-tracked

import { IUserContextState } from './ts';
// import { IUserAuthenticatedData } from '@coreLib/ts/global';
import reducer from './reducer';
import { returnUserContextInitialState } from './initialState';
// import ls from '@commonLibIndependent/storage/localStorage';
// import { getCookie } from '@commonLibIndependent/storage/cookie/document';

let initialState: IUserContextState = returnUserContextInitialState();

let useUserState = () => useReducer(reducer, initialState);

let createdContainer = createContainer(useUserState);

export let UserContextSharedProvider = createdContainer.Provider;
export let useUserSharedState = createdContainer.useTracked;

// export let {
// 	Provider: UserContextSharedProvider,
// 	useTracked: useUserSharedState,
// } = createContainer(useUserState);

let UserContextStore = {
	UserContextSharedProvider,
	useUserSharedState,
};

export default UserContextStore;

// const UserContext = createContext({
// 	state: [],
// 	dispatch: () => {},
// 	types: {},
// 	userExist: false,
// });

// export const UserExistContext = createContext(false);

// export const UserContextSharedProvider = ({ children }) => {
// 	const state = useUserState();
// 	// const [state, dispatch] = useReducer(reducer, initialState);

// 	const userExist = state.token && state.user.id ? true : false;

// 	const userExistContext = useMemo(() => ({ userExist }), [userExist]);

// 	return (
// 		<UserContext.Provider value={state}>
// 			<UserExistContext.Provider value={userExistContext}>
// 				{children}
// 			</UserExistContext.Provider>
// 		</UserContext.Provider>
// 	);
// };

// export const useUserSharedState = () => {
//   const value = useContext(UserContext);
//   if (value === null) throw new Error('Please add UserContextSharedProvider');
//   return value;
// };

// export default UserContext;
