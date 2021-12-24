import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/NewsContext';
import {
	handleLoadingNewsItemContent,
	HandleLoadingUserVote,
} from '@store/NewsContext/actions';
import { handleAllClasses } from '@lib/v1/className';

import classes from './index.module.css';

// const DynamicNewsItemModal = dynamic(() => import('../NewsItemModal'), {
// 	ssr: false,
// });
import NewsItemModal from '../NewsItemModal';

import Details from './Details';
import Header from './Header';

const NewsItem = ({
	defaultClasses = 'container',
	extraClasses = '',
	className = '',
	detailsType = 'description',
	newsItemData = {},
	isLoadingSkeleton,
	// newsFetchRouteQuery,
	loadingUserVote,
	hideHeaderSettings,
	hideFooterSettings,
	modalOnClick,
}) => {
	const [userState, userDispatch] = useUserSharedState();
	const [newsState, newsDispatch] = useNewsSharedState();

	const [showModal, setShowModal] = useState(false);

	const [isLoadingUserVote, setIsLoadingUserVote] = useState(!!loadingUserVote);

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
		if (newsItemData?.type) {
			const obj = {
				className: allClasses,
			};

			if (newsItemData?.type === 'article')
				obj.lang = `${newsItemData.iso_language}-${newsItemData.iso_country}`;

			return obj;
		}
		return {};
	}, [
		newsItemData?.type,
		allClasses,
		newsItemData.iso_country,
		newsItemData.iso_language,
	]);

	useEffect(() => {
		if (showModal && !newsItemData?.content && newsItemData?.news_id) {
			handleLoadingNewsItemContent({
				newsDispatch,
				news_id: newsItemData.news_id,
			});
		}
	}, [showModal, newsDispatch, newsItemData?.content, newsItemData.news_id]);

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
				newsDispatch,
				news_id: newsItemData.news_id,
				user: userState.user,
			});
			if (isLoadingUserVote) setIsLoadingUserVote(false);
		}
	}, [
		isLoadingUserVote,
		userState.userExist,
		newsDispatch,
		newsItemData.down_votes_counter,
		newsItemData.news_id,
		newsItemData.up_votes_counter,
		userState.user,
	]);

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
				isLoadingContent={newsItemData.isLoadingContent}
			/>
			<footer></footer>
			{modalOnClick && (
				<NewsItemModal
					showModal={showModal}
					setShowModal={setShowModal}
					articleProps={articleProps}
					newsItemData={newsItemData}
					// hideFooterSettings={hideFooterSettings}
					detailsType='content'
				/>
			)}
		</section>
	);
};

export default NewsItem;
