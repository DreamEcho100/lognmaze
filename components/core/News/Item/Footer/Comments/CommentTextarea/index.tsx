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
}

const CommentTextarea: FC<IProps> = ({
	name,
	setValues,
	value,
	handleSubmit,
	disableSubmitBtn,
}) => {
	return (
		<FormComponent onSubmit={handleSubmit} className={classes.form}>
			<FormControlComponent className={classes.textareaController}>
				<TextareaComponent
					name={name}
					setValues={setValues}
					// onChange={onChange}
					value={value}
					className={borderClasses.default}
				/>
			</FormControlComponent>
			<div className='buttons-holder'>
				<ButtonComponent
					title='Submit Form'
					type='submit'
					disabled={disableSubmitBtn}
				>
					Send
				</ButtonComponent>{' '}
				{/* {closeBtn && ( */}
				<ButtonComponent
					title='Close Modal'
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
