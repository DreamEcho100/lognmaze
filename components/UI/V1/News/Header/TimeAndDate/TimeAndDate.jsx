// import classes from './TimeAndDate.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';

const TimeAndDate = ({ setShowModal, created_at, updated_on }) => (
	<div
		className=''
		onClick={() => {
			if (setShowModal) setShowModal(true);
		}}
	>
		<p>
			Created At:{' '}
			{
				dateToHumanReadableDate(created_at, {
					locale: 'en-us',
					format: { day: 'numeric', month: 'long', year: 'numeric' },
					withTime: true,
				}).dateAndTimeString
			}
		</p>
		{updated_on !== created_at ? (
			<p>
				Updated On:{' '}
				{
					dateToHumanReadableDate(updated_on, {
						locale: 'en-us',
						format: { day: 'numeric', month: 'long', year: 'numeric' },
						withTime: true,
					}).dateAndTimeString
				}
			</p>
		) : null}
	</div>
);

export default TimeAndDate;
