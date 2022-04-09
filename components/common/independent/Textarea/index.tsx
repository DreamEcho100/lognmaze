import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	TextareaHTMLAttributes,
} from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues?: Dispatch<SetStateAction<any>>;
}

const TextareaComponent: FC<IProps> = ({
	defaultClasses = 'textarea',
	extraClasses,
	className,
	children,
	setValues,
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const handleTextareaProps = () => {
		const textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement> = {
			className: allClasses,
			...props,
		};

		if (setValues)
			textareaProps.onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setValues((prev: any) => ({
					...prev,
					[event.target.name]: event.target.value,
				}));
		else if (props.onChange) textareaProps.onChange = props.onChange;

		return textareaProps;
	};

	return <textarea {...handleTextareaProps()}>{children}</textarea>;
};

export default TextareaComponent;
