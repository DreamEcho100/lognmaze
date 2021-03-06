import { FormEvent, useEffect, useMemo, useState } from 'react';

import classes from '../index.module.css';
import helperClasses from '@styles/helpers.module.css';
import borderClasses from '@styles/border.module.css';

import ISO639_1LanguageCodes from '@data/ISO639_1LanguageCodes.json';
import ISOCountryCodesCountriesISOCode from '@data/ISOCountryCodesCountriesISOCode.json';

import {
	INewsItemTypeBlogBasicData,
	INewsItemTypePostBasicData,
	INewsItemTypeBlog,
	TNewsItemData,
} from '@coreLib/ts/global';
import { initGetNewsItemTypeBlogContent } from '@store/NewsContext/actions';
import {
	TActionCreateAndUpdateValuesTypeBlog,
	THandleSubmitForCreateAndUpdateNewsItemActionType,
} from '../../../../ts';
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
import { useNewsSharedState } from '@store/NewsContext';
import useRequestState from '@commonLibDependent/requestState';

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
	isLoadingContentProps?: {
		isModalVisible?: boolean;
		newsItemData?: TNewsItemData;
	};
}

const NewsItemFormTypeBlog = ({
	actionType,
	handleSubmit,
	newsItemType,
	newsItemData,
	isLoadingContentProps,
}: // requestState,
IProps) => {
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
	const { requestsState, requestsActionsDispatch } = useRequestState({
		requestString: 'request',
	});

	const [
		{
			actions: { items: itemsActions },
		},
		newsDispatch,
	] = useNewsSharedState();

	const contentRequestAction = useMemo(
		() =>
			(newsItemData?.news_id &&
				itemsActions[newsItemData?.news_id]?.requests?.init?.modal
					?.getTypeBlogContent) || {
				isLoading: false,
				error: '',
				success: false,
			},
		[itemsActions, newsItemData?.news_id]
	);

	const itemsDisabled = useMemo(
		() =>
			!!(
				requestsState.request.isLoading ||
				// (!values.content && contentRequestAction.isLoading) ||
				(actionType === 'update' && !values.content) ||
				contentRequestAction.error
			),
		[
			actionType,
			contentRequestAction.error,
			requestsState.request.isLoading,
			values.content,
		]
	);

	useEffect(() => {
		// let timeoutId: NodeJS.Timeout;

		if (
			actionType === 'update' &&
			isLoadingContentProps?.isModalVisible &&
			isLoadingContentProps?.newsItemData &&
			isLoadingContentProps.newsItemData.type === 'blog' &&
			!isLoadingContentProps.newsItemData.type_data.content &&
			!contentRequestAction.success &&
			!contentRequestAction.isLoading
		) {
			if (!contentRequestAction || !contentRequestAction?.error) {
				initGetNewsItemTypeBlogContent(newsDispatch, {
					news_id: isLoadingContentProps.newsItemData.news_id,
					urlOptions: {
						params: {
							news_id: isLoadingContentProps.newsItemData.news_id,
						},
					},
				});
			} else {
				console.warn('Error with loading the content!');
			}
			return;
		}
	}, [actionType, contentRequestAction, isLoadingContentProps, newsDispatch]);

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
					newsDispatch,
					requestsActionsDispatch,
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
											.replace(/[^\w\s-_]/gi, '')
											.split(/[\s-]+/)
											.join('-')
											.replace(/(_{2,})/gi, '_')
											.replace(/^[^\w]/gi, '')
											.replace(/-$/, '')
									: prev.slug,
						}));
					}}
					autoFocus
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
								.replace(/[^\w-_]/gi, ''),
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
						{iso_languagesKeys.map((item) => (
							<option
								key={item.replace(/[\W]+/g, '-')}
								value={ISO639_1LanguageCodes[item]}
							>
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
						{iso_countriesKeys.map((item) => (
							<option
								key={item.replace(/[\W]+/g, '-')}
								value={ISOCountryCodesCountriesISOCode[item]}
							>
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
								.replace(/[^\w\s-_]/gi, '')
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
				/>
			</FormControlComponent>

			{requestsState.request.error ||
				(inputsError.length !== 0 && (
					<ul className='errorsMessagesList'>
						{requestsState.request.error && (
							<li>{requestsState.request.error}</li>
						)}
						{inputsError.map((item) => (
							<li key={item.replace(/[\W]+/g, '-')}>{item}</li>
						))}
					</ul>
				))}

			<FormControlComponent className={classes.submitButton}>
				<ButtonComponent
					title='Submit Form'
					disabled={!!itemsDisabled}
					type='submit'
				>
					Submit
				</ButtonComponent>
			</FormControlComponent>
		</FormComponent>
	);
};

export default NewsItemFormTypeBlog;
