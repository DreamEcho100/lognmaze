import { IUserAuthenticatedData } from '@coreLib/ts/global';
import { NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TJWTGenerator = <T = { [key: string]: any }>(
	data: T,
	maxAge?: number
) => string;

export type ISetRefreshToken = (
	res: NextApiResponse,
	user_id: IUserAuthenticatedData['id'],
	userSession: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	},
	maxAge?: number
) => void;

export type ISetAccessToken = (
	res: NextApiResponse,
	user_id: IUserAuthenticatedData['id'],
	userSession: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	},
	maxAge?: number
) => void;

export type ISetUserNameIdToken = (
	res: NextApiResponse,
	user_name_id: string,
	maxAge?: number
) => void;
