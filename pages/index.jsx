import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '@/store/UserContext';

import Hero from '@/components/Home/Hero/Hero';
import Feed from '@/components/Home/Feed/Feed';

const HomePage = ({ news }) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);

	const UserCxt = useContext(UserContext);

	useEffect(() => {
		if (!UserCxt.isLoading) {
			// if (UserCxt.user && UserCxt.user.id) {
			// 	router.replace('/posts/all');
			// } else {
			// 	setIsLoading(false);
			// }

			// if (!UserCxt.user && !UserCxt.user.id) {
			// 	setIsLoading(false);
			// }
			setIsLoading(false);
		}
	}, [UserCxt.isLoading, UserCxt.user, router.route]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<Hero user={UserCxt.user} />
			<Feed news={news.data} />
		</>
	);
};

export default HomePage;

export const getServerSideProps = async () => {
	const news = await fetch(`${process.env.BACK_END_ROOT_URL}/api/v1/news`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error);
			return {
				status: 'error',
				message: error.message,
				data: [],
				// isAuthorized: false,
				// visitorIdentity: GUEST,
			};
		});

	return {
		props: {
			news,
			// user: data.user ? data.user : {},
			// posts: data.posts ? data.posts : [],
		}, // will be passed to the page component as props
	};
};
