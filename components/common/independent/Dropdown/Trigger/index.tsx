import { ButtonHTMLAttributes, Dispatch, FC, SetStateAction } from 'react';

import classes from './index.module.css';

import { bundleClassesIfExist } from '@commonLibIndependent/className';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	defaultClassName?: string;
	className?: string;
	setIsDropdownListVisible: Dispatch<SetStateAction<boolean>>;
}

const DropdownTriggerMenu: FC<IProps> = ({
	defaultClassName = 'settingsButton',
	className = '',
	// isDropdownListVisible,
	setIsDropdownListVisible,
	children,
	...props
}) => {
	const allClasses = bundleClassesIfExist([
		classes[defaultClassName],
		className,
	]);

	return (
		<button
			onClick={() => setIsDropdownListVisible((prev) => !prev)}
			className={allClasses}
			{...props}
		>
			{children}
		</button>
	);
};

export default DropdownTriggerMenu;
