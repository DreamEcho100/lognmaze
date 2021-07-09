import { useEffect, useState } from 'react';

import ModalContainer from './ModalContainer/ModalContainer';
import Article from './Article/Article';
import Post from './Post/Post';

const Action = ({ closeModal, news }) => {
	const [newsType, setNewsType] = useState(news.type);

	useEffect(() => {
		if (news.type !== newsType) setNewsType(news.type);
		news.type = newsType;
	}, []);

	const fetcher = async ({ bodyObj, token }) =>
		await fetch(`/api/v1/users/news/${news.route}`, {
			method: 'POST',
			body: JSON.stringify(bodyObj),
			headers: {
				'Content-Type': 'application/json',
				Authorization `Bearer ${token}`,
			},
		});

	return (
		<ModalContainer
			closeModal={closeModal}
			HeaderProps={{
				news,
				newsType,
				setNewsType,
			}}
		>
			{newsType === 'article' && (
				<Article
					closeModal={closeModal}
					fetcher={fetcher}
					actionType={news.action}
				/>
			)}
			{newsType === 'post' && (
				<Post
					closeModal={closeModal}
					fetcher={fetcher}
					actionType={news.action}
				/>
			)}
		</ModalContainer>
	);
};

export default Action;
