import { useEffect, useState } from 'react';

import classes from './Article.module.css';

import ISO639_1LanguageCodes from '@data/ISO639_1LanguageCodes.json';
import ISOCountryCodesCountriesISOCode from '@data/ISOCountryCodesCountriesISOCode.json';

import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import FormControls from '@components/UI/V1/FormControls/FormControls';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Select from '@components/UI/V1/Select/Select';
import Textarea from '@components/UI/V1/Textarea';
import Button from '@components/UI/V1/Button';
import FormatConvertorModal from '@components/UI/V1/Modal/FormatConvertor';

const iso_languagesKeys = (() => {
	return Object.keys(ISO639_1LanguageCodes);
})();
const iso_countriesKeys = (() => {
	return Object.keys(ISOCountryCodesCountriesISOCode);
})();

const Article = ({
	closeModal,
	createNews,
	updateNews,
	actionType,
	newsItem,
}) => {
	const [values, setValues] = useState({
		title: newsItem && newsItem.title ? newsItem.title : '',
		slug: newsItem && newsItem.slug ? newsItem.slug : '',
		iso_language:
			newsItem && newsItem.iso_language ? newsItem.iso_language : 'en',
		iso_country: newsItem && newsItem.iso_country ? newsItem.iso_country : 'US',
		tags:
			newsItem && newsItem.tags && newsItem.tags.length ? newsItem.tags : [],
		image_alt: newsItem && newsItem.image_alt ? newsItem.image_alt : '',
		image_src: newsItem && newsItem.image_src ? newsItem.image_src : '',
		description: newsItem && newsItem.description ? newsItem.description : '',
		content: newsItem && newsItem.content ? newsItem.content : '',
	});

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [btnsDisabled, setBtnsDisabled] = useState(false);
	const [showFormatConvertorModal, setShowFormatConvertorModal] =
		useState(false);

	const resetInputs = () => {
		setValues({
			title: '',
			slug: '',
			iso_language: 'en',
			iso_country: 'US',
			tags: [],
			image_alt: '',
			image_src: '',
			description: '',
			content: '',
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setAfterFormSubmitMessage(() => <></>);
		setBtnsDisabled(true);

		const fieldsCheck = [];

		if (values.title.trim().replace(/\s{2,}/g, '').length < 25)
			fieldsCheck.push('Title is less than 25 characters.');
		else if (values.title.trim().replace(/\s{2,}/g, '').length > 70)
			fieldsCheck.push('Title is more than 70 characters.');

		if (values.slug.trim().replace(/\s{2,}/g, '').length < 25)
			fieldsCheck.push('Slug is less than 25 characters.');

		if (values.tags.length < 2)
			fieldsCheck.push('At least there should be 2 tags.');
		else if (values.tags.length > 10)
			fieldsCheck.push("Tags shouldn't be more than 10.");

		if (values.image_alt.trim().replace(/\s{2,}/g, '').length < 3)
			fieldsCheck.push('Image title is less than 3 characters.');
		else if (values.image_alt.trim().replace(/\s{2,}/g, '').length > 150)
			fieldsCheck.push('Image title is more than 150 characters.');

		if (values.image_src.replace(/\s/g, '').length === 0)
			fieldsCheck.push('There is no image source.');
		if (!values.image_src.replace(/\s/g, '').startsWith('https'))
			fieldsCheck.push("Image source doesn't start with https.");

		if (values.description.trim().replace(/\s{2,}/g, '').length < 25)
			fieldsCheck.push('Description is less than 25 characters.');
		// else if (values.description.length > 160)
		// 	fieldsCheck.push('Description is more than 160 characters.');

		if (values.content.trim().replace(/\s{2,}/g, '').length < 25)
			fieldsCheck.push('Content is less than 25 characters.');

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
			result = await createNews(values, 'article');
		} else if (actionType === 'update') {
			result = await updateNews(newsItem.type, newsItem, values);
		}

		setBtnsDisabled(false);

		if (result.status === 'error') {
			return setAfterFormSubmitMessage(() => <>{reult.message}</>);
		}

		resetInputs();
		closeModal();
	};

	const sharedInputProps = (elementProps = {}) => {
		const { minLength = false, maxLength = false } = elementProps;
		const props = {
			extraClasses: classes.input,
			className: classes['input'],
			required: true,
		};
		if (minLength) props.minLength = minLength;
		if (maxLength) props.maxLength = maxLength;

		if (minLength || maxLength) {
			props.pattern = `{${minLength || ''},${maxLength || ''}}`;
		}

		return props;
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
			props.pattern = `{${minLength || ''},${maxLength || ''}}`;
		}

		return props;
	};

	useEffect(() => {
		setValues({
			title: newsItem && newsItem.title ? newsItem.title : '',
			slug: newsItem && newsItem.slug ? newsItem.slug : '',
			iso_language:
				newsItem && newsItem.iso_language ? newsItem.iso_language : 'en',
			iso_country:
				newsItem && newsItem.iso_country ? newsItem.iso_country : 'US',
			tags:
				newsItem && newsItem.tags && newsItem.tags.length ? newsItem.tags : [],
			image_alt: newsItem && newsItem.image_alt ? newsItem.image_alt : '',
			image_src: newsItem && newsItem.image_src ? newsItem.image_src : '',
			description: newsItem && newsItem.description ? newsItem.description : '',
			content: newsItem && newsItem.content ? newsItem.content : '',
		});
	}, [newsItem]);

	return (
		<Form
			extraClasses={classes.form}
			onSubmit={handleSubmit}
			className={classes.form}
		>
			<FormControl>
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
					className={classes['width-100-percent']}
				/>
			</FormControl>

			<FormControl>
				<Label htmlFor='slug'>Slug: </Label>
				<Input
					name='slug'
					id='slug'
					value={values.slug}
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
					className={classes['width-100-percent']}
				/>
			</FormControl>

			<FormControls className={classes['width-100-percent']}>
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

			<FormControl>
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
					className={classes['width-100-percent']}
				/>
			</FormControl>

			<FormControl>
				<Label htmlFor='image_alt'>Image Name: </Label>
				<Input
					name='image_alt'
					id='image_alt'
					value={values.image_alt}
					setValues={setValues}
					{...sharedInputProps()}
					className={classes['width-100-percent']}
				/>
			</FormControl>

			<FormControl>
				<Label htmlFor='image_src'>Image Source: </Label>
				<Input
					name='image_src'
					id='image_src'
					value={values.image_src}
					setValues={setValues}
					{...sharedInputProps()}
					className={classes['width-100-percent']}
				/>
			</FormControl>

			<FormControl>
				<Label htmlFor='description'>Description: </Label>
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
						minLength: 25,
						maxLength: 160,
					})}
					className={classes['width-100-percent']}
				/>
			</FormControl>

			<FormControl>
				<Label htmlFor='content'>
					{newsItem?.isLoadingContent ? 'Loading' : ''} Content:{' '}
				</Label>
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
					onClick={() => setShowFormatConvertorModal(true)}
					className={`${classes['width-100-percent']} ${
						newsItem?.isLoadingContent ? 'disable' : ''
					}`}
				/>
				<FormatConvertorModal
					showModal={showFormatConvertorModal}
					setShowModal={setShowFormatConvertorModal}
					formatConvertorProps={{
						setValues,
						values,
						name: 'content',
						id: 'content',
						fromFormatType: 'txt',
						toFormatType: 'md',
					}}
				/>
			</FormControl>

			<div
			// className={classes.warning}
			>
				{AfterFormSubmitMessage}
			</div>

			<FormControl>
				<Button title='Submit Form' disabled={btnsDisabled} type='submit'>
					submit
				</Button>
			</FormControl>
		</Form>
	);
};

export default Article;
