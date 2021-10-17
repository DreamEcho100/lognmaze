import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import NewsContext from '@store/NewsContext';
import { handleLoadingNewsItemContent } from '@store/NewsContext/actions';

const UpdateAction = dynamic(
	() => import('@components/UI/V1/NewsV2/Action/Update'),
	{
		ssr: false,
	}
);

const UpdateNews = ({ newsItemData }) => {
	const { dispatch } = useContext(NewsContext);

	const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false);

	useEffect(() => {
		if (showUpdateNewsModal && !newsItemData.content) {
			const loadContent = async () => {
				await handleLoadingNewsItemContent({
					dispatch,
					news_id: newsItemData.news_id,
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
