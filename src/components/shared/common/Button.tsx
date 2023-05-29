import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';
import Link from 'next/link';

export const handleButtonVariants = cva('font-bold capitalize', {
	variants: {
		theme: {
			primary: 'color-theme-primary-700 xl-sm:rounded-md'
		},
		'theme-animation': {
			primary: [
				'transition-all duration-300',
				'hover:color-theme-primary-600 hover:duration-150',
				'focus:color-theme-primary-100 hover:duration-200 focus:rounded-none focus:ring focus:ring-theme-primary-bg-700'
			]
		},
		p: {
			'sm-xl': 'px-2 py-1',
			sm: 'px-3 py-2',
			md: 'px-4 py-3'
		}
	},
	defaultVariants: {
		theme: 'primary',
		'theme-animation': 'primary',
		p: 'md'
	}
});

type Props =
	| ({
			isAlink?: undefined;
			variants?: VariantProps<typeof handleButtonVariants>;
	  } & ButtonHTMLAttributes<HTMLButtonElement>)
	| ({
			isAlink: true;
			variants?: VariantProps<typeof handleButtonVariants>;
	  } & Parameters<typeof Link>[0]);

const Button = ({ variants, ...props }: Props) => {
	if (props.isAlink) {
		const { isAlink, ..._props } = props;
		return <Link {..._props} className={handleButtonVariants(variants)} />;
	}

	return (
		<button
			type='button'
			{...props}
			className={handleButtonVariants(variants)}
		/>
	);
};

export default Button;
