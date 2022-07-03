import { Dispatch, FC, ReactNode, SetStateAction } from 'react';

import classes from './index.module.css';

import { bundleClassesIfExist } from '@commonLibIndependent/className';

interface IProps {
	defaultClassName?: string;
	className?: string;
	setIsDropdownListVisible: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
}

const DropdownMenuItem: FC<IProps> = ({
	defaultClassName = 'settingsItem',
	className = '',
	setIsDropdownListVisible,
	children,
}) => {
	const allClasses = bundleClassesIfExist([
		classes[defaultClassName],
		className,
	]);

	return (
		<li
			className={allClasses}
			onClick={() => setIsDropdownListVisible((prev) => !prev)}
		>
			{children}
		</li>
	);
};

export default DropdownMenuItem;
