import { useContext, useState } from 'react';

import { handleUpdatingUserNewsItem } from '@store/NewsContext/actions';
import { useUserSharedState } from '@store/UserContext';
import NewsContext from '@store/NewsContext';

// import Button from '@components/UI/V1/Button';
import ActionModal from '../UI/Modal';
import ActionNewsForm from '../UI/NewsForm';

const UpdateActionHeader = () => {
	return (
		<header>
			<h2>Update News</h2>
			{/* <div className='buttons-holder'>
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
			</div> */}
		</header>
	);
};

const UpdateActionBody = ({
	newsItemData,
	setShowModal,
	newsType,

	updateNews,
}) => {
	return (
		<ActionNewsForm
			newsItemData={newsItemData}
			setShowModal={setShowModal}
			actionOnSubmit={updateNews}
			isClosingModalAfterSubmit={true}
			newsType={newsType}
			actionType='update'
		/>
	);
};

const UpdateAction = ({ newsItemData = {}, showModal, setShowModal }) => {
	const [userState, userDispatch] = useUserSharedState();
	const { dispatch: newsDispatch } = useContext(NewsContext);
	const [newsType, setNewsType] = useState(newsItemData.type);

	const updateNews = async ({ newValues, oldValues }) => {
		// const result = await handleCreatingNewsItem({
		// 	dispatch: newsDispatch,
		// 	user: userState.user,
		// 	token: userState.token,
		// 	newsType,
		// 	newsValues: values,
		// });

		const result = await handleUpdatingUserNewsItem({
			dispatch: newsDispatch,
			user: userState.user,
			token: userState.token,
			newsType,
			oldValues, // : newsItemData
			newValues, // : values
		});

		return result;
	};

	return (
		<ActionModal
			showModal={showModal}
			setShowModal={setShowModal}
			Header={() => (
				<UpdateActionHeader setNewsType={setNewsType} newsType={newsType} />
			)}
			Body={() => (
				<UpdateActionBody
					newsItemData={newsItemData}
					setShowModal={setShowModal}
					newsType={newsType}
					updateNews={updateNews}
				/>
			)}
		/>
	);
};

export default UpdateAction;
