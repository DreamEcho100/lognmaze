import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const DropdownMenu = ({ items }) => {
	const [showSettingsMenu, setShowSettingsMenu] = useState(false);

	return (
		<div className={classes['settings-wrapper']}>
			<button className={classes['seeting-btn']}>
				<strong onClick={() => setShowSettingsMenu((prev) => !prev)}>
					<FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
				</strong>
			</button>
			<ul
				className={`${classes['settings-menu']} ${
					showSettingsMenu ? classes['show-settings-menu'] : ''
				}`}
				onBlur={() => {
					setTimeout(() => {
						if (showSettingsMenu) setShowSettingsMenu(false);
					}, 100);
				}}
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
			</ul>
		</div>
	);
};

export default DropdownMenu;
