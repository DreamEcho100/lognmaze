import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '@store/UserContext';

import Home from '@components/Home';

const HomePage = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [news, setNews] = useState([]);

	const UserCxt = useContext(UserContext);

	useEffect(async () => {
		if (!UserCxt.isLoading && news.length === 0) {
			let linkQuery = '';
			if (UserCxt.userExist) {
				linkQuery = `/?news_reactor_id=${UserCxt.user.id}`;
			}
			const news = await fetch(`api/v1/news${linkQuery}`) // ${process.env.BACK_END_ROOT_URL}/
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (!status || (status && status === 'error')) {
						console.error(message);
						return;
					}
					setNews(data);
				})
				.catch((error) => {
					console.error(error);
					return {
						status: 'error',
						message: error.message,
						data: [],
					};
				});
			setIsLoading(false);
		}
	}, [UserCxt.isLoading, UserCxt.userExist, router.route]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return <Home user={UserCxt.user} news={news} />;
};

export default HomePage;

/*export const getServerSideProps = async () => {
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
*/
