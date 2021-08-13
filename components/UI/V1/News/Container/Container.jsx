import { Fragment, useContext, useEffect, useState } from 'react';

import classes from './Container.module.css';
import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';
import BorderClasses from '@components/UI/V1/Border.module.css';

import NewsContext from '@store/NewsContext';
import { handleAllClasses } from '../../utils/index';

import ContainerItems from './ContainerItems';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';

const Container = ({
	defaultClasses = `container`,
	extraClasses = '',
	className = '',
	detailsType = 'description',
	...props
}) => {
	const {
		handleLoadindArticleContent,
		handleSetNewsDataForFirstTime,
		news,
		setNews,
		setIsLoadingReactions,
		setIsLoadingContent,
		isLoadingReactions,
		isLoadingContent,
		...NewsCxt
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
		className: `${classes['container']} ${BoxShadowClasses['box-shadow']} ${BorderClasses['border-2']}`,
	};

	useEffect(() => {
		if (showModal && !news.content) {
			handleLoadindArticleContent();
		}
	}, [showModal]);

	// if (isLoading) {
	// 	return <article>Loading...</article>;
	// }

	useEffect(() => {
		// handleSetNewsDataForFirstTime(data);
		if (props.containerType !== 'sub') {
			handleSetNewsDataForFirstTime(props.data);
		}

		// if (props.containerType === 'sub' && !news.content) {
		// 	NewsCxt.setIsLoadingContent(true);
		// }
	}, []);

	// const [ReactionsLoaded, setReactionsLoaded] = useState(false);

	useEffect(() => {
		if (
			props.loadReactions
			// && !ReactionsLoaded
			// && news.news_id
		) {
			setIsLoadingReactions(true); // props.loadReactions
			// setReactionsLoaded(true);
		}
	}, []);

	if (Object.keys(news).length === 0) {
		return <article style={{ minHeight: '100vh' }}></article>;
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
				isLoadingReactions={isLoadingReactions}
				isLoadingContent={isLoadingContent}
			/>

			{props.modalOnClick && (
				<Modal
					showModal={showModal}
					setShowModal={setShowModal}
					click={() => setShowModal(false)}
					CloseButtonElement={(props) => (
						<Button type='button' {...props}>
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
							articleProps={articleProps}
							data={news}
							setData={setNews}
							setShowModal={setShowModal}
							setIsLoadingContent={setIsLoadingContent}
							isLoadingReactions={isLoadingReactions}
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
