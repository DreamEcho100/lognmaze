import { memo } from 'react';

import classes from './index.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';

const TimeAndDate = ({
	isLoadingSkeleton,
	setShowModal,
	created_at,
	updated_at,
}) => (
	<div
		className={`${classes.TimeAndDate} ${
			isLoadingSkeleton ? `${classes.isLoadingSkeleton} skeleton-loading` : ''
		}`}
		onClick={() => {
			if (setShowModal) setShowModal(true);
		}}
	>
		{!isLoadingSkeleton && created_at && (
			<span>
				<time dateTime={created_at}>
					<small>
						<strong>Created At:</strong>{' '}
						<em>
							{
								dateToHumanReadableDate(created_at, {
									withTime: true,
								}).dateAndTimeString
							}
						</em>
					</small>
				</time>
				{created_at !== updated_at && (
					<time dateTime={updated_at}>
						<small>
							, <strong>Updated On:</strong>{' '}
							<em>
								{
									dateToHumanReadableDate(updated_at, {
										withTime: true,
									}).dateAndTimeString
								}
							</em>
						</small>
					</time>
				)}
			</span>
		)}
	</div>
);

const timeAndDatePropsAreEqual = (prevTimeAndDate, nextTimeAndDate) => {
	return (
		prevTimeAndDate.updated_at === nextTimeAndDate.updated_at &&
		prevTimeAndDate.isLoadingSkeleton === nextTimeAndDate.isLoadingSkeleton
	);
};

const MemoizedTimeAndDate = memo(TimeAndDate, timeAndDatePropsAreEqual);

export default MemoizedTimeAndDate;
