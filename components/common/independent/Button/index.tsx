import { FC, ButtonHTMLAttributes } from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

const ButtonComponent: FC<IProps> = ({
	defaultClasses = 'button',
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

	const handleButtonProps = () => {
		const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
			className: allClasses,
			...props,
		};

		return buttonProps;
	};

	return <button {...handleButtonProps()}>{children}</button>;
};

export default ButtonComponent;
