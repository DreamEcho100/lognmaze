import { Fragment } from 'react';

import classes from './index.module.css';

import Accordion from '@components/UI/V1/Accordion';

const AccordionSettingsShower = ({ headerText, bodyItems }) => {
	return (
		<Accordion>
			<Fragment key='header'>
				<h2>{headerText}</h2>
			</Fragment>
			<Fragment key='body'>
				<ul>
					{bodyItems.map((item, index) => (
						<li key={index} className={classes['item-list']}>
							{item}
						</li>
					))}
				</ul>
			</Fragment>
		</Accordion>
	);
};

export default AccordionSettingsShower;
