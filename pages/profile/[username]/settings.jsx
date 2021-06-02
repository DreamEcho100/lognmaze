import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../../store/UserContext';

import Settings from '../../../components/Profile/Settings/Settings';

const SettingsPage = () => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!UserCxt.isLoading && router.query.username) {
			if (
				Object.keys(user).length === 0 ||
				!user.id ||
				user.id.length === 0 ||
				router.query.username !== user.user_name
			) {
				router.replace('/');
			} else {
				setIsLoading(false);
			}
		}
	}, [user, user.id, UserCxt.isLoading, router.query.username]);

	// useEffect(() => {
	// 	if (!UserCxt.isLoading) {
	// 		if (!user.id) {
	// 			router.replace('/');
	// 		} else {
	// 			setIsLoading(false);
	// 		}
	// 	}
	// }, []);

	if (isLoading || UserCxt.isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Settings />
		</>
	);
};

export default SettingsPage;
