import { FC } from 'react';

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
					<strong>Created At:</strong> <em>{handleFormateDate(created_at)}</em>
				</small>
			</time>
			{created_at !== updated_at && (
				<time dateTime={new Date(updated_at).toISOString()}>
					<small>
						, <strong>Updated On:</strong>{' '}
						<em>{handleFormateDate(updated_at)}</em>
					</small>
				</time>
			)}
		</span>
	);
};

export default TimeAndDate;
