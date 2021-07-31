import { useEffect, useState } from 'react';

import classes from './Settings.module.css';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import UpdateAction from '@components/UI/V1/News/Action/Action';
import DeleteAction from '@components/UI/V1/News/Action/Action';

const Settings = ({ isDataOwner, data, setData }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		if (isDataOwner) {
			setItems([
				{
					className: `${classes['settings-item-for-data-owner']}`,
					props: {
						UpdateAction,
						data,
						setData,
					},
					Element: ({ UpdateAction, data, setData }) => {
						const [showUpdateNewsModal, setShowUpdateNewsModal] =
							useState(false);

						return (
							<>
								<button onClick={() => setShowUpdateNewsModal(true)}>
									Edit
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
							</>
						);
					},
				},
				{
					className: `${classes['settings-item-for-data-owner']}`,
					props: {
						DeleteAction,
						data,
						setData,
					},
					Element: ({ DeleteAction, data, setData }) => {
						const [showDeleteModal, setShowDeleteModal] = useState(false);

						return (
							<>
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
							</>
						);
					},
				},
				{
					Element: () => <button>Share News</button>,
				},
			]);
		} else {
			setItems([
				{
					Element: () => <button>Share News</button>,
				},
			]);
		}
	}, [isDataOwner]);

	return <DropdownMenu items={items} />;
};

export default Settings;
