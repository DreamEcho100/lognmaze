import { useContext, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import NewsContext from '@store/NewsContext';
import {
	handleLoadingNewsItemContent,
	HandleLoadingUserVote,
} from '@store/NewsContext/actions';
import UserContext, { UserExistContext } from '@store/UserContext';
import { handleAllClasses } from '@/lib/v1/className';

import classes from './index.module.css';

const DynamicNewsItemModal = dynamic(() => import('../NewsItemModal'), {
	ssr: false,
});

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
	modalOnClick,
	hideFooterSettings,
	modal = {},
	userCtx = {},
	newsCtx = {},
}) => {
	const userState = useMemo(() => userCtx.userState, [userCtx.userState]);
	const userExist = useMemo(() => userCtx.userExist, [userCtx.userExist]);
	const { state, dispatch } = useMemo(
		() => ({ state: newsCtx.state, dispatch: newsCtx.dispatch }),
		[newsCtx.state, newsCtx.dispatch]
	);

	const showModal = useMemo(() => modal.showModal, [modal.showModal]);
	const setShowModal = modal.setShowModal;
	// const { state: userState } = useContext(UserContext);
	// const { userExist } = useContext(UserExistContext);
	// const { state, dispatch } = useContext(NewsContext);

	// const [showModal, setShowModal] = useState(false);

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
		const obj = {
			className: allClasses,
		};

		if (newsItemData?.type === 'article')
			obj.lang = `${newsItemData.iso_language}-${newsItemData.iso_country}`;

		return obj;
	}, [newsItemData.type]);

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
			userExist &&
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
	}, [isLoadingUserVote, userExist]);

	return (
		<section {...articleProps}>
			<Header
				newsItemData={newsItemData}
				detailsType={detailsType}
				isLoadingSkeleton={isLoadingSkeleton}
				setShowModal={setShowModal}
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
				setShowModal={setShowModal}
				// isLoadingContent={isLoadingContent}
			/>
			<footer></footer>
			{modalOnClick && (
				<DynamicNewsItemModal
					showModal={showModal}
					setShowModal={setShowModal}
					articleProps={articleProps}
					newsItemData={newsItemData}
					hideFooterSettings={hideFooterSettings}
					detailsType='content'
				/>
			)}
		</section>
	);
};

const NewsItemParent = (props) => {
	const { state: userState } = useContext(UserContext);
	const { userExist } = useContext(UserExistContext);
	const { state, dispatch } = useContext(NewsContext);

	const [showModal, setShowModal] = useState(false);

	return (
		<NewsItem
			{...props}
			modal={{ showModal, setShowModal }}
			userCtx={{
				userState,
				userExist,
			}}
			newsCtx={{
				state,
				dispatch,
			}}
		/>
	);
};

export default NewsItemParent;
