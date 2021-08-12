import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavOnBigScreensClasses from './NavOnBigScreens.module.css';
import MainNavigationClasses from '../MainNavigation.module.css';

const NavOnBigScreens = ({ user, isLoading, handleSignOut }) => {
	return (
		<nav className={NavOnBigScreensClasses['nav-on-big-screens']}>
			<div className={MainNavigationClasses.logo}>
				<Link href={'/' /*!isLoading && user.id ? '/posts/all' : '/'*/}>
					<a className={MainNavigationClasses.logo_anchor}>LogNMaze</a>
				</Link>
			</div>
			<ul className={MainNavigationClasses.ul}>
				{/* <li className={MainNavigationClasses.li}>
					<Link href='/posts/all'>All Posts</Link>
				</li> */}
				{!isLoading && user.id && (
					<li className={MainNavigationClasses.li}>
						<Link href={`/profile/${user.user_name_id}`}>
							<a>
								<FontAwesomeIcon icon={['fas', 'user']} />
							</a>
						</Link>
					</li>
				)}
				{!isLoading && !user.id && (
					<li className={MainNavigationClasses.li}>
						<Link href='/auth'>Sign In/Up</Link>
					</li>
				)}
				{!isLoading && user.id && (
					<li className={MainNavigationClasses.li}>
						<button
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
