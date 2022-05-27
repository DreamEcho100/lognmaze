import { Dispatch, FC, HTMLAttributes, SetStateAction } from 'react';

import classes from './index.module.css';

interface IWrapperProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
}
interface IProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	isDropdownListVisible: boolean;
	setIsDropdownListVisible: Dispatch<SetStateAction<boolean>>;
	wrapperProps?: IWrapperProps;
}

const DropdownRoot: FC<IProps> = ({
	className,
	isDropdownListVisible,
	setIsDropdownListVisible,
	children,
	wrapperProps = {
		className: classes.wrapper,
	},
	...props
}) => {
	return (
		<div
			className={
				typeof className === 'function'
					? className(classes.default)
					: typeof className === 'string'
					? `${classes.default} ${className}`
					: classes.default
			}
			{...props}
		>
			{isDropdownListVisible && (
				<div
					{...wrapperProps}
					className={
						typeof wrapperProps.className === 'function'
							? wrapperProps.className(classes.default)
							: wrapperProps.className
					}
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
