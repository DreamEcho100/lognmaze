import { Dispatch, FC, FormEvent, SetStateAction } from 'react';

import classes from './index.module.css';
import borderClasses from '@styles/border.module.css';

import FormComponent from '@commonComponentsIndependent/Form';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import TextareaComponent from '@commonComponentsIndependent/Textarea';
import ButtonComponent from '@commonComponentsIndependent/Button';

interface IProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues: Dispatch<SetStateAction<any>>;
	value: string;
	name: string;
	handleSubmit: (event: FormEvent) => void;
	disableSubmitButton?: boolean;
	commentToType?: 'news_item' | 'comment_main' | 'comment_main_reply';
	handleIsCommentTextareaIsVisible: (isVisible?: boolean) => void;
}

const CommentTextarea: FC<IProps> = ({
	name,
	setValues,
	value,
	handleSubmit,
	disableSubmitButton,
	commentToType = 'news_item',
	handleIsCommentTextareaIsVisible,
}) => {
	const SendButtonComponent_Map = {
		news_item: 'Submit comment replying a news item',
		comment_main: 'Submit comment replying a comment',
		comment_main_reply: 'Submit comment replying a reply',
	};
	const closeButtonComponent_Map = {
		news_item: 'Close create "comment replying to a news item" area',
		comment_main: 'Close create "comment replying to a comment" area',
		comment_main_reply: 'Close create "comment replying to a reply" area',
	};

	return (
		<FormComponent onSubmit={handleSubmit} className={classes.form}>
			<FormControlComponent className={classes.textareaController}>
				<TextareaComponent
					name={name}
					setValues={setValues}
					value={value}
					className={`${borderClasses.default} ${classes.textarea}`}
				/>
			</FormControlComponent>
			<div>
				<ButtonComponent
					title={SendButtonComponent_Map[commentToType]}
					type='submit'
					disabled={disableSubmitButton}
				>
					Send
				</ButtonComponent>{' '}
				<ButtonComponent
					title={closeButtonComponent_Map[commentToType]}
					disabled={disableSubmitButton}
					onClick={() => handleIsCommentTextareaIsVisible(false)}
				>
					Close
				</ButtonComponent>
			</div>
		</FormComponent>
	);
};

export default CommentTextarea;
