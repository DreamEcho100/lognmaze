import { useEffect, useRef, useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './index.module.css';

// const DynamicComments = dynamic(() => import('./Comments'));

import Comments from './Comments';
import Settings from './Settings';
import Status from './Status';

const Footer = ({ newsItem, setData, isLoadingUserVote }) => {
	if (!newsItem?.news_id) {
		return <></>;
	}

	const footerRef = useRef();

	const [showComments, setShowComments] = useState(false);
	const [showCommentsCounter, setShowCommentsCounter] = useState(0);
	const [focusCommentTextarea, setFocusCommentTextarea] = useState(false);

	useEffect(() => {
		if (!showComments) {
			setShowCommentsCounter((prev) => prev + 1);

			if (showCommentsCounter === 0) return;

			footerRef.current.scrollIntoView();
		}
	}, [showComments]);

	return (
		<footer ref={footerRef}>
			<Status
				newsItem={newsItem}
				showComments={showComments}
				setShowComments={setShowComments}
			/>
			<Settings
				newsItem={newsItem}
				comments={newsItem.comments}
				user_vote_type={newsItem.user_vote_type}
				setData={setData}
				setShowComments={setShowComments}
				setFocusCommentTextarea={setFocusCommentTextarea}
				showComments={showComments}
				focusCommentTextarea={focusCommentTextarea}
				isLoadingUserVote={isLoadingUserVote}
			/>
			{showComments && (
				<Comments
					// DynamicComments
					newsItem={newsItem}
					setData={setData}
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
