import { useEffect } from 'react';

import ISO639_1LanguageCodes from '@data/ISO639_1LanguageCodes.json';
import ISOCountryCodesCountriesISOCode from '@data/ISOCountryCodesCountriesISOCode.json';

import FormControls from '@components/UI/V1/FormControls/FormControls';
import FormControl from '@/components/UI/V1/FormControl';
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

const NewsFormArticle = ({
	newsItemData,
	setShowModal,
	isResettingInputsAfterSubmit, // = false,
	isClosingModalAfterSubmit, // = true,

	//
	classes,
	//
	values,
	setValues,
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
			content: newsItemData?.content ? newsItemData.content : '',
		});

		setAfterFormSubmitMessage(() => <></>);
		setIsButtonsDisabled(false);
		setShowFormatConvertorModal(false);
	}, []);

	const resetInputs = () => {
		setValues({
			content: '',
		});
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
		<>
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
		</>
	);
};

export default NewsFormArticle;
