import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../../store/UserContext';

import Profile from '../../../components/Profile/Profile';

const ProfilePage = () => {
	const GUEST = 'GUEST';
	const OWNER = 'OWNER';

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [profileData, setProfileData] = useState({});
	const [visitorIdentity, setVisitorIdentity] = useState(GUEST);

	const { user, ...UserCxt } = useContext(UserContext);

	// useEffect(() => setIsLoading(true), []);

	// setIsLoading(true);

	useEffect(async () => {
		let username = router.query.username;

		if (username && (!UserCxt.isLoading || isLoading)) {
			username = username;

			if (
				user.token &&
				user.token.length !== 0 &&
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

				const data = await response.json();

				setProfileData(user);
				setVisitorIdentity(data.visitorIdentity);
			}

			if (!user || username !== user.user_name) {
				const response = await fetch(`/api/v1/user/get-profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						username,
					},
				});

				const data = await response.json();

				setProfileData(data.profileData.data);
				setVisitorIdentity(data.visitorIdentity);
			}

			if (visitorIdentity === 'OWNER' && (!user || user.id)) {
				setVisitorIdentity('GUEST');
			}

			setIsLoading(false);
			// console.log(visitorIdentity, user);
		}
	}, [user.user_name, UserCxt.isLoading, router.query.username]);

	if (isLoading || UserCxt.isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Profile profileData={profileData} visitorIdentity={visitorIdentity} />
		</>
	);
};

export default ProfilePage;
