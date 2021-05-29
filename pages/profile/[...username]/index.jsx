import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../../store/UserContext';

import Profile from '../../../components/Profile/Profile';

const ProfilePage = () => {
	const GUEST = 'GUEST';

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [profileData, setProfileData] = useState({});
	const [visitorIdentity, setVisitorIdentity] = useState(GUEST);

	const { user, ...UserCxt } = useContext(UserContext);

	// console.log(user);

	useEffect(async () => {
		let username = router.query.username;

		if (Array.isArray(username)) {
			username = username[0];

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

				setIsLoading(false);
			}

			if (!UserCxt.isLoading && (!user.id || username !== user.user_name)) {
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

				setIsLoading(false);
			}
		}
	}, [user.id, router.query.username]);

	if (isLoading || UserCxt.isLoading) {
		return <p>Loading...</p>;
	}

	console.log(profileData, visitorIdentity);

	return (
		<>
			<Profile profileData={profileData} visitorIdentity={visitorIdentity} />
		</>
	);
};

// export const getInitialProps = async (context) => {
// 	const routers = useRouter();

// 	return {
// 		props: {
// 			username,
// 			routers,
// 		},
// 	};
// };

export default ProfilePage;
