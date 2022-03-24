import { FC, HTMLAttributes } from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends HTMLAttributes<HTMLDivElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

const FormControlsComponent: FC<IProps> = ({
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

	const handleFormControlsProps = () => {
		const formControlProps: HTMLAttributes<HTMLDivElement> = {
			className: allClasses,
			...props,
		};

		return formControlProps;
	};

	return <div {...handleFormControlsProps()}>{children}</div>;
};

export default FormControlsComponent;
