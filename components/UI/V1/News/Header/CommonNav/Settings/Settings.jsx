import { useState } from 'react';

import classes from './Settings.module.css';

import UpdateAction from '@components/UI/V1/News/Action/Action';
// import Update from '../../Modal/Article/Update/Update';
import DeleteAction from '@components/UI/V1/News/Action/Action';

const Settings = ({ isDataOwner, data, setData }) => {
	const [showUpdateNewsModal, setShowUpdateNewsModal] = useState(false);
	const [showSettingsMenu, setShowSettingsMenu] = useState(false);

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	return (
		<div className={classes['settings-wrapper']}>
			<button className={classes['seeting-btn']}>
				<strong onClick={() => setShowSettingsMenu((prev) => !prev)}>
					<i>|</i>
				</strong>
			</button>
			<ul
				className={`${classes['settings-menu']} ${
					showSettingsMenu ? classes['show-settings-menu'] : ''
				}`}
				onBlur={() => {
					setTimeout(() => {
						if (showSettingsMenu) setShowSettingsMenu(false);
					}, 100);
				}}
			>
				{isDataOwner && (
					<>
						<li
							className={`${classes['settings-item']} ${classes['settings-item-for-data-owner']}`}
						>
							<button onClick={() => setShowUpdateNewsModal(true)}>Edit</button>
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
						<li
							className={`${classes['settings-item']} ${classes['settings-item-for-data-owner']}`}
						>
							<button onClick={() => setShowDeleteModal(true)}>Delete</button>
							{showDeleteModal && (
								<DeleteAction
									closeModal={() => setShowDeleteModal(false)}
									news={{
										type: data.type,
										action: 'delete',
										isDataOwner,
										data,
										setData,
									}}
								/>
							)}
						</li>
					</>
				)}
				<li className={classes['settings-item']}>
					<button>Share News</button>
				</li>
			</ul>
		</div>
	);
};

export default Settings;
