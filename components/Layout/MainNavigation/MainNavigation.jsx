import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import classes from './MainNavigation.module.css';

import UserContext from '../../../store/UserContext';

const MainNavigation = () => {
	const { verfyUserTokenFromCookie, user, isLoading, handleLogOut } =
		useContext(UserContext);

	const [doesSessionExist, setDoesSessionExist] = useState(false);

	useEffect(() => verfyUserTokenFromCookie(), []);

	useEffect(() => {
		// deleteCookie('mazecode_user', process.env.FRONT_END_ROOT_URL);
		if (user.id) {
			setDoesSessionExist(true);
		} else {
			setDoesSessionExist(false);
		}
	}, [user]);

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
						<Link href='/blog'>Blog</Link>
					</li>
					{doesSessionExist && user.id && (
						<li>
							<Link href={`/profile/${user.user_name}`}>Profile</Link>
						</li>
					)}
					{!doesSessionExist && !isLoading && !user.id && (
						<li>
							<Link href='/auth'>Sign In/Up</Link>
						</li>
					)}
					{doesSessionExist && !isLoading && user.id && (
						<li>
							<button onClick={handleLogOut}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
