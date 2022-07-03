import {
	ChangeEvent,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	TextareaHTMLAttributes,
} from 'react';

import classes from './index.module.css';

interface IProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues?: Dispatch<SetStateAction<any>>;
	children?: ReactNode;
}

const TextareaComponent: FC<IProps> = ({
	className,
	children,
	setValues,
	...props
}) => {
	const handleTextareaProps = () => {
		const textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement> = {
			className:
				typeof className === 'function'
					? className(classes.default)
					: typeof className === 'string'
					? `${classes.default} ${className}`
					: classes.default,
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
