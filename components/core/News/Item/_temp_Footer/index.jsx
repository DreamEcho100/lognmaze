import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import classes from './styles.module.css';

const DynamicComments = dynamic(() => import('./Comments'));
// import Settings from './Settings';
import Status from './Status';

const Footer = ({
	isLoadingSkeleton,
	hideFooterSettings,
	newsItemData = {},
	isLoadingUserVote,
}) => {
	const footerRef = useRef();

	const [showComments, setShowComments] = useState(false);
	const [showCommentsCounter, setShowCommentsCounter] = useState(0);
	const [focusCommentTextarea, setFocusCommentTextarea] = useState(false);

	useEffect(() => {
		if (!newsItemData.news_id) return;

		if (!showComments) {
			setShowCommentsCounter((prev) => prev + 1);

			if (showCommentsCounter === 0) return;

			footerRef.current.scrollIntoView();
		}
	}, [showComments, newsItemData.news_id]);

	if (!isLoadingSkeleton && !newsItemData.news_id) {
		return <></>;
	}

	return (
		<footer
			className={`${classes.footer} ${
				isLoadingSkeleton ? `${classes.isLoadingSkeleton} skeleton-loading` : ''
			}`}
			ref={footerRef}
		>
			{!isLoadingSkeleton && (
				<Status
					newsItemData={newsItemData}
					showComments={showComments}
					setShowComments={setShowComments}
				/>
			)}
			{/* {!isLoadingSkeleton && !hideFooterSettings && (
				<Settings
					newsItemData={newsItemData}
					comments={newsItemData.comments}
					user_vote_type={newsItemData.user_vote_type}
					setShowComments={setShowComments}
					setFocusCommentTextarea={setFocusCommentTextarea}
					showComments={showComments}
					focusCommentTextarea={focusCommentTextarea}
					isLoadingUserVote={isLoadingUserVote}
				/>
			)} */}
			{!isLoadingSkeleton && showComments && (
				<DynamicComments
					newsItemData={newsItemData}
					comments={newsItemData.comments}
					className={classes.comments}
					setShowComments={setShowComments}
					setFocusCommentTextarea={setFocusCommentTextarea}
					showComments={showComments}
					focusCommentTextarea={focusCommentTextarea}
				/>
			)}
		</footer>
	);
};

export default Footer;
