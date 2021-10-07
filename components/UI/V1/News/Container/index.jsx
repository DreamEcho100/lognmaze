import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import classes from './index.module.css';

import NewsContext from '@store/NewsContext';
import {
	handleLoadingNewsItemContent,
	HandleLoadingUserVote,
} from '@store/NewsContext/actions';
import UserContext from '@store/UserContext';
import { handleAllClasses } from '@/lib/v1/className';

const DynamicDeleteNewsModal = dynamic(() =>
	import('@components/UI/V1/Modal/DeleteNews')
);
import ContainerItems from './ContainerItems';

const Container = ({
	defaultClasses = 'container',
	extraClasses = '',
	className = '',
	detailsType = 'description',
	newsItem,
	isLoadingSkeleton,
	...props
}) => {
	const { state: userState } = useContext(UserContext);
	const { state, dispatch } = useContext(NewsContext);

	const [showModal, setShowModal] = useState(false);
	const [isLoadingUserVote, setIsLoadingUserVote] = useState(
		!!props.loadingUserVote
	);

	const articleProps = {
		className: classes['container'],
	};

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	if (newsItem?.type === 'article')
		articleProps.lang = `${newsItem.iso_language}-${newsItem.iso_country}`;

	useEffect(() => {
		if (showModal && !newsItem?.content && newsItem?.news_id) {
			handleLoadingNewsItemContent({
				dispatch,
				news_id: newsItem.news_id,
			});
		}
	}, [showModal]);

	useEffect(() => {
		if (
			isLoadingUserVote &&
			userState.userExist &&
			newsItem?.news_id &&
			(parseInt(newsItem.up_votes_counter) !== 0 ||
				parseInt(newsItem.down_votes_counter) !== 0)
		) {
			if (!isLoadingUserVote) setIsLoadingUserVote(true);
			HandleLoadingUserVote({
				dispatch,
				news_id: newsItem.news_id,
				user: userState.user,
				state,
			});
			if (isLoadingUserVote) setIsLoadingUserVote(false);
		}
	}, [isLoadingUserVote, userState.userExist]);

	return (
		<>
			<ContainerItems
				articleProps={{
					...articleProps,
					className: `${allClasses} ${articleProps.className}`,
				}}
				isLoadingSkeleton={isLoadingSkeleton}
				newsItem={newsItem}
				setShowModal={setShowModal}
				detailsType={detailsType}
				isLoadingUserVote={isLoadingUserVote}
				hideFooterSettings={props.hideFooterSettings}
			/>

			{!isLoadingSkeleton && props.modalOnClick && (
				<DynamicDeleteNewsModal
					showModal={showModal}
					setShowModal={setShowModal}
					articleProps={articleProps}
					newsItem={newsItem}
					hideFooterSettings={props.hideFooterSettings}
				/>
			)}
		</>
	);
};

export default Container;
