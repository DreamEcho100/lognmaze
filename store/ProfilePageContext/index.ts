import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { IUserProfilePageContextState, IPropsUserProfilePageData } from './ts';
import reducer from './reducer';

let initialState: IUserProfilePageContextState = {
	data: undefined,
};

let useProfileState = () => useReducer(reducer, initialState);

let createdContainer = createContainer(useProfileState);

export let UserProfilePageContextSharedProvider = createdContainer.Provider;
export let useUserProfilePageSharedState = createdContainer.useTracked;

let UserProfilePageContextStore = {
	UserProfilePageContextSharedProvider,
	useUserProfilePageSharedState,
};

export default UserProfilePageContextStore;

export const setUserProfilePageContextStore = ({
	profileData,
}: {
	profileData: IPropsUserProfilePageData;
}) => {
	initialState = {
		data: profileData,
	};

	useProfileState = () => useReducer(reducer, initialState);

	createdContainer = createContainer(useProfileState);

	UserProfilePageContextSharedProvider = createdContainer.Provider;
	useUserProfilePageSharedState = createdContainer.useTracked;

	UserProfilePageContextStore = {
		UserProfilePageContextSharedProvider,
		useUserProfilePageSharedState,
	};

	return UserProfilePageContextStore;
};
