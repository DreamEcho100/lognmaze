import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavOnSmallScreensClasses from './NavOnSmallScreens.module.css';
import MainNavigationClasses from '../MainNavigation.module.css';
import Button from '@components/UI/V1/Button';

const NavOnSmallScreens = ({ user, isVerifyingUserLoading, handleSignOut }) => {
	const [showNavOnSmallScreens, setShowNavOnSmallScreens] = useState(false);

	return (
		<>
			<nav className={NavOnSmallScreensClasses['nav']}>
				<div className={MainNavigationClasses['logo']}>
					<Link href='/' passHref>
						<a
							title='LogNMaze | Home Page'
							className={MainNavigationClasses.logo_anchor}
						>
							<strong>LogNMaze</strong>
						</a>
					</Link>
				</div>
				<button
					title='Click To Show Side Navbar'
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
			</nav>
			<div
				className={`${NavOnSmallScreensClasses['wrapper']} ${
					showNavOnSmallScreens ? NavOnSmallScreensClasses['active'] : ''
				}`}
				onClick={() => setShowNavOnSmallScreens(!showNavOnSmallScreens)}
			></div>
			<nav
				className={`${NavOnSmallScreensClasses['main-left-side-menu']} ${
					showNavOnSmallScreens ? NavOnSmallScreensClasses['show-nav'] : ''
				}`}
			>
				<ul className={`${NavOnSmallScreensClasses['main-list']}`}>
					{!isVerifyingUserLoading && user.id && (
						<li>
							<span onClick={() => setShowNavOnSmallScreens(false)}>
								<Link href={`/profile/${user.user_name_id}`} passHref>
									<a title={`${user.user_name_id} profile`}>
										<FontAwesomeIcon icon={['fas', 'user']} /> Profile
									</a>
								</Link>
							</span>
						</li>
					)}
					{!isVerifyingUserLoading && !user.id && (
						<li>
							<span onClick={() => setShowNavOnSmallScreens(false)}>
								<Link href='/auth'>
									<a title='Sign In/Up'>Sign In/Up</a>
								</Link>
							</span>
						</li>
					)}
					{!isVerifyingUserLoading && user.id && (
						<li>
							<span onClick={() => setShowNavOnSmallScreens(false)}>
								<Button
									title='Sign Out'
									defaultClasses='button-2'
									onClick={handleSignOut}
								>
									Sign Out
								</Button>
							</span>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};

export default NavOnSmallScreens;
