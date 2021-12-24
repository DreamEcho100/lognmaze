import { Fragment } from 'react';

import classes from './index.module.css';

import Accordion from '@components/UI/V1/Accordion';

const AccordionSettingsShower = ({ headerText, bodyItems }) => {
	return (
		<Accordion className={classes.accordion}>
			<Fragment key='header'>
				<h2 className='heading-2'>{headerText}</h2>
			</Fragment>
			<Fragment key='body'>
				<ul>
					{bodyItems.map((item, index) => (
						<li
							key={index}
							className={classes['item-list']}
							style={{ listStyle: 'none', marginLeft: '0', marginRight: '0' }}
						>
							{item}
						</li>
					))}
				</ul>
			</Fragment>
		</Accordion>
	);
};

export default AccordionSettingsShower;
