import { Fragment } from 'react';

import Accordion from '@/components/UI/V1/Accordion';

const SensitiveDataAccordion = ({ userData }) => {
	return (
		<Accordion>
			<Fragment key='header'>
				<h2>Sensitive Data</h2>
			</Fragment>
			<Fragment key='body'>
				<div>
					<p>{userData.role}</p>

					<p>{userData.state_of_birth}</p>
					<p>{userData.country_of_birth}</p>
					<p>{userData.city_of_birth}</p>

					<p>{userData.address_of_resident}</p>

					<p>{userData.date_of_birth}</p>

					<p>{userData.email}</p>
					<p>{userData.email_verified}</p>

					<p>{userData.last_sign_in}</p>
				</div>
			</Fragment>
		</Accordion>
	);
};

export default SensitiveDataAccordion;
