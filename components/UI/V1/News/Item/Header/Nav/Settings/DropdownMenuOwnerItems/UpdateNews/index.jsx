import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { useNewsSharedState } from '@store/NewsContext';
import { handleLoadingNewsItemContent } from '@store/NewsContext/actions';

const UpdateAction = dynamic(
	() => import('@components/UI/V1/News/Action/Update'),
	{
		ssr: false,
	}
);

const UpdateNews = ({ newsItemData }) => {
	const [newsState, newsDispatch] = useNewsSharedState();

	const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false);

	useEffect(() => {
		if (showUpdateNewsModal && !newsItemData.content) {
			const loadContent = async () => {
				await handleLoadingNewsItemContent({
					newsDispatch,
					news_id: newsItemData.news_id,
				});
			};

			loadContent();
		}
	}, [
		showUpdateNewsModal,
		newsDispatch,
		newsItemData.content,
		newsItemData.news_id,
	]);

	return (
		<>
			<button title='Edit News' onClick={() => setShowUpdateNewsModal(true)}>
				Edit
			</button>
			<UpdateAction
				showModal={showUpdateNewsModal}
				setShowModal={setShowUpdateNewsModal}
				newsItemData={newsItemData}
				// closeModal={() => setShowUpdateNewsModal(false)}
				// type={newsItemData.type}
				// action='update'
				// newsItem={newsItemData}
			/>
		</>
	);
};

export default UpdateNews;
