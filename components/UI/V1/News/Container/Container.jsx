import { Fragment, useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './Container.module.css';
// import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';
import BorderClasses from '@components/UI/V1/Border.module.css';

import NewsContext from '@store/NewsContext';
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
	...props
}) => {
	const {
		handleLoadingArticleContent,
		handleSetNewsDataForFirstTime,
		news,
		setNews,
		setIsLoadingUserVote,
		setIsLoadingContent,
		isLoadingUserVote,
		isLoadingContent,
	} = useContext(NewsContext);

	const [showModal, setShowModal] = useState(false);

	const allClasses = handleAllClasses({
		classes,
		defaultClasses: `${defaultClasses}${
			props.containerType !== 'sub' ? ' container-max-width' : ''
		}`,
		extraClasses,
		className,
	});

	const articleProps = {
		className: classes['container'],
	};

	useEffect(() => {
		if (showModal && !news.content) {
			handleLoadingArticleContent();
		}
	}, [showModal]);

	useEffect(() => {
		if (props.containerType !== 'sub') {
			handleSetNewsDataForFirstTime(props.data);
		}
	}, []);

	useEffect(() => {
		if (props.loadingUserVote && props.isModalOnView) {
			setIsLoadingUserVote(true);
		}
	}, []);

	if (Object.keys(news).length === 0) {
		return <article />;
	}

	if (news.type === 'article')
		articleProps.lang = `${news.iso_language}-${news.iso_country}`;

	return (
		<>
			<ContainerItems
				articleProps={{
					...articleProps,
					className: `${allClasses} ${articleProps.className}`,
				}}
				data={news}
				setData={setNews}
				setShowModal={setShowModal}
				detailsType={detailsType}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingUserVote={isLoadingUserVote}
				isLoadingContent={isLoadingContent}
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
							data={news}
							setData={setNews}
							setShowModal={setShowModal}
							isModalOnView={showModal}
							setIsLoadingContent={setIsLoadingContent}
							isLoadingUserVote={isLoadingUserVote}
							isLoadingContent={isLoadingContent}
							detailsType='content'
						/>
					</Fragment>
				</Modal>
			)}
		</>
	);
};

export default Container;
