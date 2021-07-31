import { Fragment, useContext, useState } from 'react';

import classes from './Post.module.css';
import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import UserContext from '@store/UserContext';

import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl/FormControl';
import Label from '@components/UI/V1/Label';
import Textarea from '@components/UI/V1/Textarea';
import Button from '@components/UI/V1/Button';

const Post = ({ closeModal, fetcher, actionType, data, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [values, setValues] = useState({
		content: data && data.content ? data.content : '',
	});

	const [formMessage, setFormMessage] = useState('');
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const resetInputs = () => {
		setValues({
			content: '',
		});
	};

	const handleSubmit = async (event) => {
		setFormMessage('');
		setBtnsDisabled(true);

		event.preventDefault();

		let bodyObj = {
			type: 'post',
		};
		let fetchMethod;

		if (actionType === 'create') {
			fetchMethod = 'POST';
			bodyObj = {
				...bodyObj,
				...values,
			};
		} else if (actionType === 'update') {
			fetchMethod = 'PATCH';
			bodyObj = {
				...bodyObj,
				news_id: data.news_id,
				news_data: {},
			};

			if (values.content.trim() !== data.content.trim()) {
				bodyObj.news_data.content = values.content;
			}

			if (Object.keys(bodyObj.news_data).length === 0)
				return setFormMessage('There no change in the data!');
		}

		try {
			await fetcher({ bodyObj, token: user.token, method: fetchMethod })
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						console.error(message);
						setBtnsDisabled(false);
						setFormMessage(message);
						return;
					}
					setBtnsDisabled(false);
					if (actionType === 'create') {
						resetInputs();
					} else if (actionType === 'update') {
						setData((prev) => ({
							...prev,
							...values,
							updated_on: new Date().toUTCString(),
						}));

						setTimeout(() => closeModal(), 100);
					}
				});
		} catch (error) {
			console.error(error);
			setFormMessage(error.message);
			setBtnsDisabled(false);
		}
	};

	const sharedTextareaProps = (
		{ minLength, maxLength } = { minLength: false, maxLength: false }
	) => {
		const props = {
			extraClasses: classes.textarea,
			className: classes['textarea'],
			required: true,
		};
		if (minLength) props.minLength = minLength;
		if (maxLength) props.maxLength = maxLength;
		return props;
	};

	return (
		<Form
			extraClasses={classes.form}
			onSubmit={handleSubmit}
			className={classes.form}
		>
			<FormControl className={classes['form-control']}>
				<Label htmlFor='content'>Content: </Label>
				<Textarea
					name='content'
					id='content'
					value={values.content}
					onChange={(event) =>
						setValues((prev) => ({
							...prev,
							[event.target.name]: event.target.value,
						}))
					}
					{...sharedTextareaProps({
						minLength: 3,
					})}
				/>
			</FormControl>
			{formMessage.length !== 0 && (
				<div className={classes.warning}>
					<p>{formMessage}</p>
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
