import { useState } from 'react';

const ShareNews = ({ ShareModel, newsItem }) => {
	const [showShareModel, setShowShareModel] = useState(false);

	return (
		<>
			<button title='Share News' onClick={() => setShowShareModel(true)}>
				Share
			</button>
			<ShareModel
				data={newsItem}
				showShareModel={showShareModel}
				setShowShareModel={setShowShareModel}
			/>
		</>
	);
};

export default ShareNews;
