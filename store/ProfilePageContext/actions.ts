import {
	// VISITOR_PROFILE_GUEST,
	VISITOR_PROFILE_OWNER,
} from '@coreLib/constants';
import { UserProfilePageConstants } from '@coreLib/constants';
import { TSetProfilePageVisitorStatus } from './ts';

export const setProfilePageVisitorStatus: TSetProfilePageVisitorStatus = (
	profilePageDispatch,
	{ userData, userProfileData, visitorStatusInitial }
) => {
	profilePageDispatch({
		type: UserProfilePageConstants.SET_VISITOR_STATUS_PENDING,
	});

	if (
		userData?.id &&
		userProfileData?.id &&
		userData?.id === userProfileData?.id
	) {
		profilePageDispatch({
			type: UserProfilePageConstants.SET_VISITOR_STATUS_SUCCUSS,
			payload: { visitorStatus: VISITOR_PROFILE_OWNER },
		});
		return;
	}

	profilePageDispatch({
		type: UserProfilePageConstants.SET_VISITOR_STATUS_FAIL,
		payload: { error: 'Visitor is not the owner of the page' },
	});
};
