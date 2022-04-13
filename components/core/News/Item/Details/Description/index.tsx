import { FC, useState } from 'react';

import classes from './index.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TNewsItemData } from '@coreLib/ts/global';

import helpersClasses from '@styles/helpers.module.css';
import FormatContainer from '@commonComponentsIndependent/Format/Container';

interface INewsItemDescriptionDetailsProps {
	description: string;
	newsItemType: TNewsItemData['type']; // 'blog' | 'post';
	handleSetIsModalVisible: (isModelShown: boolean) => void;
}

const NewsItemDescriptionDetails: FC<INewsItemDescriptionDetailsProps> = ({
	description,
	newsItemType,
	handleSetIsModalVisible,
}) => {
	const [isFullDetailsShawn, setIsFullDetailsShawn] = useState(
		!!(description.length <= 150)
	);
	const isDescriptionLong = description.length > 150;

	const handleIsFullDetailsShawn = (isFullDetailsShawn: boolean) =>
		setIsFullDetailsShawn(isFullDetailsShawn);

	return (
		<FormatContainer className={classes.formatContainer}>
			<div
				className={`${classes.detailContainer} ${
					!isFullDetailsShawn ? classes.notAllTheDetails : ''
				}`}
			>
				<div className={classes.details}>
					{newsItemType === 'blog' ? (
						description
					) : (
						<p
							style={{
								display: 'inline',
							}}
						>
							{description}
						</p>
					)}
				</div>
			</div>
			{isDescriptionLong && (
				<button
					className={`${helpersClasses.textGlowSpecial} ${helpersClasses.displayInline}`}
					title='see more'
					onClick={() => handleIsFullDetailsShawn(!isFullDetailsShawn)}
				>
					{!isFullDetailsShawn ? (
						<>
							<span className={helpersClasses.fontWeightBold}>...</span>see more
						</>
					) : (
						<>&nbsp;see less</>
					)}
				</button>
			)}{' '}
			<button
				className={`${helpersClasses.textGlowSpecial} ${helpersClasses.displayInline}`}
				title='Keep Reading'
				onClick={() => handleSetIsModalVisible(true)}
			>
				Keep Reading <FontAwesomeIcon icon={['fas', 'book-reader']} />
			</button>
		</FormatContainer>
	);
};

export default NewsItemDescriptionDetails;
