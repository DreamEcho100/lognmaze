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

export const verifyJwtToken = async (request, response) => {
	try {
		const jwtToken = request.header('token');

		if (!jwtToken) {
			return response.status(403).send('Not Authorize');
		}

		const payload = jwt.verify(jwtToken, process.env.jwtSecret);

		request.user = payload.user;
	} catch (error) {
		console.error(`Error, ${error}, ${error.message}`);
		response.status(403).send('Not Authorize');
	}
};

export const jwtGenerator = (id) => {
	const payload = {
		user: id,
	};

	const jwt_token_expiry = 30 * 24 * 60 * 60 * 1000; // 30 day

	return {
		token: jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: jwt_token_expiry,
		}),
		expiriesAfter: jwt_token_expiry,
	};
};
