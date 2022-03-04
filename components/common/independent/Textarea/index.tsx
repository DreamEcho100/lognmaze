import { FC, TextareaHTMLAttributes } from 'react';

import classes from './styles.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

const TextareaComponent: FC<IProps> = ({
	defaultClasses = 'textarea',
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

	const handleTextareaProps = () => {
		const textareaProps: TextareaHTMLAttributes<HTMLTextAreaElement> = {
			className: allClasses,
			...props,
		};

		return textareaProps;
	};

	return <textarea {...handleTextareaProps()}>{children}</textarea>;
};

export default TextareaComponent;
