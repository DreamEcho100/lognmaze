import { NextApiResponse } from 'next';
import cookie from 'cookie';

import { setAccessToken, verifyJwtToken } from '@coreLib/auth';
import { Middleware } from 'next-connect';
import { NextApiRequestExtended } from '@coreLib/ts/global';
import pool from '@coreLib/db/pg/connection';

interface IObjFromJwtToken {
	payload: {
		id: string;
		user_session_id: string;
		login_start_date: string;
		login_end_date: string;
	};
	expiresIn: string | number | Date;
}

export const isAuthorizedMiddleware: Middleware<
	NextApiRequestExtended,
	NextApiResponse
> = async (req, res, next) => {
	try {
		const cookies = cookie.parse(req.headers.cookie || '');
		if (!req.headers.authorization) throw new Error('Not Authorized!');

		// const { payload: user } = await isAuthorized(res, req.headers.authorization);

		const token = req.headers.authorization.split(' ')[1];
		const accessTokenObj = (await verifyJwtToken(token)) as
			| IObjFromJwtToken
			| undefined;

		if (accessTokenObj?.payload) {
			req.user = accessTokenObj.payload;
			return next();
		}

		const refreshToken = cookies.refreshToken;

		if (refreshToken) {
			const refreshTokenObj = (await verifyJwtToken(refreshToken)) as
				| IObjFromJwtToken
				| undefined;

			if (!refreshTokenObj) throw new Error('Not Authorized!');

			const userSession: {
				user_id: string;
				login_start_date: string;
				login_end_date: string;
				logout_date: string;
			} = await pool
				.query(
					`
					SELECT
						user_id, login_start_date, login_end_date, logout_date, logout_date
					WHERE user_session_id = $1	
				`,
					[refreshTokenObj.payload.user_session_id]
				)
				.then((response: { rows: any[] }) => response.rows[0]);

			if (userSession && !userSession.logout_date) {
				setAccessToken(res, userSession.user_id, userSession);
				req.user = { id: userSession.user_id };
				return next();
			}
		}

		throw new Error('Not Authorized!');
	} catch (error) {
		res.status(403);
		next(
			error instanceof Error
				? Error(error.message)
				: Error('Something went wrong!')
		);
	}
};
