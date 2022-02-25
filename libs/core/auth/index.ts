import { NextApiResponse } from 'next';
import { genSalt, hash, compare } from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface JwtPayloadWithId extends JwtPayload {
	id: string;
}

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
	try {
		const jwtToken = token;

		if (!jwtToken) return;

		if (typeof process.env.JWT_SECRET !== 'string')
			throw new Error('JWT_SECRET is not defined in the environment variables');

		const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

		return payload;
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Something Wrong happened!'
		);
	}
};

export const jwtGenerator = <T = {}>(data: T) => {
	const payload = {
		...data,
	} as jwt.JwtPayload;

	const jwt_token_expiry = 20 * 24 * 60 * 60 * 1000; // 20 day

	if (typeof process.env.JWT_SECRET !== 'string')
		throw new Error('JWT_SECRET is not defined in the environment variables');

	return {
		token: jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: jwt_token_expiry,
		}),
		expiriesAfter: jwt_token_expiry,
	};
};

export const returnObjFromJwtToken = async <
	T = string | jwt.JwtPayload | undefined
>(
	authorization?: string
) => {
	if (!authorization || !authorization?.split) return;

	const token = authorization.split(' ')[1];
	let isAuthorized: T;

	if (token && token.length !== 0) {
		return (await verifyJwtToken(token)) as T;
		// return isAuthorized;
	}

	return;
};

export const isAuthorized = async (
	res: NextApiResponse,
	authorization?: string
) => {
	if (!authorization || !res) {
		res.status(401);
		throw new Error('Not Authorized');
	}

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
		id: string;
	}>(authorization);

	if (!isAuthorized || !isAuthorized.id) {
		res.status(401);
		throw new Error('Not Authorized');
	}

	return isAuthorized;
};
