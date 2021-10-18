import {
	useReducer,
} from 'react';
import { createContainer } from 'react-tracked';

// import types from './types';
import reducer from './reducer';

const initialState = {
	user: {},
	token: '',
	isVerifyingUserLoading: true,
	userExist: false,
};

const useUserState = () => useReducer(reducer, initialState);

export const {
	Provider: UserContextSharedProvider,
	useTracked: useUserSharedState,
} = createContainer(useUserState);

const obj = {
	UserContextSharedProvider,
	useUserSharedState,
};

export default obj;

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

// export const useSharedState = () => {
//   const value = useContext(UserContext);
//   if (value === null) throw new Error('Please add UserContextSharedProvider');
//   return value;
// };

// export default UserContext;
