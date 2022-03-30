import { VISITOR_PROFILE_GUEST } from '@coreLib/constants';
import { IUserProfilePageContextState } from './ts';

export const returnProfilePageStoreInitialState =
	(): IUserProfilePageContextState => ({
		data: {
			user: {
				country_of_resident: '',
				created_at: '',
				first_name: '',
				gender: '',
				id: '',
				last_name: '',
				last_sign_in: '',
				state_of_resident: '',
				user_name_id: '',
				bio: '',
				city_of_resident: '',
				cover_photo: '',
				profile_picture: '',
			},
			visitorStatus: VISITOR_PROFILE_GUEST,
		},
	});
