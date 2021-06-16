import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import NavOnBigScreensClasses from './NavOnBigScreens.module.css';
import NavOnSmallScreensClasses from './NavOnSmallScreens.module.css';
import MainNavigationClasses from './MainNavigation.module.css';

import UserContext from '../../../store/UserContext';

const MainNavigation = () => {
	const { verifyUserTokenFromCookie, user, isLoading, handleSignOut } =
		useContext(UserContext);

	const [showNavOnSmallScreens, setShowNavOnSmallScreens] = useState(false);

	// const [doesSessionExist, setDoesSessionExist] = useState(false);

	useEffect(() => verifyUserTokenFromCookie(), []);

	return (
		<header className={MainNavigationClasses.header}>
			<nav className={NavOnBigScreensClasses['nav-on-big-screens']}>
				<div className={MainNavigationClasses.logo}>
					<Link href='/'>
						<a className={MainNavigationClasses.logo_anchor}>MazeCode</a>
					</Link>
				</div>
				<ul className={MainNavigationClasses.ul}>
					<li className={MainNavigationClasses.li}>
						<Link href='/posts/all'>All Posts</Link>
					</li>
					{!isLoading && user.id && (
						<li className={MainNavigationClasses.li}>
							<Link href={`/profile/${user.user_name_id}`}>Profile</Link>
						</li>
					)}
					{!isLoading && !user.id && (
						<li className={MainNavigationClasses.li}>
							<Link href='/auth'>Sign In/Up</Link>
						</li>
					)}
					{!isLoading && user.id && (
						<li className={MainNavigationClasses.li}>
							<button onClick={handleSignOut}>Sign Out</button>
						</li>
					)}
				</ul>
			</nav>
			<nav className={NavOnSmallScreensClasses['nav']}>
				<div className={MainNavigationClasses['logo']}>
					<Link href='/'>
						<a className={MainNavigationClasses.logo_anchor}>MazeCode</a>
					</Link>
				</div>
				<button
					onClick={() => setShowNavOnSmallScreens(!showNavOnSmallScreens)}
					className={`${NavOnSmallScreensClasses['menu-toggle-button']} ${
						showNavOnSmallScreens ? NavOnSmallScreensClasses.active : ''
					}`}
				>
					<span
						className={`${NavOnSmallScreensClasses['line-1']} ${NavOnSmallScreensClasses['line']}`}
					></span>
					<span
						className={`${NavOnSmallScreensClasses['line-2']} ${NavOnSmallScreensClasses['line']}`}
					></span>
					<span
						className={`${NavOnSmallScreensClasses['line-3']} ${NavOnSmallScreensClasses['line']}`}
					></span>
				</button>
				{/* <div
					onClick={() => setShowNavOnSmallScreens(!showNavOnSmallScreens)}
					className={NavOnSmallScreensClasses['menu-toggle-button-container']}
				> */}
				<div
					className={`${NavOnSmallScreensClasses['wrapper']} ${
						showNavOnSmallScreens ? NavOnSmallScreensClasses['active'] : ''
					}`}
					onClick={() => setShowNavOnSmallScreens(!showNavOnSmallScreens)}
				></div>
				<div
					className={`${NavOnSmallScreensClasses['main-left-side-menu']} ${
						showNavOnSmallScreens ? NavOnSmallScreensClasses['show-nav'] : ''
					}`}
				>
					<ul className={`${NavOnSmallScreensClasses['main-list']}`}>
						<li onClick={() => setShowNavOnSmallScreens(false)}>
							<Link href='/posts/all'>All Posts</Link>
						</li>
						{!isLoading && user.id && (
							<li onClick={() => setShowNavOnSmallScreens(false)}>
								<Link href={`/profile/${user.user_name_id}`}>Profile</Link>
							</li>
						)}
						{!isLoading && !user.id && (
							<li onClick={() => setShowNavOnSmallScreens(false)}>
								<Link href='/auth'>Sign In/Up</Link>
							</li>
						)}
						{!isLoading && user.id && (
							<li onClick={() => setShowNavOnSmallScreens(false)}>
								<button onClick={handleSignOut}>Sign Out</button>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default MainNavigation;
