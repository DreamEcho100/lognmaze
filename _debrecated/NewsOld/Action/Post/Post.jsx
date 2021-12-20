import { useState } from 'react';

import classes from './Post.module.css';

import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Textarea from '@components/UI/V1/Textarea';
import Button from '@components/UI/V1/Button';

const Post = ({ closeModal, createNews, updateNews, actionType, newsItem }) => {
	const [values, setValues] = useState({
		content: newsItem && newsItem.content ? newsItem.content : '',
	});

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const resetInputs = () => {
		setValues({
			content: '',
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setAfterFormSubmitMessage(() => <></>);
		setBtnsDisabled(true);

		const fieldsCheck = [];

		if (values.content.trim().replace(/\s{2,}/g, '').length < 3)
			fieldsCheck.push('Content is less than 3 characters.');

		if (fieldsCheck.length > 0) {
			setAfterFormSubmitMessage(() => (
				<ul>
					{fieldsCheck.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			));
			setBtnsDisabled(false);
			return;
		}

		let result = {};

		if (actionType === 'create') {
			result = await createNews(values, 'post');
		} else if (actionType === 'update') {
			result = await updateNews(newsItem.type, newsItem, values);
		}

		setBtnsDisabled(false);

		if (result.status === 'error') {
			setAfterFormSubmitMessage(() => <>{result.message}</>);
			return;
		}

		resetInputs();
		closeModal();
	};

	const sharedTextareaProps = (elementProps = {}) => {
		const { minLength = false, maxLength = false } = elementProps;
		const props = {
			extraClasses: classes.textarea,
			className: classes['textarea'],
			required: true,
		};
		if (minLength) props.minLength = minLength;
		if (maxLength) props.maxLength = maxLength;

		if (minLength || maxLength) {
			props.pattern = `.{${minLength || ''},${maxLength || ''}}`;
		}

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

			<div className={classes.warning}>{AfterFormSubmitMessage}</div>

			<FormControl className={classes['form-control']}>
				<Button title='Submit Form' disabled={btnsDisabled} type='submit'>
					submit
				</Button>
			</FormControl>
		</Form>
	);
};

export default Post;
