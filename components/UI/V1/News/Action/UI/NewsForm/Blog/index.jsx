import { useEffect } from 'react';

import ISO639_1LanguageCodes from '@data/ISO639_1LanguageCodes.json';
import ISOCountryCodesCountriesISOCode from '@data/ISOCountryCodesCountriesISOCode.json';

import FormControls from '@components/UI/V1/FormControls/FormControls';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Select from '@components/UI/V1/Select/Select';
import Textarea from '@components/UI/V1/Textarea';

import FormatConvertorModal from '@components/UI/V1/Modal/FormatConvertor';

const iso_languagesKeys = (() => {
	return Object.keys(ISO639_1LanguageCodes);
})();
const iso_countriesKeys = (() => {
	return Object.keys(ISOCountryCodesCountriesISOCode);
})();

const NewsFormBlog = ({
	newsItemData,
	// setShowModal,
	// isResettingInputsAfterSubmit, // = false,
	// isClosingModalAfterSubmit, // = true,

	//
	classes,
	//
	values,
	setValues,
	isLoadingContent,
	//
	actionType,
	//
	// AfterFormSubmitMessage,
	setAfterFormSubmitMessage,
	//
	// isButtonsDisabled,
	setIsButtonsDisabled,
	//
	showFormatConvertorModal,
	setShowFormatConvertorModal,
	//
}) => {
	useEffect(() => {
		setValues({
			title: newsItemData?.title || '',
			slug: newsItemData?.slug || '',
			iso_language: newsItemData?.iso_language || 'en',
			iso_country: newsItemData?.iso_country || 'US',
			tags:
				newsItemData?.tags && newsItemData.tags.length ? newsItemData.tags : [],
			image_alt: newsItemData?.image_alt || '',
			image_src: newsItemData?.image_src || '',
			description: newsItemData?.description || '',
			content: newsItemData?.content || '',
		});

		setAfterFormSubmitMessage(() => <></>);
		setIsButtonsDisabled(false);
		setShowFormatConvertorModal(false);
	}, [
		setValues,
		setAfterFormSubmitMessage,
		setIsButtonsDisabled,
		setShowFormatConvertorModal,

		newsItemData.title,
		newsItemData.slug,
		newsItemData.iso_language,
		newsItemData.iso_country,
		newsItemData.tags,
		newsItemData.image_alt,
		newsItemData.image_src,
		newsItemData.description,
		newsItemData.content,
	]);

	/*
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
	*/

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
			props.pattern = `.{${minLength || ''},${maxLength || ''}}`;
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
			props.pattern = `.{${minLength || ''},${maxLength || ''}}`;
		}

		return props;
	};

	useEffect(() => {
		setValues({
			title: newsItemData?.title ? newsItemData.title : '',
			slug: newsItemData?.slug ? newsItemData.slug : '',
			iso_language: newsItemData?.iso_language
				? newsItemData.iso_language
				: 'en',
			iso_country: newsItemData?.iso_country ? newsItemData.iso_country : 'US',
			tags:
				newsItemData?.tags && newsItemData.tags.length ? newsItemData.tags : [],
			image_alt: newsItemData?.image_alt ? newsItemData.image_alt : '',
			image_src: newsItemData?.image_src ? newsItemData.image_src : '',
			description: newsItemData?.description ? newsItemData.description : '',
			content: newsItemData?.content ? newsItemData.content : '',
		});
	}, [setValues, newsItemData]);

	return (
		<>
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
							slug:
								actionType !== 'update'
									? event.target.value
											.toLowerCase()
											.replace(/[^\w\s-\_]/gi, '')
											.split(/[\s-]+/)
											.join('-')
											.replace(/(\_{2,})/gi, '_')
											.replace(/^[^\w]/gi, '')
											.replace(/-$/, '')
									: prev.slug,
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
					})}
					className={classes['width-100-percent']}
				/>
			</FormControl>

			<FormControl>
				<Label htmlFor='content'>
					{isLoadingContent ? 'Loading' : ''} Content:{' '}
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
						isLoadingContent ? 'disable' : ''
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
		</>
	);
};

export default NewsFormBlog;
