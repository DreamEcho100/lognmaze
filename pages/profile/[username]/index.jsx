import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../../store/UserContext';

import Profile from '../../../components/Profile/Profile';

const ProfilePage = () => {
	const GUEST = 'GUEST';
	const OWNER = 'OWNER';

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState({});
	const [visitorIdentity, setVisitorIdentity] = useState(GUEST);

	const { user, ...UserCxt } = useContext(UserContext);

	// useEffect(() => setIsLoading(true), []);

	// setIsLoading(true);

	useEffect(async () => {
		let username = router.query.username;

		if (username && !UserCxt.isLoading) {
			if (
				Object.keys(user).length !== 0 &&
				// user.username &&
				// user.username.length !== 0 &&
				username === user.user_name
			) {
				const response = await fetch(`/api/v1/user/get-profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						token: user.token,
						username,
					},
				});

				const { status, message, data, isVerified, visitorIdentity } =
					await response.json();

				setUserData(user);
				setVisitorIdentity(visitorIdentity);
			}

			if (username !== user.user_name) {
				const response = await fetch(`/api/v1/user/get-profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						username,
					},
				});

				const { status, message, data, isVerified, visitorIdentity } =
					await response.json();

				setUserData(data);
				setVisitorIdentity(visitorIdentity);
			}

			if (visitorIdentity === OWNER && (!user || user.id)) {
				setVisitorIdentity(GUEST);
			}

			setIsLoading(false);
		}
	}, [user.user_name, UserCxt.isLoading, router.query.username]);

	if (isLoading || UserCxt.isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Profile userData={userData} visitorIdentity={visitorIdentity} />
		</>
	);
};

export default ProfilePage;
