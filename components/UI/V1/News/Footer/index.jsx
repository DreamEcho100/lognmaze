import { useEffect, useRef, useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './index.module.css';

// const DynamicComments = dynamic(() => import('./Comments'));

import Comments from './Comments';
import Settings from './Settings';
import Status from './Status';

const Footer = ({ data, setData, isLoadingReactions }) => {
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
				data={data}
				showComments={showComments}
				setShowComments={setShowComments}
			/>
			<Settings
				data={data}
				comments={data.comments}
				reactions={data.reactions}
				user_reaction={data.user_reaction}
				setData={setData}
				setShowComments={setShowComments}
				setFocusCommentTextarea={setFocusCommentTextarea}
				showComments={showComments}
				focusCommentTextarea={focusCommentTextarea}
				isLoadingReactions={isLoadingReactions}
			/>
			{showComments && (
				<Comments
					// DynamicComments
					data={data}
					setData={setData}
					comments={data.comments}
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
