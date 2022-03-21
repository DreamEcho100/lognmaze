import { Dispatch, FC, FormEvent, SetStateAction } from 'react';

import classes from './index.module.css';
import borderClasses from '@styles/border.module.css';

import FormComponent from '@commonComponentsIndependent/Form';
import FormControlComponent from '@commonComponentsIndependent/FormControl';
import TextareaComponent from '@commonComponentsIndependent/Textarea';
import ButtonComponent from '@commonComponentsIndependent/Button';

interface IProps {
	setValues: Dispatch<SetStateAction<any>>;
	value: string;
	name: string;
	handleSubmit: (event: FormEvent) => void;
	disableSubmitBtn: boolean;
	commentToType?: 'news_item' | 'comment_main' | 'comment_main_reply';
}

const CommentTextarea: FC<IProps> = ({
	name,
	setValues,
	value,
	handleSubmit,
	disableSubmitBtn,
	commentToType = 'news_item',
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
					// onChange={onChange}
					value={value}
					className={`${borderClasses.default} ${classes.textarea}`}
				/>
			</FormControlComponent>
			<div
			/// className='buttons-holder'
			>
				<ButtonComponent
					title={SendButtonComponent_Map[commentToType]}
					type='submit'
					disabled={disableSubmitBtn}
				>
					Send
				</ButtonComponent>{' '}
				{/* {closeBtn && ( */}
				<ButtonComponent
					title={closeButtonComponent_Map[commentToType]}
					disabled={disableSubmitBtn}
					// onClick={onClickingCloseBtn}
				>
					Close
				</ButtonComponent>
				{/* )} */}
			</div>
		</FormComponent>
	);
};

export default CommentTextarea;
