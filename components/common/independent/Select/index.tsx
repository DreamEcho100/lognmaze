import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	SelectHTMLAttributes,
} from 'react';

import classes from './index.module.css';

interface IProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues?: Dispatch<SetStateAction<any>>;
}

const SelectComponent: FC<IProps> = ({
	className,
	children,
	setValues,
	...props
}) => {
	const handleSelectProps = () => {
		const selectProps: SelectHTMLAttributes<HTMLSelectElement> = {
			className:
				typeof className === 'function'
					? className(classes.default)
					: typeof className === 'string'
					? `${classes.default} ${className}`
					: classes.default,
			...props,
		};

		if (setValues)
			selectProps.onChange = (event: ChangeEvent<HTMLSelectElement>) =>
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setValues((prev: any) => ({
					...prev,
					[event.target.name]: event.target.value,
				}));
		else if (props.onChange) selectProps.onChange = props.onChange;

		return selectProps;
	};

	return (
		<select {...handleSelectProps()}>
			{/* {disabledOption.text !== 0 && (
				<option disabled>{disabledOption.text}</option>
			)} */}
			{children}
		</select>
	);
};

export default SelectComponent;
