import { FC, ButtonHTMLAttributes } from 'react';

import classes from '@styles/components/common/independent/Button/index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

const ButtonComponent: FC<IProps> = ({
	defaultClasses = 'default',
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
