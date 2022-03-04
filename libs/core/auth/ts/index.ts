import { IUser } from '@coreLib/ts/global';
import { NextApiResponse } from 'next';

export type TJWTGenerator = <T = {}>(data: T, maxAge?: number) => string;

export type ISetRefreshToken = (
	res: NextApiResponse,
	user_id: IUser['id'],
	userSession: {
		[key: string]: any;
	},
	maxAge?: number
) => void;

export type ISetAccessToken = (
	res: NextApiResponse,
	user_id: IUser['id'],
	userSession: {
		[key: string]: any;
	},
	maxAge?: number
) => void;
