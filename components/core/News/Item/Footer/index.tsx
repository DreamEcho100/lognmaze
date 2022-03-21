import {
	FC,
	// useEffect,
	useRef,
	useState,
} from 'react';
import dynamic from 'next/dynamic';

import { TNewsItemData } from '@coreLib/ts/global';
import { VISITOR_PROFILE_OWNER } from '@coreLib/constants';
import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/NewsContext';
import { useUserProfilePageSharedState } from '@store/ProfilePageContext';

const DynamicComments = dynamic(() => import('./Comments'));
// import Settings from './Settings';
import Status from './Status';

interface IProps {
	newsItemData: TNewsItemData;
	isFooterSettingsVisible: boolean;
	handleIsFooterSettingsVisible: (isFooterSettingsVisible: boolean) => void;
}

const NewsItemFooter: FC<IProps> = ({
	newsItemData,
	isFooterSettingsVisible,
	handleIsFooterSettingsVisible,
}) => {
	const footerRef = useRef<HTMLDivElement>(null);

	const [isCommentsVisible, setIsCommentsVisible] = useState(false);
	const [isCommentsCounterVisible, setIsCommentsCounterVisible] = useState(0);
	// const [focusCommentTextarea, setFocusCommentTextarea] = useState(false);

	const [
		{
			actions: { items: newsItemsActions },
		},
		newsDispatch,
	] = useNewsSharedState();

	const initGetMainComments =
		newsItemsActions[newsItemData.news_id]?.requests?.init?.getMainComments;

	const [
		{
			data: { user: userData },
		},
		userDispatch,
	] = useUserSharedState();
	const [{ data: profilePageData }, profilePageDispatch] =
		useUserProfilePageSharedState();

	const profilePageVisitorStatus = profilePageData?.visitorStatus;

	const profilePageUserData =
		profilePageVisitorStatus === VISITOR_PROFILE_OWNER && userData
			? userData
			: profilePageData?.user;

	const handleSetIsCommentsVisible = (isCommentsVisible?: boolean) => {
		if (isCommentsVisible) return setIsCommentsVisible(isCommentsVisible);
		setIsCommentsVisible((prevState) => !prevState);
	};

	// useEffect(() => {
	// 	setIsCommentsCounterVisible((prev) => prev + 1);
	// 	setIsCommentsVisible(false);
	// 	if (!isCommentsVisible || !newsItemData.news_id || !footerRef.current || isCommentsCounterVisible === 0) {

	// 		// if (isCommentsCounterVisible === 0) return;

	// 		if (!footerRef.current && footerRef?.current?.scrollIntoView)
	// 			footerRef.current.scrollIntoView();
	// 		console.log(isCommentsCounterVisible);
	// 	}
	// }, [isCommentsVisible, newsItemData.news_id]);
	// isCommentsVisible, newsItemData.news_id, isCommentsCounterVisible

	if (!newsItemData.news_id) {
		return <></>;
	}

	return (
		<footer ref={footerRef}>
			<Status
				newsItemData={newsItemData}
				isCommentsVisible={isCommentsVisible}
				handleSetIsCommentsVisible={handleSetIsCommentsVisible}
			/>
			{/* {!isFooterSettingsVisible && (
				<Settings
					newsItemData={newsItemData}
					comments={newsItemData.comments}
					user_vote_type={newsItemData.user_vote_type}
					setIsCommentsVisible={setIsCommentsVisible}
					setFocusCommentTextarea={setFocusCommentTextarea}
					isCommentsVisible={isCommentsVisible}
					focusCommentTextarea={focusCommentTextarea}
					isLoadingUserVote={isLoadingUserVote}
				/>
			)} */}
			{isCommentsVisible && (
				<DynamicComments
					newsItemComments={newsItemData.comments || []}
					// className={classes.comments}
					handleSetIsCommentsVisible={handleSetIsCommentsVisible}
					// setFocusCommentTextarea={setFocusCommentTextarea}
					isCommentsVisible={isCommentsVisible}
					newsItemData={newsItemData} // focusCommentTextarea={focusCommentTextarea}
				/>
			)}
		</footer>
	);
};

export default NewsItemFooter;
