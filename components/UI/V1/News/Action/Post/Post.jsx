import { Fragment, useContext, useState } from 'react';

import classes from './Post.module.css';
import BoxShadowClasses from '@/components/UI/V1/BoxShadow.module.css';

import UserContext from '@/store/UserContext';

import Form from '@/components/UI/V1/Form/Form';
import FormControl from '@/components/UI/V1/FormControl/FormControl';
import FormLabel from '@/components/UI/V1/FormLabel/FormLabel';
import Textarea from '@/components/UI/V1/Textarea/Textarea';
import Button from '@/components/UI/V1/Button/Button';

const Post = ({ closeModal, fetcher, actionType, data, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [content, setContent] = useState(
		data && data.content ? data.content : ''
	);

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const resetInputs = () => {
		setContent('');
	};

	const handleSubmit = async (event) => {
		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);

		event.preventDefault();

		const bodyObj = {
			type: 'post',
			content,
		};

		if (actionType === 'create') {
		} else if (actionType === 'update') {
			bodyObj.newsPostId = data.id;
		}

		try {
			await fetcher({ bodyObj, token: user.token })
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						console.error(message);
						setBtnsDisabled(false);
						setAfterFormSubmitMessage(message);
						return;
					}
					setBtnsDisabled(false);
					if (actionType === 'create') {
						resetInputs();
					} else if (actionType === 'update') {
						setData({
							...data,
						});

						setTimeout(() => closeModal(), 100);
					}
				});
		} catch (error) {
			console.error(error);
			setAfterFormSubmitMessage(error.message);
			setBtnsDisabled(false);
		}
	};

	return (
		<Form
			extraClasses={classes.form}
			onSubmit={handleSubmit}
			className={classes.form}
		>
			<FormControl className={classes['form-control']}>
				<FormLabel htmlFor='post-content'>Content: </FormLabel>
				<Textarea
					className={`${classes['form-text-area']} ${classes.content}`}
					id='post-content'
					required
					value={content}
					minLength={100}
					onChange={(event) => setContent(event.target.value)}
				/>
			</FormControl>
			{afterFormSubmitMessage.length !== 0 && (
				<div className={classes.warning}>
					<p>{afterFormSubmitMessage}</p>
				</div>
			)}
			<FormControl className={classes['form-control']}>
				<Button disabled={btnsDisabled} type='submit'>
					submit
				</Button>
			</FormControl>
		</Form>
	);
};

export default Post;
