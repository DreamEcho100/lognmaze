import {
	ChangeEvent,
	Dispatch,
	FC,
	SetStateAction,
	SelectHTMLAttributes,
} from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues?: Dispatch<SetStateAction<any>>;
}

const SelectComponent: FC<IProps> = ({
	defaultClasses = 'select',
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

	const handleSelectProps = () => {
		const selectProps: SelectHTMLAttributes<HTMLSelectElement> = {
			className: allClasses,
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
