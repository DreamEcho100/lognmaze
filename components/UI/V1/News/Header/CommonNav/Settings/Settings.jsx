import { useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './Settings.module.css';

import NewsContext from '@store/NewsContext';

// const DynamicDropdownMenu = dynamic(() =>
// 	import('@components/UI/V1/DropdownMenu')
// );
// const DynamicAction = dynamic(() =>
// 	import('@components/UI/V1/News/Action/Action')
// );
// const DynamicShareModel = dynamic(() =>
// 	import('@components/UI/V1/Modal/Share')
// );

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import Action from '@components/UI/V1/News/Action/Action';
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
						// DynamicAction,
						Action,
						data,
						setData,
					},
					Element: ({
						// DynamicAction,
						Action,
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
									setData: setData,setNews,
								});
							}
						}, [news]);

						return (
							<>
								<button
									title='Edit News'
									onClick={() => setShowUpdateNewsModal(true)}
								>
									Edit
								</button>
								<Action
									// DynamicAction
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
						// DynamicAction,
						Action,
						data,
						setData,
						// setIsLoadingContent,
						// isLoadingContent,
					},
					Element: ({
						Action,
						// DynamicAction
						data,
						setData,
					}) => {
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
								<button
									title='Delete News'
									onClick={() => setShowDeleteModal(true)}
								>
									Delete
								</button>
								<Action
									// DynamicAction
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
						// DynamicShareModel,
						data,
					},
					Element: ({
						ShareModel,
						// DynamicShareModel,
						data,
					}) => {
						const [showShareModel, setShowShareModel] = useState(false);

						return (
							<>
								<button
									title='Share News'
									onClick={() => setShowShareModel(true)}
								>
									Share
								</button>
								<ShareModel
									// DynamicShareModel
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
						// DynamicShareModel,
						data,
					},
					Element: ({
						ShareModel,
						// DynamicShareModel,
						data,
					}) => {
						const [showShareModel, setShowShareModel] = useState(false);

						return (
							<>
								<button
									title='Share News'
									onClick={() => setShowShareModel(true)}
								>
									Share
								</button>
								<ShareModel
									// DynamicShareModel
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
			<DropdownMenu
				// DynamicDropdownMenu
				items={items}
			/>
		</>
	);
};

export default Settings;
