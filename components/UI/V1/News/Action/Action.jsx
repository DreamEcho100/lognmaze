import { Fragment, useContext, useEffect, useState } from 'react';

import UserContext from '@store/UserContext';
import { NewsContextProvider } from '@components/UI/V1/News/NewsContext';

import ModalContainer from './ModalContainer/ModalContainer';
import Article from './Article/Article';
import Post from './Post/Post';
import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import ContainerItems from '@components/UI/V1/News/Container/ContainerItems';

const Action = ({ closeModal, showModal, setShowModal, news, ...props }) => {
	// if (!showModal) {
	// 	return <></>;
	// }
	const extraProps = {};

	const { user, ...UserCxt } = useContext(UserContext);

	const [newsType, setNewsType] = useState(news.type);

	useEffect(() => {
		if (news.type !== newsType) setNewsType(news.type);
		news.type = newsType;
	}, []);

	const fetcher = async ({ bodyObj, token, method = 'POST' }) =>
		await fetch(`/api/v1/news`, {
			method,
			body: JSON.stringify(bodyObj),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});

	const deleteNews = () => {
		fetcher({
			token: user.token,
			method: 'DELETE',
			bodyObj: {
				news_id: news.data.news_id,
				type: news.data.type,
			},
		})
			.then((response) => response.json())
			.then(({ status, message, data, isAuthorized }) => {
				news.setData({});
			})
			.then(() => {
				setTimeout(() => closeModal(true), 10);
			});
	};

	if (news.action === 'update') {
		extraProps.data = news.data;
		extraProps.setData = news.setData;
	}

	if (news.action === 'create' || news.action === 'update') {
		return (
			<ModalContainer
				showModal={showModal}
				setShowModal={setShowModal}
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
	}

	if (news.action === 'delete') {
		return (
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				showModal={showModal}
				click={() => closeModal(true)}
				CloseButtonElement={(props) => (
					<Button type='button' {...props}>
						Close
					</Button>
				)}
				modelClasses={{
					'modal-wrapper': { width: '90%', maxWidth: 'none' },
					'modal-container': { background: 'rgba(255, 255, 255)' },
				}}
			>
				<Fragment key='header'>
					<header>
						<h2>Are you sure you want to delete it?</h2>
						<div>
							<Button onClick={() => deleteNews()}>Yes</Button>
							<Button onClick={() => closeModal(true)}>No</Button>
						</div>
					</header>
				</Fragment>
				<Fragment key='body'>
					{/* <Container
						containerType='sub'
						data={news.data}
						setData={news.setData}
						detailsType='content'
						hideHeaderSettings={true}
						action='delete'
					/> */}
					{/* <NewsContextProvider key={item.news_id}>
						<Container
							data={item}
							detailsType='description'
							ModalOnClick={true}
							className={classes['news-container']}
						/>
					</NewsContextProvider> */}
					<ContainerItems
						// articleProps={articleProps}
						containerType='sub'
						data={news.data}
						setData={news.setData}
						detailsType='content'
						hideHeaderSettings={true}
						action='delete'
						setIsLoadingContent={props.setIsLoadingContent}
						// isLoadingReactions={isLoadingReactions}
						// isLoadingContent={isLoadingContent}
					/>
				</Fragment>
			</Modal>
		);
	}
};

export default Action;
