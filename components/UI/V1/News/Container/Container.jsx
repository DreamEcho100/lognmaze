import { Fragment, useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './Container.module.css';
// import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';
import BorderClasses from '@components/UI/V1/Border.module.css';

import NewsContextTest from '@store/NewsContextTest';
import { handleLoadingNewsItemContent } from '@store/NewsContextTest/actions';
import { handleAllClasses } from '../../utils/index';

// const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));

import Modal from '@components/UI/V1/Modal';

import ContainerItems from './ContainerItems';

import Button from '@components/UI/V1/Button';

const Container = ({
	defaultClasses = 'container',
	extraClasses = '',
	className = '',
	detailsType = 'description',
	newsItem,
	...props
}) => {
	console.log('newsItem', newsItem);
	const { /* state, */ dispatch /* , types */ } = useContext(NewsContextTest);

	const [showModal, setShowModal] = useState(false);

	const articleProps = {
		className: classes['container'],
	};

	const allClasses = handleAllClasses({
		classes,
		defaultClasses: `${defaultClasses}${
			props.containerType !== 'sub' ? ' container-max-width' : ''
		}`,
		extraClasses,
		className,
	});

	if (Object.keys(newsItem).length === 0) {
		return <article />;
	}

	if (newsItem.type === 'article')
		articleProps.lang = `${newsItem.iso_language}-${newsItem.iso_country}`;

	useEffect(async () => {
		if (
			showModal &&
			!newsItem.content
			// && props.containerType === 'sub'
		) {
			await handleLoadingNewsItemContent({
				dispatch,
				news_id: newsItem.news_id,
			});
			// handleLoadingArticleContent();
		}
	}, [showModal]);

	return (
		<>
			<ContainerItems
				articleProps={{
					...articleProps,
					className: `${allClasses} ${articleProps.className}`,
				}}
				newsItem={newsItem}
				setShowModal={setShowModal}
				detailsType={detailsType}
				// setIsLoadingContent={setIsLoadingContent}
				// isLoadingUserVote={isLoadingUserVote}
				// isLoadingContent={isLoadingContent}
			/>

			{props.modalOnClick && (
				<Modal
					// DynamicModal
					showModal={showModal}
					setShowModal={setShowModal}
					click={() => setShowModal(false)}
					CloseButtonElement={(props) => (
						<Button title='Close' {...props}>
							Close
						</Button>
					)}
					modelClasses={{
						'modal-wrapper': { width: '90%', maxWidth: 'none' },
						'modal-container': { background: 'rgba(255, 255, 255)' },
					}}
				>
					<Fragment key='header'>
						{/* <Header data={data} setData={setData} /> */}
					</Fragment>
					<Fragment key='body'>
						<ContainerItems
							className={`${BorderClasses['border-2']}`}
							articleProps={articleProps}
							newsItem={newsItem}
							setData={() => {}}
							setShowModal={setShowModal}
							// isContainerContentOnView={showModal}
							// setIsLoadingContent={setIsLoadingContent}
							// isLoadingUserVote={isLoadingUserVote}
							// isLoadingContent={isLoadingContent && showModal}
							detailsType='content'
						/>
					</Fragment>
				</Modal>
			)}
		</>
	);

	/*
	const {
		handleLoadingArticleContent,
		handleSetNewsDataForFirstTime,
		newsItem,
		setNews,
		setIsLoadingUserVote,
		setIsLoadingContent,
		isLoadingUserVote,
		isLoadingContent,
	} = useContext(NewsContext);

	useEffect(() => {
		if (props.containerType !== 'sub') {
			handleSetNewsDataForFirstTime(props.data);
		}
	}, []);

	useEffect(() => {
		if (props.loadingUserVote && props.isContainerContentOnView) {
			setIsLoadingUserVote(true);
		}
	}, []);
	*/
};

export default Container;
