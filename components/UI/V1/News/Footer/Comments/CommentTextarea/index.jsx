// import classes from './index.module.css';

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
	disbleSubmitBtn,
	closeBtn,
	onClickingCloseBtn,
}) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Textarea
				// useElement={(elem) => {
				// 	if (focusTextarea) elem.focus();
				// }}
				focus={focusTextarea}
				setFocus={setFocusCommentTextarea}
				// onBlur={() => {
				// 	if (focusTextarea) setFocusCommentTextarea(false);
				// }}
				name={name}
				setValues={setValues}
				onChange={onChange}
				value={value}
			/>
			<Button type='submit' disabled={disbleSubmitBtn}>
				Send
			</Button>
			{closeBtn && (
				<Button
					type='button'
					disabled={disbleSubmitBtn}
					onClick={onClickingCloseBtn}
				>
					Close
				</Button>
			)}
		</Form>
	);
};

export default CommentTextarea;
