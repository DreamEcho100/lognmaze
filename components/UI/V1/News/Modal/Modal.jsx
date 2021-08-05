import { Fragment, useEffect } from 'react';

import classes from './Modal.module.css';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import Container from '@components/UI/V1/News/Container/Container';

const NewsModal = ({ setCloseModal, detailsType, data, setData }) => {
	const handleLoadindArticleContent = async (id) => {
		await fetch(`/api/v1/news/articles/article/content/${id}`)
			.then((response) => response.json())
			.then(({ message, status, ...result }) => {
				setData({
					...data,
					...result.data,
				});
			})
			.catch((error) => console.error(error));
	};

	useEffect(async () => {
		if (data.type === 'article' && !data.content) {
			await handleLoadindArticleContent(data.news_id);
		}
	}, [data]);

	return (
		<Modal
			click={() => setCloseModal(true)}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				{/* <Header data={data} setData={setData} /> */}
			</Fragment>
			<Fragment key='body'>
				<Container data={data} setData={setData} detailsType={detailsType} />
			</Fragment>
		</Modal>
	);
};

export default NewsModal;
