import { useContext, useEffect, useState } from 'react';

import classes from './Article.module.css';
import BoxShadowClasses from '@/components/UI/V1/BoxShadow.module.css';

import ISO639_1LanguageCodes from '../../../../../../data/ISO639_1LanguageCodes.json';
import ISOCountryCodesCountriesISOCode from '../../../../../../data/ISOCountryCodesCountriesISOCode.json';

import UserContext from '@/store/UserContext';

import Form from '@/components/UI/V1/Form/Form';
import FormControl from '@/components/UI/V1/FormControl/FormControl';
import FormControls from '@/components/UI/V1/FormControls/FormControls';
import Label from '@/components/UI/V1/Label/Label';
import Input from '@/components/UI/V1/Input/Input';
import Textarea from '@/components/UI/V1/Textarea/Textarea';
import Button from '@/components/UI/V1/Button/Button';

const iso_languagesKeys = (() => {
	return Object.keys(ISO639_1LanguageCodes);
})();
const iso_countriesKeys = (() => {
	return Object.keys(ISOCountryCodesCountriesISOCode);
})();
// return keys.map((item, index) => (
// 	<option value={ISO639_1LanguageCodes[item]}>{item}</option>
// ));

const Article = ({ closeModal, fetcher, actionType, data, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [values, setValues] = useState({
		format_type: data && data.format_type ? data.format_type : 'normal',
		title: data && data.title ? data.title : '',
		slug: data && data.slug ? data.slug : '',
		iso_language: data && data.iso_language ? data.iso_language : 'en',
		iso_country: data && data.iso_country ? data.iso_country : 'US',
		tags: data && data.tags && data.tags.length ? data.tags : [],
		image: data && data.image ? data.image : '',
		description: data && data.description ? data.description : '',
		content: data && data.content ? data.content : '',
	});

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const resetInputs = () => {
		setValues({
			format_type: 'normal',
			title: '',
			slug: '',
			iso_language: 'en',
			iso_country: 'US',
			tags: '',
			image: '',
			description: '',
			content: '',
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);

		let bodyObj;
		const tags_array = [];

		if (actionType === 'create') {
			bodyObj = {
				type: 'article',
				author_user_name_id: user.user_name_id,
				...values,
			};
		} else if (actionType === 'update') {
			const oldTags = data.tags;
			const newTags = tags.toLowerCase().trim().split(/\s+/);

			const removedTags = [];
			const addedTags = [];

			oldTags.forEach((item) => {
				if (!newTags.includes(item)) {
					removedTags.push(item);
				} else {
					tags_array.push(item);
				}
			});

			newTags.forEach((item) => {
				if (!oldTags.includes(item)) {
					addedTags.push(item);
					tags_array.push(item);
				}
			});

			bodyObj = {
				type: 'article',
				news_id: data.id,
				data: {
					format_type,
					title,
					slug,
					image,
					description,
					content,
				},
				tags: {
					removed: removedTags,
					added: addedTags,
				},
				/*
{
  "type": "article",
      "news_id": "5ca95b28-1343-4471-ac07-e675e0445209",
  "news_data": {
      "title": "'Test Title (update succefully)'",
      "slug": "'test-title (update succefully)'"
  },
  "tags": {
      "removed": ["T", "Test"],
      "added": ["Testing (update succefully)"]
  }
}
*/
			};
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
							tags: tags_array,
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

	const sharedInputProps = (
		{ minLength, maxLength } = { minLength: false, maxLength: false }
	) => {
		const props = {
			extraClasses: classes.input,
			className: classes['input'],
			required: true,
		};
		if (minLength) props.minLength = minLength;
		if (maxLength) props.maxLength = maxLength;
		return props;
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
				<Label htmlFor='format_type'>Format Type: </Label>
				<select
					name='format_type'
					id='format_type'
					value={values.format_type}
					onChange={(event) =>
						setValues((prev) => ({
							...prev,
							[event.target.name]: event.target.value,
						}))
					}
					required
				>
					<option value='normal'>normal</option>
					<option value='md'>md</option>
				</select>
			</FormControl>

			<FormControl className={classes['form-control']}>
				<Label htmlFor='title'>Title: </Label>
				<Input
					name='title'
					id='title'
					value={values.title}
					onChange={(event) => {
						return setValues((prev) => ({
							...prev,
							[event.target.name]: event.target.value,
							slug: event.target.value
								.toLowerCase()
								.replace(/[^\w\s-\_]/gi, '')
								.split(/[\s-]+/)
								.join('-')
								.replace(/(\_{2,})/gi, '_')
								.replace(/^[^\w]/gi, '')
								.replace(/-$/, ''),
						}));
					}}
					{...sharedInputProps({
						minLength: 10,
						maxLength: 255,
					})}
				/>
			</FormControl>

			<FormControl className={classes['form-control']}>
				<Label htmlFor='slug'>Slug: </Label>
				<Input
					name='slug'
					id='slug'
					value={values.slug}
					// setValues={setValues}
					onChange={(event) => {
						return setValues((prev) => ({
							...prev,
							[event.target.name]: event.target.value
								.toLowerCase()
								.replace(/(\s)/gi, '')
								.replace(/(-{2,})/gi, '-')
								.replace(/(_{2,})/gi, '_')
								.replace(/^-/, '')
								.replace(/[^\w-\_]/gi, ''),
							/*
								.toLowerCase()
								.replace(/[^\w\s-\_]/gi, '')
								.split(/[\s-]+/)
								.join('-')
								.replace(/(\_{2,})/gi, '_')
								.replace(/^[^\w]/gi, '')
								.replace(/-$/, ''),
								*/
						}));
					}}
					{...sharedInputProps({
						minLength: 10,
						maxLength: 255,
					})}
				/>
			</FormControl>

			<FormControls>
				<FormControl>
					<Label htmlFor='iso_language'>ISO Language: </Label>
					<select
						name='iso_language'
						id='iso_language'
						value={values.iso_language}
						onChange={(event) =>
							setValues((prev) => ({
								...prev,
								[event.target.name]: event.target.value,
							}))
						}
						required
					>
						<option value='' disabled>
							Choose The ISO Language
						</option>
						{iso_languagesKeys.map((item, index) => (
							<option key={index} value={ISO639_1LanguageCodes[item]}>
								{item}
							</option>
						))}
					</select>
				</FormControl>

				<FormControl>
					<Label htmlFor='iso_country'>ISO Country: </Label>
					<select
						name='iso_country'
						id='iso_country'
						value={values.iso_country}
						onChange={(event) =>
							setValues((prev) => ({
								...prev,
								[event.target.name]: event.target.value,
							}))
						}
						required
					>
						<option value='' disabled>
							Choose The ISO Country
						</option>
						{iso_countriesKeys.map((item, index) => (
							<option key={index} value={ISOCountryCodesCountriesISOCode[item]}>
								{item}
							</option>
						))}
					</select>
				</FormControl>
			</FormControls>

			<FormControl className={classes['form-control']}>
				<Label htmlFor='tags'>Tags: {values.tags.join(', ')}</Label>
				<Input
					name='tags'
					id='tags'
					value={values.tags.join(' ')}
					onChange={(event) => {
						return setValues((prev) => ({
							...prev,
							[event.target.name]: event.target.value
								.toLowerCase()
								.replace(/(-{2,})/gi, '-')
								.replace(/(_{2,})/gi, '_')
								.replace(/^-/, '')
								.replace(/[^\w\s-\_]/gi, '')
								.split(/\s+/),
						}));
					}}
					{...sharedInputProps({
						minLength: 10,
						maxLength: 255,
					})}
				/>
			</FormControl>

			<FormControl className={classes['form-control']}>
				<Label htmlFor='image'>Image: </Label>
				<Input
					name='image'
					id='image'
					value={values.image}
					setValues={setValues}
					{...sharedInputProps()}
				/>
			</FormControl>

			<FormControl className={classes['form-control']}>
				<Label extraClasses={classes.input} htmlFor='description'>
					Description:{' '}
				</Label>
				<Textarea
					name='description'
					id='description'
					value={values.description}
					onChange={(event) =>
						setValues((prev) => ({
							...prev,
							[event.target.name]: event.target.value,
						}))
					}
					{...sharedTextareaProps({
						minLength: 50,
					})}
				/>
			</FormControl>

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
						minLength: 100,
					})}
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

export default Article;
