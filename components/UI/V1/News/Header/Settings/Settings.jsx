import { useState } from 'react';

import classes from './Settings.module.css';

import UpdateAction from '@/components/UI/V1/News/Action/Action';
// import Update from '../../Modal/Article/Update/Update';

const Settings = ({ isDataOwner, data, setData }) => {
	const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false);
	const [showSettingsMenu, setShowSettingsMenu] = useState(false);

	return (
		<>
			<strong onClick={() => setShowSettingsMenu((prev) => !prev)}>
				<i>|</i>
			</strong>
			{showSettingsMenu && (
				<ul>
					{isDataOwner && (
						<li>
							<button onClick={() => setShowUpdateNewsModal(true)}>
								Edit News
							</button>
							{showUpdateNewsModal && (
								<UpdateAction
									closeModal={() => setShowUpdateNewsModal(false)}
									news={{
										type: data.type,
										action: 'update',
										route: 'update',
										data,
										setData,
									}}
								/>
							)}
						</li>
					)}
					<li>Share News</li>
				</ul>
			)}
		</>
	);
};

export default Settings;
