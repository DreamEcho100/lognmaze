import { useEffect, useState } from 'react';

const DeleteNews = ({
	ActionDynamic,
	newsItem,
	handleLoadingNewsItemContent,
	dispatch,
}) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [actionNewsData, setActionNewsData] = useState({
		type: newsItem.type,
		action: 'delete',
		newsItem: newsItem,
	});

	useEffect(() => {
		if (showDeleteModal && !newsItem.content) {
			const loadContent = async () => {
				await handleLoadingNewsItemContent({
					dispatch,
					news_id: newsItem.news_id,
				});
			};

			loadContent();
		}
	}, [showDeleteModal]);

	useEffect(() => {
		if (JSON.stringify(newsItem) !== JSON.stringify(actionNewsData.newsItem)) {
			setActionNewsData((prev) => ({
				...prev,
				type: newsItem.type,
				newsItem: newsItem,
			}));
		}
	}, [newsItem]);

	return (
		<>
			<button title='Delete News' onClick={() => setShowDeleteModal(true)}>
				Delete
			</button>
			<ActionDynamic
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
				closeModal={() => setShowDeleteModal(false)}
				type={newsItem.type}
				action='delete'
				isDataOwner
				newsItem={newsItem}
			/>
		</>
	);
};

export default DeleteNews;
