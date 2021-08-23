import { Fragment, useContext, useEffect, useState } from 'react';

import {
	handleCreatingNewsItem,
	handleDeletingUserNewsItem,
	handleUpdatingUserNewsItem,
} from '@store/NewsContextTest/actions';
import NewsContextTest from '@store/NewsContextTest';
import UserContext from '@store/UserContext';

import ModalContainer from './ModalContainer/ModalContainer';
import Article from './Article/Article';
import Post from './Post/Post';
import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import ContainerItems from '@components/UI/V1/News/Container/ContainerItems';

const Action = ({
	closeModal,
	showModal,
	setShowModal,
	type,
	action,
	newsItem,
	...props
}) => {
	const { dispatch } = useContext(NewsContextTest);
	const extraProps = {};

	const { user, ...UserCxt } = useContext(UserContext);

	const [newsType, setNewsType] = useState(type);

	useEffect(() => {
		if (type !== newsType) setNewsType(type);
		type = newsType;
	}, []);

	const deleteNews = async ({ news_id }) => {
		await handleDeletingUserNewsItem({
			dispatch,
			user,
			news_id,
		});

		if (setShowModal && !showModal) setShowModal(false);
		else document.body.style.overflowY = 'auto';

		return;
	};

	const createNews = async (values, newsType) => {
		return await handleCreatingNewsItem({
			dispatch,
			user,
			newsType,
			newsValues: values,
			newsType,
		});
	};

	const updateNews = async (newsType, oldValues, newValues) => {
		return await handleUpdatingUserNewsItem({
			dispatch,
			user,
			newsType,
			oldValues,
			newValues,
		});
	};

	if (action === 'update') {
		extraProps.newsItem = newsItem;
	}

	if (action === 'create' || action === 'update') {
		return (
			<ModalContainer
				showModal={showModal}
				setShowModal={setShowModal}
				closeModal={closeModal}
				HeaderProps={{
					action,
					newsType,
					setNewsType,
				}}
			>
				{newsType === 'article' && (
					<Article
						closeModal={closeModal}
						newsItem={newsItem}
						createNews={createNews}
						updateNews={updateNews}
						actionType={action}
						{...extraProps}
					/>
				)}
				{newsType === 'post' && (
					<Post
						closeModal={closeModal}
						newsItem={newsItem}
						createNews={createNews}
						updateNews={updateNews}
						actionType={action}
						{...extraProps}
					/>
				)}
			</ModalContainer>
		);
	}

	if (action === 'delete') {
		return (
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				showModal={showModal}
				click={() => closeModal(true)}
				CloseButtonElement={(props) => (
					<Button title='button' {...props}>
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
							<Button
								title='Yes'
								onClick={() => deleteNews({ news_id: newsItem.news_id })}
							>
								Yes
							</Button>
							<Button title='No' onClick={() => closeModal()}>
								No
							</Button>
						</div>
					</header>
				</Fragment>
				<Fragment key='body'>
					<ContainerItems
						containerType='sub'
						newsItem={newsItem}
						detailsType='content'
						hideHeaderSettings={true}
						action='delete'
						setIsLoadingContent={props.setIsLoadingContent}
						// isLoadingUserVote={isLoadingUserVote}
						// isLoadingContent={isLoadingContent}
					/>
				</Fragment>
			</Modal>
		);
	}
};

export default Action;
