import { useState } from 'react';

import classes from './Settings.module.css';

import Update from '../../PostModal/Update/Update';

const Settings = ({ isPostOwner, postContent }) => {
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

	return (
		<ul>
			{isPostOwner && (
				<li>
					<button onClick={() => setShowUpdatePostModal(true)}>
						Edit Post
					</button>
					{showUpdatePostModal && (
						<Update
							closeModal={() => setShowUpdatePostModal(false)}
							postContent={postContent}
						/>
					)}
				</li>
			)}
			<li>Share Post</li>
		</ul>
	);
};

export default Settings;
