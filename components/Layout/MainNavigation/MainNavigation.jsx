import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import classes from './MainNavigation.module.css';

import UserContext from '../../../store/UserContext';

const MainNavigation = () => {
	const { verifyUserTokenFromCookie, user, isLoading, handleSignOut } =
		useContext(UserContext);

	// const [doesSessionExist, setDoesSessionExist] = useState(false);

	// useEffect(() => verifyUserTokenFromCookie(), []);

	// useEffect(() => {
	// 	// deleteCookie('mazecode_user', process.env.FRONT_END_ROOT_URL);
	// 	if (user.id) {
	// 		!doesSessionExist && setDoesSessionExist(true);
	// 	} else {
	// 		doesSessionExist && setDoesSessionExist(false);
	// 	}
	// 	console.log(doesSessionExist);
	// }, [user, user.id]);

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Link href='/'>
					<a classes={classes.logo_anchor}>MazeCode</a>
				</Link>
			</div>
			<nav>
				<ul>
					<li>
						<Link href='/posts/all'>All Posts</Link>
					</li>
					{!isLoading && user.id && (
						<li>
							<Link href={`/profile/${user.user_name_id}`}>Profile</Link>
						</li>
					)}
					{!isLoading && !user.id && (
						<li>
							<Link href='/auth'>Sign In/Up</Link>
						</li>
					)}
					{!isLoading && user.id && (
						<li>
							<button onClick={handleSignOut}>Sign Out</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
