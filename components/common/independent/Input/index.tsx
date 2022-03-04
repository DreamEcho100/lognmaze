import {
	ChangeEvent,
	Dispatch,
	FC,
	InputHTMLAttributes,
	SetStateAction,
} from 'react';

import classes from './styles.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	setValues?: Dispatch<SetStateAction<any>>;
}

/*
const InputComponent: FC<IProps & HTMLProps<HTMLInputElement>>
*/

const InputComponent: FC<IProps> = ({
	defaultClasses = 'input',
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

	const handleInputProps = () => {
		const inputProps: InputHTMLAttributes<HTMLInputElement> = {
			className: allClasses,
			...props,
		};

		if (setValues)
			inputProps.onChange = (event: ChangeEvent<HTMLInputElement>) =>
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
