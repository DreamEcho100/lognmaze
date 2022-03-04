import { FC, LabelHTMLAttributes } from 'react';

import classes from './styles.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

const LabelComponent: FC<IProps> = ({
	defaultClasses = 'label',
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

	const handleLabelProps = () => {
		const labelProps: LabelHTMLAttributes<HTMLLabelElement> = {
			className: allClasses,
			...props,
		};

		return labelProps;
	};

	return <label {...handleLabelProps()}>{children}</label>;
};

export default LabelComponent;
