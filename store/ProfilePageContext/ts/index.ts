import {
	VISITOR_PROFILE_GUEST,
	VISITOR_PROFILE_OWNER,
} from '@coreLib/constants';
import { IUserAuthenticatedData, IUserBasicData } from '@coreLib/ts/global';

interface IPropsUserProfilePageDataAuthenticatedUser {
	user: IUserAuthenticatedData;
	visitorStatus: typeof VISITOR_PROFILE_OWNER;
}
interface IPropsUserProfilePageDataBasicUser {
	user: IUserBasicData;
	visitorStatus: typeof VISITOR_PROFILE_GUEST;
}

export type IPropsUserProfilePageData =
	| IPropsUserProfilePageDataAuthenticatedUser
	| IPropsUserProfilePageDataBasicUser;

export interface IUserProfilePageContextState {
	data?: IPropsUserProfilePageData;
	// actions: {
	// requests: {
	// };

	// init: {
	// };
	// };
}

export type IUserProfilePageContextReducerAction = {
	type: '';
	payload: {};
};
