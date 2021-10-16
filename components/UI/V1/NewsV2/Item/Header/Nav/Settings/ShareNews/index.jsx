import { useState } from 'react';

import ShareModel from '@components/UI/V1/Modal/Share';

const ShareNews = ({ newsItemData }) => {
	const [showShareModel, setShowShareModel] = useState(false);

	return (
		<>
			<button title='Share News' onClick={() => setShowShareModel(true)}>
				Share
			</button>
			<ShareModel
				data={newsItemData}
				showShareModel={showShareModel}
				setShowShareModel={setShowShareModel}
			/>
		</>
	);
};

export default ShareNews;
