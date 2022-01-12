import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IsReturnedInP = ({ newsItemType, description }) =>
	newsItemType === 'blog' ? (
		<>{description}</>
	) : (
		<p
			style={{
				display: 'inline',
			}}
		>
			{description}
		</p>
	);

const HandleShowFullDetailsButton = ({
	setShowFullDetails,
	showFullDetails,
}) => (
	<button
		className='text-glow-special display-inline'
		title='see more'
		onClick={() => setShowFullDetails(!showFullDetails)}
	>
		{!showFullDetails ? (
			<>
				<strong>...</strong>see more
			</>
		) : (
			<>&nbsp;see less</>
		)}
	</button>
);

const Description = ({ description, newsItemType, setShowModal }) => {
	const [showFullDetails, setShowFullDetails] = useState(false);
	const isDescriptionLong = description.replace(/\s\w+\s?$/, '').length > 150;

	return (
		<>
			<IsReturnedInP
				newsItemType={newsItemType}
				description={
					isDescriptionLong && !showFullDetails
						? description.slice(0, 150).replace(/\s\w+\s?$/, '')
						: description
				}
			/>
			{isDescriptionLong && (
				<HandleShowFullDetailsButton
					setShowFullDetails={setShowFullDetails}
					showFullDetails={showFullDetails}
				/>
			)}{' '}
			<button
				className='text-glow-special display-inline'
				title='Keep Reading'
				onClick={() => setShowModal(true)}
			>
				Keep Reading <FontAwesomeIcon icon={['fas', 'book-reader']} />
			</button>
		</>
	);
};

export default Description;
