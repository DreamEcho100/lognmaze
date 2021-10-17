import { useContext, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import NewsContext from '@store/NewsContext';
import {
	handleLoadingNewsItemContent,
	HandleLoadingUserVote,
} from '@store/NewsContext/actions';
import { useUserSharedState } from '@store/UserContext';
import { handleAllClasses } from '@/lib/v1/className';

import classes from './index.module.css';

const DynamicNewsItemModal = dynamic(() => import('../NewsItemModal'), {
	ssr: false,
});

import Details from './Details';
import Header from './Header';

const NewsItem = ({
	detailsType = 'description',
	newsItemData = {},
	isLoadingSkeleton,
	// newsFetchRouteQuery,
	loadingUserVote,
	hideHeaderSettings,
	hideFooterSettings,
	showModal,
	setShowModal,
	articleProps,
}) => {
	const [userState, userDispatch] = useUserSharedState();
	const { state, dispatch } = useContext(NewsContext);

	const [isLoadingUserVote, setIsLoadingUserVote] = useState(!!loadingUserVote);

	useEffect(() => {
		if (showModal && !newsItemData?.content && newsItemData?.news_id) {
			handleLoadingNewsItemContent({
				dispatch,
				news_id: newsItemData.news_id,
			});
		}
	}, [showModal]);

	useEffect(() => {
		if (
			isLoadingUserVote &&
			userState.userExist &&
			newsItemData?.news_id &&
			(parseInt(newsItemData.up_votes_counter) !== 0 ||
				parseInt(newsItemData.down_votes_counter) !== 0)
		) {
			if (!isLoadingUserVote) setIsLoadingUserVote(true);
			HandleLoadingUserVote({
				dispatch,
				news_id: newsItemData.news_id,
				user: userState.user,
				state,
			});
			if (isLoadingUserVote) setIsLoadingUserVote(false);
		}
	}, [isLoadingUserVote, userState.userExist]);

	return (
		<section {...articleProps}>
			{/* {Math.random()} */}
			<Header
				newsItemData={newsItemData}
				detailsType={detailsType}
				isLoadingSkeleton={isLoadingSkeleton}
				setShowModal={setShowModal}
				hideHeaderSettings={hideHeaderSettings}
				// setIsLoadingContent={setIsLoadingContent}
				// isLoadingContent={isLoadingContent}
				// hideHeaderSettings={hideHeaderSettings}
			/>
			<Details
				detailsType={detailsType}
				newsItemType={newsItemData.type}
				details={
					detailsType === 'description' && newsItemData.type === 'article'
						? newsItemData.description
						: newsItemData.content
				}
				newsItemId={newsItemData.news_id}
				isLoadingSkeleton={isLoadingSkeleton}
				setShowModal={setShowModal}
				hideFooterSettings={hideFooterSettings}
				// isLoadingContent={isLoadingContent}
			/>
			<footer></footer>
		</section>
	);
};

const NewsItemParent = ({
	defaultClasses = 'container',
	extraClasses = '',
	className = '',
	modalOnClick,
	...props
}) => {
	const [showModal, setShowModal] = useState(false);

	const allClasses = useMemo(
		() =>
			handleAllClasses({
				classes,
				defaultClasses,
				extraClasses,
				className,
			}),
		[defaultClasses, extraClasses, className]
	);

	const articleProps = useMemo(() => {
		if (props?.newsItemData?.type) {
			const obj = {
				className: allClasses,
			};

			if (props.newsItemData?.type === 'article')
				obj.lang = `${props.newsItemData.iso_language}-${props.newsItemData.iso_country}`;

			return obj;
		}
		return {};
	}, [props?.newsItemData?.type]);

	return (
		<>
			<NewsItem
				{...props}
				showModal={showModal}
				setShowModal={setShowModal}
				articleProps={articleProps}
			/>
			{modalOnClick && (
				<DynamicNewsItemModal
					showModal={showModal}
					setShowModal={setShowModal}
					articleProps={articleProps}
					newsItemData={props.newsItemData}
					// hideFooterSettings={props.hideFooterSettings}
					detailsType='content'
				/>
			)}
		</>
	);
};

export default NewsItemParent;
