import {
	// useEffect, useRef,
	useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const DropdownMenu = ({ items = [], children }) => {
	// const ulRef = useRef();

	const [showSettingsMenu, setShowSettingsMenu] = useState(false);

	// useEffect(() => {
	// 	if (showSettingsMenu) ulRef.current.focus();
	// }, [showSettingsMenu]);

	return (
		<div className={classes['settings-wrapper']}>
			<button title='ellipsis-v svg' className={classes['seeting-btn']}>
				<strong onClick={() => setShowSettingsMenu((prev) => !prev)}>
					<FontAwesomeIcon icon={['fas', 'ellipsis-v']} />
				</strong>
			</button>
			<ul
				// ref={ulRef}
				className={`${classes['settings-menu']} ${
					showSettingsMenu ? classes['show-settings-menu'] : ''
				}`}
				// onBlur={(event) => {
				// 	if (showSettingsMenu) setShowSettingsMenu((prev) => !prev);
				// }}
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
