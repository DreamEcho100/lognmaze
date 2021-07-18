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
import Select from '@/components/UI/V1/Select/Select';
import Textarea from '@/components/UI/V1/Textarea/Textarea';
import Button from '@/components/UI/V1/Button/Button';

const iso_languagesKeys = (() => {
	return Object.keys(ISO639_1LanguageCodes);
})();
const iso_countriesKeys = (() => {
	return Object.keys(ISOCountryCodesCountriesISOCode);
})();

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

	const [formMessage, setFormMessage] = useState('');
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const resetInputs = () => {
		setValues({
			format_type: 'normal',
			title: '',
			slug: '',
			iso_language: 'en',
			iso_country: 'US',
			tags: [],
			image: '',
			description: '',
			content: '',
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setFormMessage('');
		setBtnsDisabled(true);

		let bodyObj = {};
		const tags_array = [];
		let fetchMethod;

		if (actionType === 'create') {
			fetchMethod = 'POST';
			bodyObj = {
				type: 'article',
				author_user_name_id: user.user_name_id,
				...values,
			};
		} else if (actionType === 'update') {
			fetchMethod = 'PATCH';
			const removedTags = [];
			const addedTags = [];

			const oldTags = data.tags;
			const newTags = values.tags;

			if (oldTags.length <= newTags.length) {
				newTags.forEach((item, index) => {
					if (oldTags.includes(item)) return;
					addedTags.push(item);
					if (index <= oldTags.length - 1) {
						if (!newTags.includes(oldTags[index]))
							removedTags.push(oldTags[index]);
					}
				});
			} else if (oldTags.length > newTags.length) {
				oldTags.forEach((item, index) => {
					if (newTags.includes(item)) return;
					removedTags.push(item);
					if (index <= newTags.length - 1) {
						if (!oldTags.includes(newTags[index]))
							addedTags.push(newTags[index]);
					}
				});
			}

			bodyObj = {
				type: 'article',
				news_id: data.news_id,
				news_data: {},
				tags: {
					removed: removedTags,
					added: addedTags,
				},
			};

			for (let item in values) {
				if (item !== 'tags') {
					if (data[item] !== values[item]) {
						bodyObj.news_data[item] = values[item];
					}
				}
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

						setTimeout(() => closeModal(), 0);
					}
				});
		} catch (error) {
			console.error(error);
			setFormMessage(error.message);
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
				<Select
					name='format_type'
					id='format_type'
					disabledOption={{ text: 'Choose Format Type' }}
					value={values.format_type}
					setValues={setValues}
					required
				>
					<option value='normal'>normal</option>
					<option value='md'>md</option>
				</Select>
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
					<Select
						name='iso_language'
						id='iso_language'
						disabledOption={{ text: 'Choose The ISO Language' }}
						value={values.iso_language}
						setValues={setValues}
						required
					>
						{iso_languagesKeys.map((item, index) => (
							<option key={index} value={ISO639_1LanguageCodes[item]}>
								{item}
							</option>
						))}
					</Select>
				</FormControl>

				<FormControl>
					<Label htmlFor='iso_country'>ISO Country: </Label>
					<Select
						name='iso_country'
						id='iso_country'
						disabledOption={{ text: 'Choose The ISO Country' }}
						value={values.iso_country}
						setValues={setValues}
						required
					>
						{iso_countriesKeys.map((item, index) => (
							<option key={index} value={ISOCountryCodesCountriesISOCode[item]}>
								{item}
							</option>
						))}
					</Select>
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
					{...sharedInputProps()}
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

export default Article;
