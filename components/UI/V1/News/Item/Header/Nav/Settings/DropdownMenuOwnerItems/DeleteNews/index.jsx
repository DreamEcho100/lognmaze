import { useState } from 'react';
import dynamic from 'next/dynamic';

const ActionDeleteDynamic = dynamic(
	() => import('@components/UI/V1/News/Action/Delete'),
	{
		ssr: false,
	}
);

const DeleteNews = ({ newsItemData }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<>
			<button title='Delete News' onClick={() => setShowDeleteModal(true)}>
				Delete
			</button>
			<ActionDeleteDynamic
				showModal={showDeleteModal}
				setShowModal={setShowDeleteModal}
				newsItemData={newsItemData}
			/>
		</>
	);
};

export default DeleteNews;
