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
			<span>
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
			</span>
			{created_at !== updated_on && (
				<span>
					<small>
						, <strong>Updated On:</strong>{' '}
						<em>
							{
								dateToHumanReadableDate(updated_on, {
									withTime: true,
								}).dateAndTimeString
							}
						</em>
					</small>
				</span>
			)}
		</p>
	</div>
);

export default TimeAndDate;
