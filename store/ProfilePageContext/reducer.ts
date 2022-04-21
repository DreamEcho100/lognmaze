import { VISITOR_PROFILE_GUEST } from '@coreLib/constants';
import UserProfilePageConstants from '@coreLib/constants/store/types/UserProfilePage';
import { returnProfilePageStoreInitialState } from './initialState';
import {
	IUserProfilePageContextReducerAction,
	IUserProfilePageContextState,
} from './ts';

const reducer = (
	state: IUserProfilePageContextState = returnProfilePageStoreInitialState(),
	actions: IUserProfilePageContextReducerAction
): IUserProfilePageContextState => {
	if (process.env.NODE_ENV !== 'production') {
		console.log('actions.type', actions.type);
	}

	switch (actions.type) {
		case UserProfilePageConstants.SET_VISITOR_STATUS_PENDING: {
			return state;
		}
		case UserProfilePageConstants.SET_VISITOR_STATUS_SUCCUSS: {
			const { visitorStatus } = actions.payload;

			return {
				...state,
				data: {
					...(state.data || {}),
					visitorStatus,
				},
			};
		}
		case UserProfilePageConstants.SET_VISITOR_STATUS_FAIL: {
			const { error } = actions.payload;

			return {
				...state,
				data: {
					...(state.data || {}),
					visitorStatus: VISITOR_PROFILE_GUEST,
				},
			};
		}

		default:
			return state;
	}
};

export default reducer;
