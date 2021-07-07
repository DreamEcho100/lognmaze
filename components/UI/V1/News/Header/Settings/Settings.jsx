import { useState } from 'react';

import classes from './Settings.module.css';

import Update from '../../Modal/Article/Update/Update';

const Settings = ({ isNewsOwner, newsContent, setNewsContent }) => {
	const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false);

	return (
		<ul>
			{isNewsOwner && (
				<li>
					<button onClick={() => setShowUpdateNewsModal(true)}>
						Edit News
					</button>
					{showUpdateNewsModal && (
						<Update
							closeModal={() => setShowUpdateNewsModal(false)}
							NewsContent={newsContent}
							setNewsContent={setNewsContent}
						/>
					)}
				</li>
			)}
			<li>Share News</li>
		</ul>
	);
};

export default Settings;
