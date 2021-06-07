import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../../store/UserContext';

import Profile from '../../../components/Profile/Profile';

const ProfilePage = () => {
	const GUEST = 'GUEST';
	const OWNER = 'OWNER';

	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);
	const [userData, setUserData] = useState({});
	const [visitorIdentity, setVisitorIdentity] = useState(GUEST);

	// useEffect(() => setIsLoading(true), []);

	// setIsLoading(true);

	useEffect(async () => {
		let user_name_id = router.query.user_name_id;

		if (typeof user_name_id === 'string' && !UserCxt.isLoading) {
			if (
				Object.keys(user).length !== 0 &&
				// user.user_name_id &&
				// user.user_name_id.length !== 0 &&
				user_name_id === user.user_name_id
			) {
				const response = await fetch(`/api/v1/user/get-profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.token}`,
					},
				});

				const { status, message, data, isVerified, visitorIdentity } =
					await response.json();

				setUserData(user);
				setVisitorIdentity(visitorIdentity);
			}

			if (user_name_id !== user.user_name_id) {
				const headersObj = user.token
					? {
							authorization: `Bearer ${user.token}`,
							user_name_id,
					  }
					: {
							user_name_id,
					  };

				const response = await fetch(`/api/v1/user/get-profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						...headersObj,
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
	}, [user.user_name_id, UserCxt.isLoading, router.query.user_name_id]);

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
