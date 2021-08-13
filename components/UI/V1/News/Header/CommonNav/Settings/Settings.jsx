import { useContext, useEffect, useState } from 'react';

import classes from './Settings.module.css';

import NewsContext from '@store/NewsContext';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import UpdateAction from '@components/UI/V1/News/Action/Action';
import DeleteAction from '@components/UI/V1/News/Action/Action';
import ShareModel from '@components/UI/V1/Modal/Share';

const Settings = ({
	isDataOwner,
	data,
	setData,
	// setIsLoadingContent,
	// isLoadingContent,
}) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		if (isDataOwner) {
			setItems([
				{
					className: `${classes['settings-item-for-data-owner']}`,
					props: {
						// setIsLoadingContent,
						// isLoadingContent,
						UpdateAction,
						data,
						setData,
					},
					Element: ({
						UpdateAction,
						data,
						setData,
						// setIsLoadingContent,
						// isLoadingContent,
					}) => {
						const {
							isLoadingContent,
							setIsLoadingContent,
							news,
							setNews,
							...NewsCxt
						} = useContext(NewsContext);

						const [showUpdateNewsModal, setShowUpdateNewsModal] =
							useState(false);

						const [actionNewsData, setActionNewsData] = useState({
							type: data.type,
							action: 'update',
							route: 'update',
							data: news,
							setData: setNews,
						});

						useEffect(() => {
							if (!data.content) setIsLoadingContent(true);
						}, []);

						useEffect(() => {
							if (
								JSON.stringify(news) !== JSON.stringify(actionNewsData.data)
							) {
								setActionNewsData({
									type: data.type,
									action: 'update',
									route: 'update',
									data: news,
									setData: setNews,
								});
							}
						}, [news]);

						return (
							<>
								<button onClick={() => setShowUpdateNewsModal(true)}>
									Edit
								</button>
								<UpdateAction
									showModal={showUpdateNewsModal}
									setShowModal={setShowUpdateNewsModal}
									closeModal={() => setShowUpdateNewsModal(false)}
									news={actionNewsData}
								/>
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
						// setIsLoadingContent,
						// isLoadingContent,
					},
					Element: ({ DeleteAction, data, setData }) => {
						const {
							isLoadingContent,
							setIsLoadingContent,
							news,
							setNews,
							...NewsCxt
						} = useContext(NewsContext);

						const [showDeleteModal, setShowDeleteModal] = useState(false);

						const [actionNewsData, setActionNewsData] = useState({
							type: data.type,
							action: 'delete',
							isDataOwner,
							data: news,
							setData: setNews,
						});

						useEffect(() => {
							if (!data.content) setIsLoadingContent(true);
						}, []);

						useEffect(() => {
							if (
								JSON.stringify(news) !== JSON.stringify(actionNewsData.data)
							) {
								setActionNewsData({
									type: data.type,
									action: 'delete',
									isDataOwner,
									data: news,
									setData: setNews,
								});
							}
						}, [news]);

						return (
							<>
								<button onClick={() => setShowDeleteModal(true)}>Delete</button>
								<DeleteAction
									showModal={showDeleteModal}
									setShowModal={setShowDeleteModal}
									closeModal={() => setShowDeleteModal(false)}
									news={actionNewsData}
								/>
							</>
						);
					},
				},
				{
					props: {
						ShareModel,
						data,
					},
					Element: ({ ShareModel, data }) => {
						const [showShareModel, setShowShareModel] = useState(false);

						return (
							<>
								<button onClick={() => setShowShareModel(true)}>
									Share News
								</button>
								<ShareModel
									data={data}
									showShareModel={showShareModel}
									setShowShareModel={setShowShareModel}
								/>
							</>
						);
					},
				},
			]);
		} else {
			setItems([
				{
					props: {
						ShareModel,
						data,
					},
					Element: ({ ShareModel, data }) => {
						const [showShareModel, setShowShareModel] = useState(false);

						return (
							<>
								<button onClick={() => setShowShareModel(true)}>
									Share News
								</button>
								<ShareModel
									data={data}
									showShareModel={showShareModel}
									setShowShareModel={setShowShareModel}
								/>
							</>
						);
					},
				},
			]);
		}
	}, [isDataOwner]);

	return (
		<>
			<DropdownMenu items={items} />
		</>
	);
};

export default Settings;
