import { useEffect, useState } from 'react';

import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/NewsContext';
import {
	handleDeletingUserNewsItem,
	handleLoadingNewsItemContent,
} from '@store/NewsContext/actions';

import Button from '@components/UI/V1/Button';
import ActionModal from '../UI/Modal';
import NewsItem from '@components/UI/V1/NewsV2/Item';

const ActionHeader = ({ deleteNews, setShowModal, disableButtons }) => {
	return (
		<header>
			<h2>Are you sure you want to delete it?</h2>
			<div className='buttons-holder'>
				<Button
					title='Yes'
					onClick={() => deleteNews()}
					disabled={disableButtons}
				>
					Yes
				</Button>
				<Button
					title='No'
					onClick={() => setShowModal(false)}
					disabled={disableButtons}
				>
					No
				</Button>
			</div>
		</header>
	);
};

const ActionBody = ({ newsItemData }) => {
	return (
		<section>
			<NewsItem
				newsItemData={newsItemData}
				detailsType='content'
				hideHeaderSettings={true}
				hideFooterSettings={true}
			/>
		</section>
	);
};

const DeleteAction = ({ showModal, setShowModal, newsItemData }) => {
	const [userState, userDispatch] = useUserSharedState();
	const [newsState, newsDispatch] = useNewsSharedState();
	const [disableButtons, setDisableButtons] = useState(false);

	const deleteNews = async () => {
		// return {
		// 	news_id: newsItemData.news_id,
		// 	newsType: newsItemData.type,
		// 	tags: newsItemData.tags,
		// };

		setDisableButtons(true);

		const result = await handleDeletingUserNewsItem({
			newsDispatch,
			token: userState.token,
			news_id: newsItemData.news_id,
			newsType: newsItemData.type,
			tags: newsItemData.tags,
		});

		if (result.status === 'error') return setDisableButtons(false);

		if (showModal) setShowModal(false);
	};

	useEffect(() => {
		if (showModal && !newsItemData.content) {
			const loadContent = async () => {
				await handleLoadingNewsItemContent({
					dispatch,
					news_id: newsItemData.news_id,
				});
			};

			loadContent();
		}
	}, []);

	return (
		<ActionModal
			showModal={showModal}
			setShowModal={setShowModal}
			Header={() => (
				<ActionHeader
					setShowModal={setShowModal}
					deleteNews={deleteNews}
					disableButtons={disableButtons}
				/>
			)}
			Body={() => (
				<ActionBody
					newsItemData={newsItemData}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
		/>
	);
};

export default DeleteAction;
