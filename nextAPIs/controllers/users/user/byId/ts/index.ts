import { NextApiResponse } from 'next';

interface ICheckUserExistAndReturnPasswordByIdPropsExtraReturns {
	returnPassword?: boolean;
}

export type TCheckIfUserExist = (
	res: NextApiResponse,
	id: string,
	extraReturns?: ICheckUserExistAndReturnPasswordByIdPropsExtraReturns
) => Promise<{
	id: string;
	password: string;
}>;

export type TTablesColumns =
	| 'bio'
	| 'cover_photo'
	| 'first_name'
	| 'gender'
	| 'last_name'
	| 'profile_picture'
	| 'user_name_id'
	| 'email'
	| 'password';
