import {
	ChangeEvent,
	Dispatch,
	FC,
	InputHTMLAttributes,
	ReactNode,
	SetStateAction,
} from 'react';

import classes from './index.module.css';

interface IProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues?: Dispatch<SetStateAction<any>>;
	children?: ReactNode;
}

/*
const InputComponent: FC<IProps & HTMLProps<HTMLInputElement>>
*/

const InputComponent: FC<IProps> = ({
	className,
	children,
	setValues,
	...props
}) => {
	const handleInputProps = () => {
		const inputProps: InputHTMLAttributes<HTMLInputElement> = {
			className:
				typeof className === 'function'
					? className(classes.default)
					: typeof className === 'string'
					? `${classes.default} ${className}`
					: classes.default,
			...props,
		};

		if (setValues && !props.readOnly)
			inputProps.onChange = (event: ChangeEvent<HTMLInputElement>) =>
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setValues((prev: any) => ({
					...prev,
					[event.target.name]: event.target.value,
				}));
		else if (props.onChange) inputProps.onChange = props.onChange;

		return inputProps;
	};

	return <input {...handleInputProps()}>{children}</input>;
};

export default InputComponent;
