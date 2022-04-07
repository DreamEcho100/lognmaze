import { FC } from 'react';

import classes from './index.module.css';

import { bundleClassesIfExist } from '@commonLibIndependent/className';

interface IProps {
	defaultClassName?: string;
	className?: string;
}

const DropdownMenuItem: FC<IProps> = ({
	defaultClassName = 'settingsItem',
	className = '',
	children,
}) => {
	const allClasses = bundleClassesIfExist([
		classes[defaultClassName],
		className,
	]);

	return <li className={allClasses}>{children}</li>;
};

export default DropdownMenuItem;
