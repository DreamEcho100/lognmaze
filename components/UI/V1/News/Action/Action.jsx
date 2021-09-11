import { Fragment, useContext, useEffect, useState } from 'react';

import {
	handleCreatingNewsItem,
	handleDeletingUserNewsItem,
	handleUpdatingUserNewsItem,
} from '@store/NewsContext/actions';
import UserContext from '@store/UserContext';
import NewsContext from '@store/NewsContext';

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
	const { dispatch } = useContext(NewsContext);
	const extraProps = {};

	const { state: userState } = useContext(UserContext);

	const [newsType, setNewsType] = useState(type);

	useEffect(() => {
		if (type !== newsType) setNewsType(type);
		type = newsType;
	}, []);

	const deleteNews = async ({ news_id, newsType, tags }) => {
		const result = await handleDeletingUserNewsItem({
			dispatch,
			token: userState.token,
			news_id,
			newsType,
			tags,
		});

		if (setShowModal && !showModal) setShowModal(false);
		else document.body.style.overflowY = 'auto';

		return result;
	};

	const createNews = async (values, newsType) => {
		const result = await handleCreatingNewsItem({
			dispatch,
			user: userState.user,
			token: userState.token,
			newsType,
			newsValues: values,
			newsType,
		});

		return result;
	};

	const updateNews = async (newsType, oldValues, newValues) => {
		return await handleUpdatingUserNewsItem({
			dispatch,
			user: userState.user,
			token: userState.token,
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
				click={() => closeModal(true)}
				CloseButtonElement={(props) => (
					<Button title='button' {...props}>
						Close
					</Button>
				)}
				modelClasses={{
					'modal-wrapper': { width: '90%', maxWidth: 'none' },
					'modal-container': { background: 'var(--main-bg-color-2)' },
					'modal-body': {
						background: 'var(--main-bg-color-1)',
					},
				}}
			>
				<Fragment key='header'>
					<header>
						<h2>Are you sure you want to delete it?</h2>
						<div className='buttons-holder-padding-half-em'>
							<Button
								title='Yes'
								onClick={() =>
									deleteNews({
										news_id: newsItem.news_id,
										newsType: newsItem.type,
										tags: newsItem.tags,
									})
								}
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
						hideFooterSettings={true}
						// isLoadingUserVote={isLoadingUserVote}
						// isLoadingContent={isLoadingContent}
					/>
				</Fragment>
			</Modal>
		);
	}
};

export default Action;
