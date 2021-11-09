import Form from '@components/UI/V1/Form';
import Textarea from '@components/UI/V1/Textarea';
import Button from '@components/UI/V1/Button';

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
		<Form onSubmit={handleSubmit}>
			<Textarea
				focus={focusTextarea}
				setFocus={setFocusCommentTextarea}
				name={name}
				setValues={setValues}
				onChange={onChange}
				value={value}
			/>
			<div className='buttons-holder'>
				<Button title='Submit Form' type='submit' disabled={disableSubmitBtn}>
					Send
				</Button>
				{closeBtn && (
					<Button
						title='Close Modal'
						disabled={disableSubmitBtn}
						onClick={onClickingCloseBtn}
					>
						Close
					</Button>
				)}
			</div>
		</Form>
	);
};

export default CommentTextarea;
