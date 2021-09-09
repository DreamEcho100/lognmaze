import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const DropdownMenu = ({ items = [], children }) => {
	const [showSettingsMenu, setShowSettingsMenu] = useState(false);

	return (
		<div className={classes['settings-wrapper']}>
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
