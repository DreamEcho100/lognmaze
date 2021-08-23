import { useEffect, useState } from 'react';

import classes from './Article.module.css';
// import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

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
		image: newsItem && newsItem.image ? newsItem.image : '',
		description: newsItem && newsItem.description ? newsItem.description : '',
		content: newsItem && newsItem.content ? newsItem.content : '',
	});

	const [formMessage, setFormMessage] = useState('');
	const [btnsDisabled, setBtnsDisabled] = useState(false);
	const [showFormatConvertorModal, setShowFormatConvertorModal] =
		useState(false);

	const resetInputs = () => {
		setValues({
			// format_type: 'normal',
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

		if (actionType === 'create') {
			await createNews(values, 'article');
		} else if (actionType === 'update') {
			await updateNews(newsItem.type, newsItem, values);
		}

		resetInputs();
		setBtnsDisabled(false);
		closeModal();
		return;
		// setFormMessage(error.message);
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
			image: newsItem && newsItem.image ? newsItem.image : '',
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
					cn={classes['width-100-perecent']}
					className={classes['width-100-perecent']}
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

			<FormControl>
				<Label htmlFor='slug'>Slug: </Label>
				<Input
					cn={classes['width-100-perecent']}
					className={classes['width-100-perecent']}
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

			<FormControl>
				<Label htmlFor='tags'>Tags: {values.tags.join(', ')}</Label>
				<Input
					cn={classes['width-100-perecent']}
					className={classes['width-100-perecent']}
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

			<FormControl>
				<Label htmlFor='image'>Image: </Label>
				<Input
					cn={classes['width-100-perecent']}
					className={classes['width-100-perecent']}
					name='image'
					id='image'
					value={values.image}
					setValues={setValues}
					{...sharedInputProps()}
				/>
			</FormControl>

			<FormControl>
				<Label htmlFor='description'>Description: </Label>
				<Textarea
					cn={classes['width-100-perecent']}
					className={classes['width-100-perecent']}
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

			<FormControl>
				<Label htmlFor='content'>Content: </Label>
				<Textarea
					cn={classes['width-100-perecent']}
					className={classes['width-100-perecent']}
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
			{formMessage.length !== 0 && (
				<div className={classes.warning}>
					<p>{formMessage}</p>
				</div>
			)}
			<FormControl>
				<Button title='Submit' disabled={btnsDisabled} type='submit'>
					submit
				</Button>
			</FormControl>
		</Form>
	);
};

export default Article;
