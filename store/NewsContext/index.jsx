import { useReducer } from 'react';
import { createContainer } from 'react-tracked'; // @utils/v1/react-tracked

import reducer from './reducer';

const initialState = {
	newsType: '',
	news: [],
};

let useNewsState = () => useReducer(reducer, initialState);

// // export
// const { Provider: NewsContextSharedProvider, useTracked: useNewsSharedState } =
// 	createContainer(useNewsState);
const createdContainer = createContainer(useNewsState);
export let NewsContextSharedProvider = createdContainer.Provider;
export let useNewsSharedState = createdContainer.useTracked;

let obj = {
	NewsContextSharedProvider,
	useNewsSharedState,
};

export default obj;

export const useSetUserContextStore = ({ newsType = '', news = [] }) => {
	const initialState = {
		newsType,
		news,
	};

	useNewsState = () => useReducer(reducer, initialState);

	const createdContainer = createContainer(useNewsState);
	NewsContextSharedProvider = createdContainer.Provider;
	useNewsSharedState = createdContainer.useTracked;

	obj = {
		NewsContextSharedProvider,
		useNewsSharedState,
	};

	return obj;
};

// const NewsContext = createContext({
// 	state: [],
// 	dispatch: () => {},
// 	types: {},
// });

// export const NewsContextSharedProvider = ({ children }) => {
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

// export const useNewsSharedState = () => {
//   const value = useContext(NewsContext);
//   if (value === null) throw new Error('Please add NewsContextSharedProvider');
//   return value;
// };

// export default NewsContext;
