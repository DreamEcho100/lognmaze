import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleAllClasses } from '@/lib/v1/className';

import classes from './index.module.css';

const DropdownMenu = ({
	defaultClasses = 'settings-wrapper',
	extraClasses = '',
	className = '',
	items = [],
	children,
}) => {
	const [showSettingsMenu, setShowSettingsMenu] = useState(false);

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	return (
		<div className={allClasses}>
			<button title='dropdown menu' className={classes['seeting-btn']}>
				<strong onClick={() => setShowSettingsMenu((prev) => !prev)}>
					<FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
				</strong>
			</button>
			<ul
				className={`${classes['settings-menu']} ${
					showSettingsMenu ? classes['show-settings-menu'] : ''
				}`}
			>
				{items.map(
					(
						{
							Element = () => {
								return <></>;
							},
							props = {},
							className = '',
						},
						index
					) => (
						<li
							key={index}
							className={`${classes['settings-item']} ${className}`}
						>
							<Element {...props} />
						</li>
					)
				)}
				{children}
			</ul>
		</div>
	);
};

export default DropdownMenu;
