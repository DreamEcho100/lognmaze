import { FC, FormHTMLAttributes } from 'react';

import classes from './styles.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
}

const FormComponent: FC<IProps> = ({
	defaultClasses = 'form',
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

	const handleFormProps = () => {
		const formProps: FormHTMLAttributes<HTMLFormElement> = {
			className: allClasses,
			...props,
		};

		return formProps;
	};

	return <form {...handleFormProps()}>{children}</form>;
};

export default FormComponent;
