export interface ISignInReqArgsProps {
	bodyContent: {
		email: string;
		password: string;
	};
}

export interface ISignUpReqArgsProps {
	bodyContent: {
		email: string;
		password: string;
		user_name_id: string;
		first_name: string;
		last_name: string;
		date_of_birth: string;
		gender: string;
		country: string;
		state: string;
		city?: string;
	};
}
