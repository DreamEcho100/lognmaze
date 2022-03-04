import { FC, HTMLAttributes } from 'react';

import classes from './styles.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends HTMLAttributes<HTMLDivElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

const FormControlComponent: FC<IProps> = ({
	defaultClasses = 'FormControls',
	extraClasses,
	className,
	children,
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const handleFormControlProps = () => {
		const formControlProps: HTMLAttributes<HTMLDivElement> = {
			className: allClasses,
			...props,
		};

		return formControlProps;
	};

	return <div {...handleFormControlProps()}>{children}</div>;
};

export default FormControlComponent;
