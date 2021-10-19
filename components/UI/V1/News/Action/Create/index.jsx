import { useState } from 'react';

import { handleCreatingNewsItem } from '@store/NewsContext/actions';
import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/NewsContext';

import Button from '@components/UI/V1/Button';
import ActionModal from '../UI/Modal';
import ActionNewsForm from '../UI/NewsForm';

const CreateActionHeader = ({ newsType, setNewsType }) => {
	return (
		<header>
			<h2>Create News</h2>
			<div className='buttons-holder'>
				<Button
					onClick={() => {
						if (newsType !== 'article') {
							setNewsType('article');
						}
					}}
				>
					Article
				</Button>
				<Button
					onClick={() => {
						if (newsType !== 'post') {
							setNewsType('post');
						}
					}}
				>
					Post
				</Button>
			</div>
		</header>
	);
};

const CreateActionBody = ({
	newsItemData,
	setShowModal,
	newsType,

	createNews,
}) => {
	return (
		<ActionNewsForm
			newsItemData={newsItemData}
			setShowModal={setShowModal}
			actionOnSubmit={createNews}
			isClosingModalAfterSubmit={true}
			newsType={newsType}
			actionType='create'
		/>
	);
};

const CreateAction = ({ newsItemData = {}, showModal, setShowModal }) => {
	const [userState, userDispatch] = useUserSharedState();
	const [newsState, newsDispatch] = useNewsSharedState();
	const [newsType, setNewsType] = useState('article');

	const createNews = async ({ values }) => {
		const result = await handleCreatingNewsItem({
			newsDispatch,
			user: userState.user,
			token: userState.token,
			newsType,
			newsValues: values,
		});

		return result;
	};

	return (
		<ActionModal
			showModal={showModal}
			setShowModal={setShowModal}
			Header={() => (
				<CreateActionHeader setNewsType={setNewsType} newsType={newsType} />
			)}
			Body={() => (
				<CreateActionBody
					newsItemData={newsItemData}
					setShowModal={setShowModal}
					newsType={newsType}
					createNews={createNews}
				/>
			)}
		/>
	);
};

export default CreateAction;
