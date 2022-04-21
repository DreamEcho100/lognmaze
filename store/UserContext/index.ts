import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { IUserContextState } from './ts';
import reducer from './reducer';
import { returnUserContextInitialState } from './initialState';

const initialState: IUserContextState = returnUserContextInitialState();

const useUserState = () => useReducer(reducer, initialState);

const createdContainer = createContainer(useUserState);

export const UserContextSharedProvider = createdContainer.Provider;
export const useUserSharedState = createdContainer.useTracked;

const UserContextStore = {
	UserContextSharedProvider,
	useUserSharedState,
};

export default UserContextStore;
