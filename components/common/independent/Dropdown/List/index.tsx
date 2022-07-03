import { FC, ReactNode } from 'react';

import classes from './index.module.css';

import { bundleClassesIfExist } from '@commonLibIndependent/className';

interface IProps {
	defaultClassName?: string;
	className?: string;
	isDropdownListVisible: boolean;
	children: ReactNode;
}

const DropdownList: FC<IProps> = ({
	defaultClassName = 'settingsMenu',
	className = '',
	isDropdownListVisible,
	children,
}) => {
	const allClasses = bundleClassesIfExist([
		classes[defaultClassName],
		className,
	]);

	if (!isDropdownListVisible) return <></>;

	return <ul className={allClasses}>{children}</ul>;
};

export default DropdownList;
