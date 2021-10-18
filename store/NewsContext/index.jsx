import {
	useReducer,
} from 'react';
import { createContainer } from 'react-tracked';

import reducer from './reducer';

const initialState = {
	newsType: '',
	news: [],
};

const useNewsState = () => useReducer(reducer, initialState);

export const {
	Provider: NewsContextSharedProvider,
	useTracked: useNewsSharedState,
} = createContainer(useNewsState);

const obj = {
	NewsContextSharedProvider,
	useNewsSharedState,
};

export default obj;

// const NewsContext = createContext({
// 	state: [],
// 	dispatch: () => {},
// 	types: {},
// });

// export const NewsContextProvider = ({ children }) => {
// 	const [state, dispatch] = useReducer(reducer, initialState);

// 	const stateContext = useMemo(
// 		() => ({
// 			state,
// 			dispatch,
// 		}),
// 		[state, dispatch]
// 	);
// 	// const stateContext = {
// 	// 	state,
// 	// 	dispatch,
// 	// };

// 	return (
// 		<NewsContext.Provider value={stateContext}>{children}</NewsContext.Provider>
// 	);
// };

// export default NewsContext;
