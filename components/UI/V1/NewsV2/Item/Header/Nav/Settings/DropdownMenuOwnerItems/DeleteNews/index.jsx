import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import NewsContext from '@store/NewsContext';
import { handleLoadingNewsItemContent } from '@store/NewsContext/actions';

const ActionDynamic = dynamic(() => import('@components/UI/V1/News/Action'), {
	ssr: false,
});

const DeleteNews = ({ newsItemData }) => {
	const { dispatch } = useContext(NewsContext);

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [actionNewsData, setActionNewsData] = useState({
		type: newsItemData.type,
		action: 'delete',
		newsItemData: newsItemData,
	});

	useEffect(() => {
		if (showDeleteModal && !newsItemData.content) {
			const loadContent = async () => {
				await handleLoadingNewsItemContent({
					dispatch,
					news_id: newsItemData.news_id,
				});
			};

			loadContent();
		}
	}, [showDeleteModal]);

	useEffect(() => {
		if (
			JSON.stringify(newsItemData) !==
			JSON.stringify(actionNewsData.newsItemData)
		) {
			setActionNewsData((prev) => ({
				...prev,
				type: newsItemData.type,
				newsItem: newsItemData,
			}));
		}
	}, [newsItemData]);

	return (
		<>
			<button title='Delete News' onClick={() => setShowDeleteModal(true)}>
				Delete
			</button>
			<ActionDynamic
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
				closeModal={() => setShowDeleteModal(false)}
				type={newsItemData.type}
				action='delete'
				isDataOwner
				newsItem={newsItemData}
			/>
		</>
	);
};

export default DeleteNews;
