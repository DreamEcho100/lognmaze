import { genSalt, hash, compare } from 'bcrypt';
const jwt = require('jsonwebtoken');

export const hashPassword = async (password) => {
	// const hashedPassword = await hash(password, 12);
	const saltRound = 12;
	const salt = await genSalt(saltRound);
	const hashedPassword = await hash(password, salt);

	return hashedPassword;
};

export const verifyPassword = async (res, password, hashedPassword) => {
	const isValid = await compare(password, hashedPassword);
	if (!isValid && res) {
		res.status(403).json({
			status: 'error',
			message: 'Invalid password!',
			isAuthorized: true,
		});
	}
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

		return payload;
	} catch (error) {
		console.error(`Error, ${error}, ${error.message}`);
		// response.status(403).send('Not Authorize');
		return {};
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

export const handleIsAuthorized = (res, authorization) => {
	return new Promise(async (resolve, reject) => {
		const token = authorization.split(' ')[1];
		let isAuthorized = {};

		console.log(token);

		if (token && token.length !== 0) {
			isAuthorized = await verifyJwtToken(token);
		}

		console.log(isAuthorized);

		if (!isAuthorized.id && res) {
			res.status(401).json({
				status: 'error',
				message: 'Not Authorized!',
				isAuthorized: false,
			});
		}

		resolve(isAuthorized);
	});
};
