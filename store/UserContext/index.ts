import { useReducer } from 'react';
import { createContainer } from 'react-tracked'; // @utils/v1/react-tracked

import { IUserContextState } from './ts';
import { IUser } from '@coreLib/ts/global';
import reducer from './reducer';
import ls from '@commonLibIndependent/storage/localStorage';
import { getCookie } from '@commonLibIndependent/storage/cookie/document';

const initialState: IUserContextState = {
	data: {
		user: ls.get<IUser | undefined>('userData', undefined),
		token: typeof window !== 'undefined' ? getCookie('accessToken') : undefined,
	},
	actions: {
		requests: {
			login: {
				errorMessage: '',
				isLoading: false,
				success: false,
			},
			signup: {
				errorMessage: '',
				isLoading: false,
				success: false,
			},
			logout: {
				errorMessage: '',
				isLoading: false,
				success: false,
			},
		},
	},
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

// export const useUserSharedState = () => {
//   const value = useContext(UserContext);
//   if (value === null) throw new Error('Please add UserContextSharedProvider');
//   return value;
// };

// export default UserContext;
