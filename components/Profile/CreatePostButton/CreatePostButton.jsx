import React from 'react';
import { useState } from 'react';
import CreatePostModal from '../../UI/V1/posts/PostModal/Create/Create';

import Button from '../../UI/V1/Button/Button';

const CreatePostButton = () => {
	const [showCreatePostButtonModal, setShowCreatePostButtonModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowCreatePostButtonModal(true)}>
				Create A Post
			</Button>
			{showCreatePostButtonModal && (
				<CreatePostModal
					closeModal={() => setShowCreatePostButtonModal(false)}
				/>
			)}
		</>
	);
};

export default CreatePostButton;
