import classes from './index.module.css';

import Form from '@components/UI/V1/Form';
import Textarea from '@components/UI/V1/Textarea';
import Button from '@components/UI/V1/Button';

const EditComment = ({
	handleSubmit,
	focusTextarea,
	setFocusCommentTextarea,
	name,
	setValues,
	value,
	onChange,
	disbleSubmitBtn,
}) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Textarea
				useElement={(elem) => {
					if (focusTextarea) elem.focus();
				}}
				// useElementInEffect={(elem) => {
				// 	console.log(elem);
				// 	if (!elem) return;
				// 	elem.focus();
				// }}
				// useElementInEffectDependencyList={[]}
				onBlur={() => {
					if (focusTextarea) setFocusCommentTextarea(false);
				}}
				name={name}
				setValues={setValues}
				onChange={onChange}
				value={value}
			/>
			<Button type='submit' disabled={disbleSubmitBtn}>
				Send
			</Button>
		</Form>
	);
};

export default EditComment;
