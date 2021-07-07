import React from 'react';
import { useState } from 'react';
import CreateArticleModal from '../../UI/V1/News/NewsModal/Article/Create/Create';

import Button from '../../UI/V1/Button/Button';

const CreateNewsButton = () => {
	const [showCreateNewsButtonModal, setShowCreateNewsButtonModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowCreateNewsButtonModal(true)}>
				Create A News
			</Button>
			{showCreateNewsButtonModal && (
				<CreateArticleModal
					closeModal={() => setShowCreateNewsButtonModal(false)}
				/>
			)}
		</>
	);
};

export default CreateNewsButton;
