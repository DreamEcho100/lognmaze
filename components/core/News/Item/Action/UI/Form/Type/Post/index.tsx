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
import { sharedTextareaProps } from '@coreComponents/News/Item/Action/utils';

import FormComponent from '@commonComponentsIndependent/Form';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import LabelComponent from '@commonComponentsIndependent/Label';
import TextareaComponent from '@commonComponentsIndependent/Textarea';
import ButtonComponent from '@commonComponentsIndependent/Button';
import { useNewsSharedState } from '@store/NewsContext';
import useRequestState from '@commonLibDependent/requestState';
// import { memo } from 'react-tracked';

interface IProps {
	newsItemType: 'blog' | 'post';
	handleSubmit: THandleSubmitForCreateAndUpdateNewsItemActionType;
	newsItemData?: INewsItemTypePost;
}

const NewsItemFormTypePost = ({
	newsItemType,
	handleSubmit,
	newsItemData,
}: // requestState,
IProps) => {
	const [values, setValues] = useState<TActionCreateAndUpdateValuesTypePost>({
		type: 'post',
		content: newsItemData?.type_data?.content || '',
	});
	const [inputsError, setInputsError] = useState<string[]>([]);

	const [, newsDispatch] = useNewsSharedState();
	const { requestsState, requestsActionsDispatch } = useRequestState({
		requestString: 'request',
	});

	const itemsDisabled = useMemo(
		() =>
			!!(
				requestsState.request.isLoading
				// createOrUpdateRequestAction.isLoading ||
				// (!values.content && contentRequestAction.isLoading) ||
				// contentRequestAction.error
			),
		[requestsState.request.isLoading]
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
					disabled={itemsDisabled}
					type='submit'
				>
					Submit
				</ButtonComponent>
			</FormControlComponent>
		</FormComponent>
	);
};

export default NewsItemFormTypePost;
// memo(NewsItemFormTypePost, (prevProps, nextProps) => {
// 	return (
// 		prevProps.newsItemData?.updated_at === nextProps.newsItemData?.updated_at
// 	);
// });
