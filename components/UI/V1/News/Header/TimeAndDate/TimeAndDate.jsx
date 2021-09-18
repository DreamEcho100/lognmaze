import { dateToHumanReadableDate } from '@lib/v1/time';

const TimeAndDate = ({ setShowModal, created_at, updated_at }) => (
	<div
		className=''
		onClick={() => {
			if (setShowModal) setShowModal(true);
		}}
	>
		<time>
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
			{created_at !== updated_at && (
				<span>
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
				</span>
			)}
		</time>
	</div>
);

export default TimeAndDate;
