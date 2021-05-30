import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../store/UserContext';

import Auth from '../../components/Auth/Auth';

const AuthPage = () => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user && user.id) {
			router.replace('/');
		}
		setIsLoading(false);
	}, [user]);

	if (isLoading || (user && user.id)) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Auth />
		</>
	);
};

export default AuthPage;
