import { Fragment } from 'react';

import classes from './index.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';

import Accordion from '@components/UI/V1/Accordion';

const SensitiveDataAccordion = ({ userData }) => {
	return (
		<Accordion>
			<Fragment key='header'>
				<h2>Sensitive Data</h2>
			</Fragment>
			<Fragment key='body'>
				<div className={classes['accordion-body']}>
					<p>{userData.role}</p>

					{/* <p>{userData.state_of_birth}</p>
					<p>{userData.country_of_birth}</p>
					<p>{userData.city_of_birth}</p> */}

					<p>{userData.address_of_resident}</p>

					<p>
						Date of birth:{' '}
						{
							dateToHumanReadableDate(userData.date_of_birth, {
								withTime: true,
							}).dateString
						}
					</p>

					<p>{userData.email}</p>
					<p>{userData.email_verified}</p>

					<p>
						Last time sign in:{' '}
						{
							dateToHumanReadableDate(userData.last_sign_in, {
								withTime: true,
							}).dateAndTimeString
						}
					</p>
				</div>
			</Fragment>
		</Accordion>
	);
};

export default SensitiveDataAccordion;
