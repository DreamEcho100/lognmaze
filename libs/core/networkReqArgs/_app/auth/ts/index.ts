import { IUserAuthenticatedData } from '@coreLib/ts/global';

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
		password: IUserAuthenticatedData['password'];
		user_name_id: IUserAuthenticatedData['user_name_id'];
		first_name: IUserAuthenticatedData['first_name'];
		last_name: IUserAuthenticatedData['last_name'];
		date_of_birth: IUserAuthenticatedData['date_of_birth'];
		gender: IUserAuthenticatedData['gender'];
		country: IUserAuthenticatedData['country'];
		state: IUserAuthenticatedData['state'];
		city?: IUserAuthenticatedData['city'];
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
