import { useState } from 'react';

import classes from './Settings.module.css';

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
							{showUpdateNewsModal &&
								{
									/* <Update
							closeModal={() => setShowUpdateNewsModal(false)}
							data={data}
							setData={setData}
						/> */
								}}
						</li>
					)}
					<li>Share News</li>
				</ul>
			)}
		</>
	);
};

export default Settings;
