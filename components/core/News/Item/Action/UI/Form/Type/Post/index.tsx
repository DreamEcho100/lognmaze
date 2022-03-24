import { FormEvent, TextareaHTMLAttributes, useState } from 'react';

import classes from '../index.module.css';
import borderClasses from '@styles/border.module.css';

import {
	INewsItemTypeBlogBasicData,
	INewsItemTypePostBasicData,
} from '@coreLib/ts/global';
import {
	TActionCreateAndUpdateValuesTypePost,
	THandleSubmitForCreateAndUpdateNewsItemActionType,
} from '../../../../ts';
import { useNewsSharedState } from '@store/NewsContext';

import FormComponent from '@commonComponentsIndependent/Form';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import LabelComponent from '@commonComponentsIndependent/Label';
import TextareaComponent from '@commonComponentsIndependent/Textarea';
import ButtonComponent from '@commonComponentsIndependent/Button';

interface IProps {
	newsItemType: 'blog' | 'post';
	handleSubmit: THandleSubmitForCreateAndUpdateNewsItemActionType;
}

const NewsItemFormTypePost = ({ newsItemType, handleSubmit }: IProps) => {
	const [values, setValues] = useState<TActionCreateAndUpdateValuesTypePost>({
		type: 'post',
		content: '',
	});
	const [inputsError, setInputsError] = useState<string[]>([]);

	const [
		{
			actions: { requests: newsActionsRequest },
		},
		newsDataDispatch,
	] = useNewsSharedState();

	const createItemRequest = newsActionsRequest?.createItem || {
		isLoading: false,
		error: '',
		success: false,
	};

	const isLoading = createItemRequest.isLoading;
	const error = createItemRequest.error;
	const success = createItemRequest.success;

	const sharedTextareaProps = (elementProps?: {
		maxLength?: number | undefined;
		minLength?: number | undefined;
	}) => {
		const props: TextareaHTMLAttributes<HTMLTextAreaElement> = {
			className: `${classes.textarea} ${borderClasses.default}`,
			required: true,
			spellCheck: true,
		};
		if (elementProps?.minLength) props.minLength = elementProps.minLength;
		if (elementProps?.maxLength) props.maxLength = elementProps.maxLength;

		// if (elementProps?.minLength || elementProps?.maxLength) {
		// 	props.pattern = `.{${elementProps?.minLength || ''},${elementProps?.maxLength || ''}}`;
		// }

		return props;
	};

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
						minLength: 3,
					})}
				/>
			</FormControlComponent>

			{inputsError.length !== 0 && (
				<ul>
					{inputsError.map((item) => (
						<li>{item}</li>
					))}
				</ul>
			)}

			<FormControlComponent className={classes.submitButton}>
				<ButtonComponent title='Submit Form' disabled={isLoading} type='submit'>
					submit
				</ButtonComponent>
			</FormControlComponent>
		</FormComponent>
	);
};

export default NewsItemFormTypePost;
