import { FormEvent, useMemo, useState } from 'react';

import classes from '../index.module.css';
import helperClasses from '@styles/helpers.module.css';
import borderClasses from '@styles/border.module.css';

import {
	INewsItemTypeBlogBasicData,
	INewsItemTypePostBasicData,
	INewsItemTypePost,
} from '@coreLib/ts/global';
import {
	TActionCreateAndUpdateValuesTypePost,
	THandleSubmitForCreateAndUpdateNewsItemActionType,
} from '../../../../ts';
import { useCreateUpdateDeleteNewsItemNeeds } from '@coreComponents/News/Item/Action/utils/hooks';
import { sharedTextareaProps } from '@coreComponents/News/Item/Action/utils';

import FormComponent from '@commonComponentsIndependent/Form';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import LabelComponent from '@commonComponentsIndependent/Label';
import TextareaComponent from '@commonComponentsIndependent/Textarea';
import ButtonComponent from '@commonComponentsIndependent/Button';

interface IProps {
	newsItemType: 'blog' | 'post';
	handleSubmit: THandleSubmitForCreateAndUpdateNewsItemActionType;
	actionType: 'create' | 'update';
	newsItemData?: INewsItemTypePost;
	isLoadingContentProps?: Parameters<
		typeof useCreateUpdateDeleteNewsItemNeeds
	>['0']['isLoadingContentProps'];
}

const NewsItemFormTypePost = ({
	newsItemType,
	handleSubmit,
	actionType = 'create',
	newsItemData,
	isLoadingContentProps,
}: IProps) => {
	const [values, setValues] = useState<TActionCreateAndUpdateValuesTypePost>({
		type: 'post',
		content: newsItemData?.type_data?.content || '',
	});
	const [inputsError, setInputsError] = useState<string[]>([]);

	const { createOrUpdateRequestAction, contentRequestAction, newsDispatch } =
		useCreateUpdateDeleteNewsItemNeeds({
			actionType,
			newsItemId: newsItemData?.news_id,
			isLoadingContentProps,
		});

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
				setInputsError([]);

				const props = {
					type: newsItemType,
					type_data: values,
				} as INewsItemTypeBlogBasicData | INewsItemTypePostBasicData;
				const inputsErrorAfterSubmission = await handleSubmit(
					newsDispatch,
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
				<LabelComponent htmlFor='content'>Content: </LabelComponent>
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
						minLength: 3,
					})}
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
					disabled={itemsDisabled}
					type='submit'
				>
					submit
				</ButtonComponent>
			</FormControlComponent>
		</FormComponent>
	);
};

export default NewsItemFormTypePost;
