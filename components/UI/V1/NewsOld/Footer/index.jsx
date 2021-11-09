import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import classes from './index.module.css';

const DynamicComments = dynamic(() => import('./Comments'));
import Settings from './Settings';
import Status from './Status';

const Footer = ({
	isLoadingSkeleton,
	hideFooterSettings,
	newsItem = {},
	isLoadingUserVote,
}) => {
	const footerRef = useRef();

	const [showComments, setShowComments] = useState(false);
	const [showCommentsCounter, setShowCommentsCounter] = useState(0);
	const [focusCommentTextarea, setFocusCommentTextarea] = useState(false);

	useEffect(() => {
		if (!newsItem.news_id) return;

		if (!showComments) {
			setShowCommentsCounter((prev) => prev + 1);

			if (showCommentsCounter === 0) return;

			footerRef.current.scrollIntoView();
		}
	}, [showComments, newsItem.news_id]);

	if (!isLoadingSkeleton && !newsItem.news_id) {
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
					newsItem={newsItem}
					showComments={showComments}
					setShowComments={setShowComments}
				/>
			)}
			{!isLoadingSkeleton && !hideFooterSettings && (
				<Settings
					newsItem={newsItem}
					comments={newsItem.comments}
					user_vote_type={newsItem.user_vote_type}
					setShowComments={setShowComments}
					setFocusCommentTextarea={setFocusCommentTextarea}
					showComments={showComments}
					focusCommentTextarea={focusCommentTextarea}
					isLoadingUserVote={isLoadingUserVote}
				/>
			)}
			{!isLoadingSkeleton && showComments && (
				<DynamicComments
					newsItem={newsItem}
					comments={newsItem.comments}
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
