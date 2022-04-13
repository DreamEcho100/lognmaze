import { FC, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import {
	// IUserAuthenticatedData,
	// IUserBasicData,
	TNewsItemData,
} from '@coreLib/ts/global';

const DynamicComments = dynamic(() => import('./Comments'), {
	ssr: false,
});
// import Settings from './Settings';
import Status from './Status';

interface IProps {
	newsItemData: TNewsItemData;
	hideFooterSettings?: boolean;
}

const NewsItemFooter: FC<IProps> = ({
	newsItemData,
	// userData,
	// isFooterSettingsVisible,
	// handleIsFooterSettingsVisible,
	// hideFooterSettings,
}) => {
	const footerRef = useRef<HTMLDivElement>(null);

	const [isCommentsVisible, setIsCommentsVisible] = useState(false);
	// const [isCommentsCounterVisible, setIsCommentsCounterVisible] = useState(0);
	// const [focusCommentTextarea, setFocusCommentTextarea] = useState(false);

	// const [
	// 	{
	// 		actions: { items: newsItemsActions },
	// 	},
	// ] = useNewsSharedState();

	// const initGetMainComments =
	// 	newsItemsActions[newsItemData.news_id]?.requests?.init?.getMainComments;

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
			{/* {!hideFooterSettings && (
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
