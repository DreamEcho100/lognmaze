import { useEffect, useState } from 'react';

const UpdateNews = ({
	ActionDynamic,
	newsItem,
	handleLoadingNewsItemContent,
	dispatch,
}) => {
	const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false);

	useEffect(() => {
		if (showUpdateNewsModal && !newsItem.content) {
			const loadContent = async () => {
				await handleLoadingNewsItemContent({
					dispatch,
					news_id: newsItem.news_id,
				});
			};

			loadContent();
		}
	}, [showUpdateNewsModal]);

	return (
		<>
			<button title='Edit News' onClick={() => setShowUpdateNewsModal(true)}>
				Edit
			</button>
			<ActionDynamic
				showModal={showUpdateNewsModal}
				setShowModal={setShowUpdateNewsModal}
				closeModal={() => setShowUpdateNewsModal(false)}
				type={newsItem.type}
				action='update'
				newsItem={newsItem}
			/>
		</>
	);
};

export default UpdateNews;
