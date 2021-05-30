import { genSalt, hash, compare } from 'bcrypt';
const jwt = require('jsonwebtoken');

export const hashPassword = async (password) => {
	// const hashedPassword = await hash(password, 12);
	const saltRound = 12;
	const salt = await genSalt(saltRound);
	const hashedPassword = await hash(password, salt);

	return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
	const isValid = await compare(password, hashedPassword);
	return isValid;
};

export const verifyJwtToken = async (token) => {
	try {
		const jwtToken = token; // request.header('token');

		if (!jwtToken) {
			return false;
		}

		const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

		// request.user = payload.user;
		console.log('payload', payload);

		return true;
	} catch (error) {
		console.error(`Error, ${error}, ${error.message}`);
		// response.status(403).send('Not Authorize');
		return false;
	}
};

export const jwtGenerator = (data) => {
	const payload = {
		...data,
	};

	const jwt_token_expiry = 20 * 24 * 60 * 60 * 1000; // 20 day

	return {
		token: jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: jwt_token_expiry,
		}),
		expiriesAfter: jwt_token_expiry,
	};
};
