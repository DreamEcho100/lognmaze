import { IUser } from '@coreLib/ts/global';

export interface ILoginReqArgsProps {
	bodyContent: {
		auth_type: 'login';
		email: IUser['email'];
		password: string;
	};
}

export interface ISignupReqArgsProps {
	bodyContent: {
		auth_type: 'signup';
		email: IUser['email'];
		password: IUser['password'];
		user_name_id: IUser['user_name_id'];
		first_name: IUser['first_name'];
		last_name: IUser['last_name'];
		date_of_birth: IUser['date_of_birth'];
		gender: IUser['gender'];
		country: IUser['country'];
		state: IUser['state'];
		city?: IUser['city'];
	};
}

export interface ILogoutReqArgsProps {
	bodyContent: {
		id: IUser['id'];
	};
	headersList: {
		Authorization: string;
	};
}
