import {
	IUserAuthenticatedData,
	IUserBasicDataCityOfResident,
} from '@coreLib/ts/global';

export interface ILoginReqArgsProps {
	bodyContent: {
		auth_type: 'login';
		email: IUserAuthenticatedData['email'];
		password: string;
	};
}

export interface ISignupReqArgsProps {
	bodyContent: {
		auth_type: 'signup';
		email: IUserAuthenticatedData['email'];
		password: string;
		user_name_id: IUserAuthenticatedData['user_name_id'];
		first_name: IUserAuthenticatedData['first_name'];
		last_name: IUserAuthenticatedData['last_name'];
		date_of_birth: IUserAuthenticatedData['date_of_birth'];
		gender: IUserAuthenticatedData['gender'];
		country: IUserAuthenticatedData['country_of_resident'];
		state: IUserAuthenticatedData['state_of_resident'];
		city?: IUserBasicDataCityOfResident;
	};
}

export interface ILogoutReqArgsProps {
	bodyContent: {
		id: IUserAuthenticatedData['id'];
	};
	headersList: {
		Authorization?: string;
	};
}
