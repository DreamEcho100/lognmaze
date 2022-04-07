import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { handleAllClasses } from '@lib/v1/className';

import classes from './index.module.css';

import { bundleClassesIfExist } from '@commonLibIndependent/className';

interface IProps {
	defaultClassName?: string;
	className?: string;
	isDropdownListVisible: boolean;
	setIsDropdownListVisible: Dispatch<SetStateAction<boolean>>;
}

const DropdownRoot: FC<IProps> = ({
	defaultClassName = 'settingsWrapper',
	className = '',
	isDropdownListVisible,
	setIsDropdownListVisible,
	children,
}) => {
	const allClasses = bundleClassesIfExist([
		classes[defaultClassName],
		className,
	]);

	return (
		<div className={allClasses}>
			{isDropdownListVisible && (
				<div
					className={classes.wrapper}
					onClick={() => setIsDropdownListVisible((prev) => !prev)}
				></div>
			)}
			{children}
		</div>
	);
};

export default DropdownRoot;
/*
				<strong onClick={() => setIsDropdownListVisible((prev) => !prev)}>
					<FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
				</strong>
*/
