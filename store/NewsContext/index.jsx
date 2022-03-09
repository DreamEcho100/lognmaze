import { useReducer } from 'react';
import { createContainer } from 'react-tracked'; // @utils/v1/react-tracked

import reducer from './reducer';

let initialState = {
	newsType: '',
	news: [],
};

const useNewsState = () => useReducer(reducer, initialState);

// // export
// const { Provider: NewsContextSharedProvider, useTracked: useNewsSharedState } =
// 	createContainer(useNewsState);
let createdContainer = createContainer(useNewsState);

export const NewsContextSharedProvider = createdContainer.Provider;
export const useNewsSharedState = createdContainer.useTracked;

const NewsContextStore = {
	NewsContextSharedProvider,
	useNewsSharedState,
};

export default NewsContextStore;

export const useSetNewsContextStore = ({ newsType = '', news = [] }) => {
	initialState = {
		newsType,
		news,
	};

	const useNewsState = () => useReducer(reducer, initialState);

	createdContainer = createContainer(useNewsState);

	return NewsContextStore;
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
