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
	hideFooterSettings?: boolean;
	// isThisAModal?: boolean;

	// newsItemData: TNewsItemData;
	news_id: TNewsItemData['news_id'];
	comments_counter: TNewsItemData['comments_counter'];
	comments: TNewsItemData['comments'];
	hit_comments_limit: TNewsItemData['hit_comments_limit'];
}

const NewsItemFooter: FC<IProps> = ({
	// newsItemData,
	news_id,
	comments_counter,
	comments,
	hit_comments_limit,
	// isThisAModal,
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
	// 	newsItemsActions[news_id]?.requests?.init?.getMainComments;

	const handleSetIsCommentsVisible = (isCommentsVisible?: boolean) => {
		if (isCommentsVisible) return setIsCommentsVisible(isCommentsVisible);
		setIsCommentsVisible((prevState) => !prevState);
	};

	// useEffect(() => {
	// 	setIsCommentsCounterVisible((prev) => prev + 1);
	// 	setIsCommentsVisible(false);
	// 	if (!isCommentsVisible || !news_id || !footerRef.current || isCommentsCounterVisible === 0) {

	// 		// if (isCommentsCounterVisible === 0) return;

	// 		if (!footerRef.current && footerRef?.current?.scrollIntoView)
	// 			footerRef.current.scrollIntoView();
	// 	}
	// }, [isCommentsVisible, news_id]);
	// isCommentsVisible, news_id, isCommentsCounterVisible

	if (!news_id) {
		return <></>;
	}

	return (
		<footer ref={footerRef}>
			<Status
				comments_counter={comments_counter}
				isCommentsVisible={isCommentsVisible}
				handleSetIsCommentsVisible={handleSetIsCommentsVisible}
			/>
			{/* {!hideFooterSettings && (
				<Settings
					newsItemData={newsItemData}
					comments={comments}
					user_vote_type={user_vote_type}
					setIsCommentsVisible={setIsCommentsVisible}
					setFocusCommentTextarea={setFocusCommentTextarea}
					isCommentsVisible={isCommentsVisible}
					focusCommentTextarea={focusCommentTextarea}
					isLoadingUserVote={isLoadingUserVote}
				/>
			)} */}
			{isCommentsVisible && (
				<DynamicComments
					newsItemComments={comments || []}
					// className={classes.comments}
					handleSetIsCommentsVisible={handleSetIsCommentsVisible}
					// setFocusCommentTextarea={setFocusCommentTextarea}
					isCommentsVisible={isCommentsVisible}
					// newsItemData={newsItemData} // focusCommentTextarea={focusCommentTextarea}
					news_id={news_id}
					comments_counter={comments_counter}
					hit_comments_limit={hit_comments_limit}
					comments={comments}
				/>
			)}
		</footer>
	);
};

export default NewsItemFooter;
