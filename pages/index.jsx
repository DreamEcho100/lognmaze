import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '@/store/UserContext';

import Hero from '../components/Home/Hero/Hero';

const HomePage = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);

	const UserCxt = useContext(UserContext);

	useEffect(() => {
		if (!UserCxt.isLoading) {
			if (UserCxt.user && UserCxt.user.id) {
				router.replace('/posts/all');
			} else {
				setIsLoading(false);
			}
		}
	}, [UserCxt.isLoading, UserCxt.user, router.route]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<Hero />
		</>
	);
};

export default HomePage;
