import { FC } from 'react';

import helpersClasses from '@styles/helpers.module.css';

import { formatDate } from '@commonLibIndependent/date';

interface Props {
	created_at: string | number | Date;
	updated_at: string | number | Date;
}

const TimeAndDate: FC<Props> = ({ created_at, updated_at }) => {
	const handleFormateDate = (dateProvided: string | number | Date) => {
		const { date, time } = formatDate(new Date(dateProvided), {
			format: {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			},
		});

		if (!time) return date;

		return `${date}, ${time}`;
	};

	return (
		<span>
			<time dateTime={new Date(created_at).toISOString()}>
				<small>
					<span className={helpersClasses.fontWeightBold}>Created At:</span>{' '}
					<em>{handleFormateDate(created_at)}</em>
				</small>
			</time>
			{created_at !== updated_at && (
				<time dateTime={new Date(updated_at).toISOString()}>
					<small>
						, <span className={helpersClasses.fontWeightBold}>Updated On:</span>{' '}
						<em>{handleFormateDate(updated_at)}</em>
					</small>
				</time>
			)}
		</span>
	);
};

export default TimeAndDate;
