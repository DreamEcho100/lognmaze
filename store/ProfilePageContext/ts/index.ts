import { Dispatch } from 'react';

import {
	VISITOR_PROFILE_GUEST,
	VISITOR_PROFILE_OWNER,
} from '@coreLib/constants';
import UserProfilePageConstants from '@coreLib/constants/store/types/UserProfilePage';
import { IUserAuthenticatedData, IUserBasicData } from '@coreLib/ts/global';

export type IPropsUserProfilePageData = {
	user: IUserBasicData;
	visitorStatus: typeof VISITOR_PROFILE_GUEST | typeof VISITOR_PROFILE_OWNER;
};

export interface IUserProfilePageContextState {
	data: IPropsUserProfilePageData;
}

export type ISetProfilePageVisitorStatusPending = {
	type: UserProfilePageConstants.SET_VISITOR_STATUS_PENDING;
};
export type ISetProfilePageVisitorStatusSuccess = {
	type: UserProfilePageConstants.SET_VISITOR_STATUS_SUCCUSS;
	payload: { visitorStatus: IPropsUserProfilePageData['visitorStatus'] };
};
export type ISetProfilePageVisitorStatusFail = {
	type: UserProfilePageConstants.SET_VISITOR_STATUS_FAIL;
	payload: { error: string };
};

export type IUserProfilePageContextReducerAction =
	| ISetProfilePageVisitorStatusPending
	| ISetProfilePageVisitorStatusSuccess
	| ISetProfilePageVisitorStatusFail;

export type TUserProfilePageContextDispatch =
	| Dispatch<IUserProfilePageContextReducerAction>
	| ((value: IUserProfilePageContextReducerAction) => void);

// Actions
export type TSetProfilePageVisitorStatus = (
	profilePageDispatch: TUserProfilePageContextDispatch,
	{
		userData,
		userProfileData,
		visitorStatusInitial,
	}: {
		userData?: IUserAuthenticatedData;
		userProfileData: IUserBasicData;
		visitorStatusInitial: IPropsUserProfilePageData['visitorStatus'];
	}
) => void;
