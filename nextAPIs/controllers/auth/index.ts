import { NextApiRequest, NextApiResponse } from 'next';

import {
	hashPassword,
	jwtGenerator,
	// setUserNameIdToken,
	verifyPassword,
} from '@coreLib/auth';
import pool from '@coreLib/db/pg/connection';
import {
	SEVEN_DAYS_IN_MILLIE_SECONDS,
	YEAR_IN_MILLIE_SECONDS,
} from '@coreLib/constants';
import { setAccessToken, setRefreshToken } from '@coreLib/auth';
import pgActions from '@coreLib/db/pg/actions';
import { serialize } from 'cookie';
import { NextApiRequestExtended } from '@coreLib/ts/global';

// @desc    Login in user
// @route   Post /api/auth/login
// @access  Public
export const authLogin = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, password } = req.body;

	const user = await pgActions.users
		.get({
			filterBy: [
				[
					{
						name: 'byUserEmail',
						value: email,
					},
				],
			],
			extraReturns: {
				user_password: true,
				sensitiveInfo: true,
				user_id: true,
			},
		})
		.then((response: { rows: any[] }) => response.rows[0]);

	if (!user?.id) {
		res.status(404);
		throw new Error("User doesn't exist!");
	}

	/* const validPassword =  */ await verifyPassword({
		res,
		password,
		hashedPassword: user.password,
	});

	delete user.password;

	const userSession = await pgActions.users.createSession(
		user.id,
		new Date().toISOString(),
		new Date(Date.now() + YEAR_IN_MILLIE_SECONDS).toISOString()
	);

	// setRefreshToken(res, user.id, userSession);
	// setUserNameIdToken(res, user.user_name_id);
	// setAccessToken(res, user.id, userSession);

	res.setHeader('Set-Cookie', [
		serialize(
			'refreshToken',
			jwtGenerator(
				{
					id: user.id,
					...userSession,
				},
				YEAR_IN_MILLIE_SECONDS
			),
			{
				maxAge: YEAR_IN_MILLIE_SECONDS,
				path: '/',
				sameSite: 'lax',
				httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production',
			}
		),
		serialize(
			'accessToken',
			jwtGenerator(
				{
					id: user.id,
					...userSession,
				},
				SEVEN_DAYS_IN_MILLIE_SECONDS
			),
			{
				maxAge: SEVEN_DAYS_IN_MILLIE_SECONDS,
				path: '/',
				// httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
			}
		),
		serialize('user_name_id', user.user_name_id, {
			maxAge: YEAR_IN_MILLIE_SECONDS,
			path: '/',
			sameSite: 'lax',
			httpOnly: process.env.NODE_ENV === 'production',
			secure: process.env.NODE_ENV === 'production',
		}),
	]);

	res.status(200).json({ user });
};

// @desc    Sign up user
// @route   Post /api/auth/signup
// @access  Public
export const authSignup = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		email,
		password,

		user_name_id,
		first_name,
		last_name,
		date_of_birth,
		gender,
		country,
		state,
		city,
	} = req.body;

	const user = await pool.query(
		'SELECT email FROM user_account WHERE email = $1',
		[email]
	);

	if (user.rows.length !== 0) {
		res.status(401);
		throw new Error('User already exist!');
	}

	const hashedPassword = await hashPassword(password);

	const newUser = await pool
		.query(
			`
      INSERT INTO user_account
       ( email, password )
      VALUES
        ( $1, $2 )
      RETURNING
        user_account_id AS id,
        email,
        email_verified,
        role
      ;
    `,
			[email, hashedPassword]
		)
		.then(async (response: { rows: any[] }) => {
			delete response.rows[0].password;

			const response2 = await pool.query(
				`
          WITH add_new_user_profile as (
            INSERT INTO user_profile
              (
                user_profile_id,
                user_name_id,
                first_name,
                last_name,
                date_of_birth,
                gender
              )
            VALUES
              ( $1, $2, $3, $4, $5, $6 )
            RETURNING 
              first_name,
              last_name,
              user_name_id,
              date_of_birth,
              gender,
              profile_picture,
              cover_photo,
              bio,
              news_blog_counter,
              news_post_counter,
              created_at,
              last_sign_in
          ),
          add_new_user_address as (
            INSERT INTO user_address
              (
                user_address_id,
                country_of_resident,
                state_of_resident,
                city_of_resident
              )
            VALUES
              ( $1, $7, $8, $9 )
            RETURNING
              country_of_resident,
              state_of_resident,
              city_of_resident
							)
          
          SELECT * FROM add_new_user_profile, add_new_user_address;
        `,
				[
					response.rows[0].id,
					user_name_id,
					first_name,
					last_name,
					date_of_birth,
					gender,
					country,
					state,
					city,
				]
			);

			return {
				...response2.rows[0],
				...response.rows[0],
			};
		});

	const userSession = await pgActions.users.createSession(
		newUser.id,
		new Date().toISOString(),
		new Date(Date.now() + YEAR_IN_MILLIE_SECONDS).toISOString()
	);

	res.setHeader('Set-Cookie', [
		serialize(
			'refreshToken',
			jwtGenerator(
				{
					id: newUser.id,
					...userSession,
				},
				YEAR_IN_MILLIE_SECONDS
			),
			{
				maxAge: YEAR_IN_MILLIE_SECONDS,
				path: '/',
				sameSite: 'lax',
				httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production',
			}
		),
		serialize(
			'accessToken',
			jwtGenerator(
				{
					id: newUser.id,
					...userSession,
				},
				SEVEN_DAYS_IN_MILLIE_SECONDS
			),
			{
				maxAge: SEVEN_DAYS_IN_MILLIE_SECONDS,
				path: '/',
				// httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
			}
		),
		serialize('user_name_id', newUser.user_name_id, {
			maxAge: YEAR_IN_MILLIE_SECONDS,
			path: '/',
			sameSite: 'lax',
			httpOnly: process.env.NODE_ENV === 'production',
			secure: process.env.NODE_ENV === 'production',
		}),
	]);

	res.status(201).json({ user: newUser });
};

// @desc    Logout in user
// @route   Post /api/auth/logout
// @access  Private
export const authLogout = async (
	req: NextApiRequestExtended,
	res: NextApiResponse
) => {
	res.setHeader('Set-Cookie', [
		serialize('refreshToken', '', {
			maxAge: 0,
			path: '/',
			httpOnly: process.env.NODE_ENV === 'production',
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		}),
		serialize('user_name_id', '', {
			maxAge: 0,
			path: '/',
			httpOnly: process.env.NODE_ENV === 'production',
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		}),
		serialize('accessToken', '', {
			maxAge: 0,
			path: '/',
			// httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		}),
	]);

	await pool.query(
		`
			UPDATE user_session
			SET logout_date = $1
			WHERE user_session_id = $2
		`,
		[new Date(Date.now()).toISOString(), req.user.user_session_id]
	);

	res.status(200).send('logout successfully!');
};

const autController = {
	login: authLogin,
	signup: authSignup,
	logout: authLogout,
};

export default autController;
