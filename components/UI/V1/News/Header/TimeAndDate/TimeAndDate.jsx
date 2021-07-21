import classes from './TimeAndDate.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';

const TimeAndDate = ({ setCloseModal, created_at, updated_on }) => (
	<div
		className=''
		onClick={() => {
			if (setCloseModal) setCloseModal(false);
		}}
	>
		<p>
			Created At:{' '}
			{dateToHumanReadableDate(created_at, {
				locale: 'en-us',
				format: { day: 'numeric', month: 'long', year: 'numeric' },
			})}
		</p>
		{updated_on !== created_at ? (
			<p>
				Updated On:{' '}
				{dateToHumanReadableDate(updated_on, {
					locale: 'en-us',
					format: { day: 'numeric', month: 'long', year: 'numeric' },
				})}
			</p>
		) : null}
	</div>
);

export default TimeAndDate;
