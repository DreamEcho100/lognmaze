import { useContext, useEffect, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import DropdownMenu from '@components/UI/V1/DropdownMenu';

const Comment = ({ comment, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);
	
	const [items, setItems] = useState([
		{
			props: {
				handleDeleteComment,
				type: comment.type,
				news_id: comment.news_id,
			},
			Element: () => (
				<button
					onClick={() => handleDeleteComment(type, news_id)}
				>
					Delete
				</button>)
		}
	]);

	const handleDeleteComment = async (type, news_id) => {
		// setDisbleDeleteCommentButton(true);

		const body = JSON.stringify({
			type,
			news_id,
		});

		const {
			status,
			message,
			data: comment,
		} = await fetch('/api/v1/news/comments/comment', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${user.token}`,
			},
			body,
		})
			.then((respone) => respone.json())
			.catch((error) => {
				return { ...error, status: 'error' };
			});

		if (status === 'error') {
			console.error(message);
			// setDisbleDeleteCommentButton(false);
			return;
		}

		setData((prev) => ({
			...prev,
			comments_count: prev.comments_count - 1,
			comments: prev.comments.filter((comment) => comment.news_id !== news_id),
		}));
	};

	return (
		<div>
			<p>{comment.content}</p>
			<small>{comment.created_at}</small>
			<small>{comment.updated_on}</small>
			<DropdownMenu items={items}/>
		</div>
	);
};

export default Comment;
