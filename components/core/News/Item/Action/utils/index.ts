import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

	export const sharedInputProps = (elementProps?: {
		maxLength?: number | undefined;
		minLength?: number | undefined;
    className?: string;
	}) => {
		const props: InputHTMLAttributes<HTMLInputElement> = {
			className: elementProps?.className,// classes.input,
			required: true,
			spellCheck: true,
		};
		if (elementProps?.minLength) props.minLength = elementProps.minLength;
		if (elementProps?.maxLength) props.maxLength = elementProps.maxLength;

		if (elementProps?.minLength || elementProps?.maxLength) {
			props.pattern = `.{${elementProps?.minLength || ''},${
				elementProps?.maxLength || ''
			}}`;
		}

		return props;
	};

	export const sharedTextareaProps = (elementProps?: {
		maxLength?: number | undefined;
		minLength?: number | undefined;
    className?: string;
	}) => {
		const props: TextareaHTMLAttributes<HTMLTextAreaElement> = {
			className: elementProps?.className,// `${classes.textarea} ${borderClasses.default}`,
			required: true,
			spellCheck: true,
		};
		if (elementProps?.minLength) props.minLength = elementProps.minLength;
		if (elementProps?.maxLength) props.maxLength = elementProps.maxLength;

		// if (elementProps?.minLength || elementProps?.maxLength) {
		// 	props.pattern = `.{${elementProps?.minLength || ''},${elementProps?.maxLength || ''}}`;
		// }

		return props;
	};