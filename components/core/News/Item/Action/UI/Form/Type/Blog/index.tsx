import { FormEvent, useMemo, useState } from 'react';

import classes from '../index.module.css';
import helperClasses from '@styles/helpers.module.css';
import borderClasses from '@styles/border.module.css';

import ISO639_1LanguageCodes from '@data/ISO639_1LanguageCodes.json';
import ISOCountryCodesCountriesISOCode from '@data/ISOCountryCodesCountriesISOCode.json';

import {
	INewsItemTypeBlogBasicData,
	INewsItemTypePostBasicData,
	INewsItemTypeBlog,
} from '@coreLib/ts/global';
import {
	TActionCreateAndUpdateValuesTypeBlog,
	THandleSubmitForCreateAndUpdateNewsItemActionType,
} from '../../../../ts';
import { useCreateOrUpdateNewsItemNeeds } from '@coreComponents/News/Item/Action/utils/hooks';
import {
	sharedInputProps,
	sharedTextareaProps,
} from '@coreComponents/News/Item/Action/utils';

import FormComponent from '@commonComponentsIndependent/Form';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import InputComponent from '@commonComponentsIndependent/Input';
import LabelComponent from '@commonComponentsIndependent/Label';
import SelectComponent from '@commonComponentsIndependent/Select';
import TextareaComponent from '@commonComponentsIndependent/Textarea';
import ButtonComponent from '@commonComponentsIndependent/Button';

const iso_languagesKeys = Object.keys(
	ISO639_1LanguageCodes
) as (keyof typeof ISO639_1LanguageCodes)[];
const iso_countriesKeys = Object.keys(
	ISOCountryCodesCountriesISOCode
) as (keyof typeof ISOCountryCodesCountriesISOCode)[];

interface IProps {
	actionType: 'create' | 'update';
	handleSubmit: THandleSubmitForCreateAndUpdateNewsItemActionType;
	newsItemType: 'blog' | 'post';
	newsItemData?: INewsItemTypeBlog;
}

const NewsItemFormTypeBlog = ({
	actionType,
	handleSubmit,
	newsItemType,
	newsItemData,
}: IProps) => {
	const [values, setValues] = useState<TActionCreateAndUpdateValuesTypeBlog>({
		type: 'blog',
		title: newsItemData?.type_data.title || '',
		slug: newsItemData?.type_data.slug || '',
		iso_language: newsItemData?.type_data.iso_language || 'en',
		iso_country: newsItemData?.type_data.iso_country || 'US',
		image_alt: newsItemData?.type_data.image_alt || '',
		image_src: newsItemData?.type_data.image_src || '',
		description: newsItemData?.type_data.description || '',
		tags: newsItemData?.type_data.tags || [],
		content: newsItemData?.type_data?.content || '',
	});
	const [inputsError, setInputsError] = useState<string[]>([]);

	const {
		createOrUpdateRequestAction,
		contentRequestAction,
		newsDataDispatch,
	} = useCreateOrUpdateNewsItemNeeds({
		actionType,
		newsItemId: newsItemData?.news_id,
	});

	// const isLoading = createOrUpdateRequestAction.isLoading;
	// const error = createOrUpdateRequestAction.error;
	// const success = createOrUpdateRequestAction.success;

	// const isLoadingContent = !values.content && contentRequestAction.isLoading;

	const itemsDisabled = useMemo(
		() =>
			!!(
				createOrUpdateRequestAction.isLoading ||
				(!values.content && contentRequestAction.isLoading) ||
				contentRequestAction.error
			),
		[
			contentRequestAction.error,
			contentRequestAction.isLoading,
			createOrUpdateRequestAction.isLoading,
			values.content,
		]
	);

	return (
		<FormComponent
			onSubmit={async (event: FormEvent) => {
				event.preventDefault();
				if (itemsDisabled) return;

				setInputsError([]);

				const props = {
					type: newsItemType,
					type_data: values,
				} as INewsItemTypeBlogBasicData | INewsItemTypePostBasicData;
				const inputsErrorAfterSubmission = await handleSubmit(
					newsDataDispatch,
					props
				);
				if (
					Array.isArray(inputsErrorAfterSubmission) &&
					inputsErrorAfterSubmission.length !== 0
				)
					setInputsError(inputsErrorAfterSubmission);
			}}
			className={classes.form}
		>
			{contentRequestAction.isLoading && (
				<p className='isLoadingLoader'>Loading missing data...</p>
			)}
			{contentRequestAction.error && (
				<p className='errorMessage'>{contentRequestAction.error}</p>
			)}
			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='title'>Title: </LabelComponent>
				<InputComponent
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
						className: `${classes.input} ${
							itemsDisabled && helperClasses.disabled
						}`,
						minLength: 10,
						maxLength: 255,
					})}
				/>
			</FormControlComponent>

			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='slug'>Slug: </LabelComponent>
				<InputComponent
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
						className: `${classes.input} ${
							itemsDisabled && helperClasses.disabled
						}`,
						minLength: 10,
						maxLength: 255,
					})}
				/>
			</FormControlComponent>

			<FormControlComponent className={classes.formControl}>
				<FormControlComponent className={classes.formControl}>
					<LabelComponent htmlFor='iso_language'>ISO Language: </LabelComponent>
					<SelectComponent
						name='iso_language'
						id='iso_language'
						value={values.iso_language}
						setValues={setValues}
						required
					>
						<option disabled>Choose The ISO Language</option>
						{iso_languagesKeys.map((item, index) => (
							<option key={index} value={ISO639_1LanguageCodes[item]}>
								{item}
							</option>
						))}
					</SelectComponent>
				</FormControlComponent>

				<FormControlComponent className={classes.formControl}>
					<LabelComponent htmlFor='iso_country'>ISO Country: </LabelComponent>
					<SelectComponent
						name='iso_country'
						id='iso_country'
						value={values.iso_country}
						setValues={setValues}
						required
					>
						<option disabled>Choose The ISO Country</option>
						{iso_countriesKeys.map((item, index) => (
							<option key={index} value={ISOCountryCodesCountriesISOCode[item]}>
								{item}
							</option>
						))}
					</SelectComponent>
				</FormControlComponent>
			</FormControlComponent>

			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='tags'>
					Tags: {values.tags.join(', ')}
				</LabelComponent>
				<InputComponent
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
						className: `${classes.input} ${
							itemsDisabled && helperClasses.disabled
						}`,
					})}
				/>
			</FormControlComponent>

			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='image_alt'>Image Name: </LabelComponent>
				<InputComponent
					name='image_alt'
					id='image_alt'
					value={values.image_alt}
					setValues={setValues}
					{...sharedInputProps({
						className: `${classes.input} ${
							itemsDisabled && helperClasses.disabled
						}`,
					})}
				/>
			</FormControlComponent>

			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='image_src'>Image Source: </LabelComponent>
				<InputComponent
					name='image_src'
					id='image_src'
					value={values.image_src}
					setValues={setValues}
					{...sharedInputProps({
						className: `${classes.input} ${
							itemsDisabled && helperClasses.disabled
						}`,
					})}
				/>
			</FormControlComponent>

			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='description'>Description: </LabelComponent>
				<TextareaComponent
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
						className: `${classes.textarea} ${borderClasses.default} ${
							itemsDisabled && helperClasses.disabled
						}`,
						minLength: 25,
					})}
				/>
			</FormControlComponent>

			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='content'>
					{/* {isLoadingContent ? 'Loading' : ''} Content:{' '} */}
					Content:
				</LabelComponent>
				<TextareaComponent
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
						className: `${classes.textarea} ${borderClasses.default} ${
							itemsDisabled && helperClasses.disabled
						}`,
						minLength: 100,
					})}
					// onClick={() => setShowFormatConvertorModal(true)}
					// className={`${classes['width-100-percent']} ${
					// 	isLoadingContent ? 'disable' : ''
					// }`}
				/>
			</FormControlComponent>

			{createOrUpdateRequestAction.error ||
				(inputsError.length !== 0 && (
					<ul className='errorsMessagesList'>
						{createOrUpdateRequestAction.error && (
							<li>{createOrUpdateRequestAction.error}</li>
						)}
						{inputsError.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				))}

			<FormControlComponent className={classes.submitButton}>
				<ButtonComponent
					title='Submit Form'
					disabled={!!itemsDisabled}
					type='submit'
				>
					submit
				</ButtonComponent>
			</FormControlComponent>
		</FormComponent>
	);
};

export default NewsItemFormTypeBlog;
