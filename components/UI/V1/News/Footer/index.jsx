import { useState } from 'react';

import classes from './index.module.css';

import Settings from './Settings';
import Comments from './Comments';

const Footer = ({ data, setData }) => {
	const [showComments, setShowComments] = useState(false);
	const [focusCommentTextarea, setFocusCommentTextarea] = useState(false);

	return (
		<footer>
			<section
				comments={data.comments}
				reactions={data.reactions}
				className={classes.status}
			></section>
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
			/>
			{showComments && (
				<Comments
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
