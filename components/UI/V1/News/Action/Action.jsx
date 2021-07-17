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

	const fetcher = async ({ bodyObj, token, method = 'POST' }) =>
		await fetch(`/api/v1/news`, {
			// /${news.route}
			method,
			body: JSON.stringify(bodyObj),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});

	const extraProps = {};
	if (news.action === 'update') {
		extraProps.data = news.data;
		extraProps.setData = news.setData;
	}

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
					{...extraProps}
				/>
			)}
			{newsType === 'post' && (
				<Post
					closeModal={closeModal}
					fetcher={fetcher}
					actionType={news.action}
					{...extraProps}
				/>
			)}
		</ModalContainer>
	);
};

export default Action;
