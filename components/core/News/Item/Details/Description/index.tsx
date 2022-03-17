import { FC, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TNewsItemData } from '@coreLib/ts/global';

interface IIsReturnedInPProps {
	newsItemType: TNewsItemData['type'];
	description: string;
}

interface INewsItemDescriptionDetailsProps {
	description: string;
	newsItemType: TNewsItemData['type']; // 'blog' | 'post';
	handleSetIsModalVisible: (isModelShown: boolean) => void;
}

interface IHandleShowFullDetailsButtonProps {
	handleIsFullDetailsShawn: (isFullDetailsShawn: boolean) => void;
	isFullDetailsShawn: boolean;
}

const IsReturnedInP: FC<IIsReturnedInPProps> = ({
	newsItemType,
	description,
}) =>
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

const HandleShowFullDetailsButton: FC<IHandleShowFullDetailsButtonProps> = ({
	handleIsFullDetailsShawn,
	isFullDetailsShawn,
}) => (
	<button
		className='text-glow-special display-inline'
		title='see more'
		onClick={() => handleIsFullDetailsShawn(!isFullDetailsShawn)}
	>
		{!isFullDetailsShawn ? (
			<>
				<strong>...</strong>see more
			</>
		) : (
			<>&nbsp;see less</>
		)}
	</button>
);

const NewsItemDescriptionDetails: FC<INewsItemDescriptionDetailsProps> = ({
	description,
	newsItemType,
	handleSetIsModalVisible,
}) => {
	const [isFullDetailsShawn, setIsFullDetailsShawn] = useState(false);
	const isDescriptionLong = description.replace(/\s\w+\s?$/, '').length > 150;

	const handleIsFullDetailsShawn = (isFullDetailsShawn: boolean) =>
		setIsFullDetailsShawn(isFullDetailsShawn);

	return (
		<>
			<IsReturnedInP
				newsItemType={newsItemType}
				description={
					isDescriptionLong && !isFullDetailsShawn
						? description.slice(0, 150).replace(/\s\w+\s?$/, '')
						: description
				}
			/>
			{isDescriptionLong && (
				<HandleShowFullDetailsButton
					handleIsFullDetailsShawn={handleIsFullDetailsShawn}
					isFullDetailsShawn={isFullDetailsShawn}
				/>
			)}{' '}
			<button
				className='text-glow-special display-inline'
				title='Keep Reading'
				onClick={() => handleSetIsModalVisible(true)}
			>
				Keep Reading <FontAwesomeIcon icon={['fas', 'book-reader']} />
			</button>
		</>
	);
};

export default NewsItemDescriptionDetails;
