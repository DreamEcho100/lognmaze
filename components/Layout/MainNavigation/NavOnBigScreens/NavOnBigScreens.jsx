import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavOnBigScreensClasses from './NavOnBigScreens.module.css';
import MainNavigationClasses from '../MainNavigation.module.css';

const NavOnBigScreens = ({ user, isVerifyingUserLoading, handleSignOut }) => {
	return (
		<nav className={NavOnBigScreensClasses['nav-on-big-screens']}>
			<div className={MainNavigationClasses.logo}>
				<Link href='/' passHref>
					<a
						title='LogNMaze | Home Page'
						className={MainNavigationClasses.logo_anchor}
					>
						<strong>LogNMaze</strong>
					</a>
				</Link>
			</div>
			<ul
				className={`${MainNavigationClasses.ul} ${NavOnBigScreensClasses.ul}`}
			>
				{!isVerifyingUserLoading && user.id && (
					<li
						className={`${MainNavigationClasses.li} ${NavOnBigScreensClasses.li}`}
					>
						<Link href={`/profile/${user.user_name_id}`} passHref>
							<a title={`${user.user_name_id} profile`}>
								<FontAwesomeIcon icon={['fas', 'user']} />
							</a>
						</Link>
					</li>
				)}
				{!isVerifyingUserLoading && !user.id && (
					<li
						className={`${MainNavigationClasses.li} ${NavOnBigScreensClasses.li}`}
					>
						<Link href='/auth'>Sign In/Up</Link>
					</li>
				)}
				{!isVerifyingUserLoading && user.id && (
					<li
						className={`${MainNavigationClasses.li} ${NavOnBigScreensClasses.li}`}
					>
						<button
							title='Sign Out'
							className={MainNavigationClasses.button}
							onClick={handleSignOut}
						>
							Sign Out
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default NavOnBigScreens;
