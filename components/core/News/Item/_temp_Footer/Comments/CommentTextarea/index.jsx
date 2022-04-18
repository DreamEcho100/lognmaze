// import Form from '@components/UI/V1/Form';
// import Textarea from '@components/UI/V1/Textarea';
// import Button from '@components/UI/V1/Button';

import ButtonComponent from '@commonComponentsIndependent/Button';
import FormComponent from '@commonComponentsIndependent/Form';
import TextareaComponent from '@commonComponentsIndependent/Textarea';

const CommentTextarea = ({
	handleSubmit,
	focusTextarea,
	setFocusCommentTextarea,
	name,
	setValues,
	value,
	onChange,
	disableSubmitBtn,
	closeBtn,
	onClickingCloseBtn,
}) => {
	return (
		<FormComponent onSubmit={handleSubmit}>
			<TextareaComponent
				focus={focusTextarea}
				setFocus={setFocusCommentTextarea}
				name={name}
				setValues={setValues}
				onChange={onChange}
				value={value}
			/>
			<div className='buttons-holder'>
				<ButtonComponent
					title='Submit Form'
					type='submit'
					disabled={disableSubmitBtn}
				>
					Send
				</ButtonComponent>
				{closeBtn && (
					<ButtonComponent
						title='Close Modal'
						disabled={disableSubmitBtn}
						onClick={onClickingCloseBtn}
					>
						Close
					</ButtonComponent>
				)}
			</div>
		</FormComponent>
	);
};

export default CommentTextarea;
