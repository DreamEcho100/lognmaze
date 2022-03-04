import { NextApiResponse } from 'next';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

import {
	SEVEN_DAYS_IN_MILLIE_SECONDS,
	// YEAR_IN_MILLIE_SECONDS,
} from '@coreLib/constants';
import { IUser } from '@coreLib/ts/global';
import { ISetAccessToken, ISetRefreshToken, TJWTGenerator } from './ts';

export const hashPassword = async (password: string) => {
	const saltRound = 12;
	const salt = await genSalt(saltRound);
	const hashedPassword = await hash(password, salt);

	return hashedPassword;
};

export const verifyPassword = async ({
	res,
	password,
	hashedPassword,
}: {
	res: NextApiResponse;
	password: string;
	hashedPassword: string;
}) => {
	const isValid = await compare(password, hashedPassword);

	if (!isValid && res) throw new Error('Invalid password!');

	return isValid;
};

export const verifyJwtToken = async (token: string) => {
	// try {
	// const token = token;

	if (!token) return;

	if (typeof process.env.JWT_SECRET !== 'string')
		throw new Error('JWT_SECRET is not defined in the environment variables');

	const payload = jwt.verify(token, process.env.JWT_SECRET);

	return payload;
	// } catch (error) {
	// 	throw new Error(
	// 		error instanceof Error ? error.message : 'Something Wrong happened!'
	// 	);
	// }
};

export const jwtGenerator: TJWTGenerator = (
	data,
	maxAge = 3.15e10 /*1 year*/
) => {
	const payload = {
		...data,
	} as jwt.JwtPayload;

	// const maxAge = 20 * 24 * 60 * 60 * 1000; // 20 day;

	if (typeof process.env.JWT_SECRET !== 'string')
		throw new Error('JWT_SECRET is not defined in the environment variables');

	return jwt.sign(
		{ payload, expiresIn: new Date(Date.now() + maxAge) },
		process.env.JWT_SECRET,
		{
			expiresIn: maxAge,
		}
	);
};

export const returnObjFromJwtToken = async <
	T = string | jwt.JwtPayload | undefined
>(
	authorization?: string
) => {
	if (!authorization || !authorization?.split) return;

	const token = authorization.split(' ')[1];
	// let isAuthorized: T;

	if (token && token.length !== 0) {
		return (await verifyJwtToken(token)) as T;
		// return isAuthorized;
	}

	return;
};

export const isAuthorized = async (
	res: NextApiResponse,
	authorization: string
) => {
	// const token = authorization.split(' ')[1];
	// let isAuthorized: {
	// 	id: string;
	// } = {
	// 	id: '',
	// };

	// if (token && token.length !== 0) {
	// 	isAuthorized = await verifyJwtToken(token);
	// }
	const isAuthorized = await returnObjFromJwtToken<{
		payload: {
			id: string;
		};
		expiresIn: string | number | Date;
	}>(authorization);

	if (!isAuthorized || !isAuthorized.payload) {
		res.status(403);
		throw new Error('Not Authorized');
	}

	return isAuthorized;
};

export const setRefreshToken: ISetRefreshToken = (
	res,
	user_id,
	userSession,
	maxAge = SEVEN_DAYS_IN_MILLIE_SECONDS
) => {
	const jwtRefreshToken = jwtGenerator(
		{
			id: user_id,
			...userSession,
		},
		maxAge
	);
	res.setHeader(
		'Set-Cookie',
		serialize('refreshToken', jwtRefreshToken, {
			maxAge,
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		})
	);
};

export const setAccessToken: ISetAccessToken = (
	res,
	user_id,
	userSession,
	maxAge = SEVEN_DAYS_IN_MILLIE_SECONDS
) => {
	const jwtAccessToken = jwtGenerator(
		{
			id: user_id,
			...userSession,
		},
		maxAge
	);

	res.setHeader(
		'Set-Cookie',
		serialize('accessToken', jwtAccessToken, {
			maxAge,
			path: '/',
			// httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		})
	);
};
