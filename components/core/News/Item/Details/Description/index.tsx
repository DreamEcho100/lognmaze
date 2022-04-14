import { FC, useRef, useState } from 'react';

import classes from './index.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import helpersClasses from '@styles/helpers.module.css';
import FormatContainer from '@commonComponentsIndependent/Format/Container';

interface INewsItemDescriptionDetailsProps {
	description: string;
	handleSetIsModalVisible: (isModelShown: boolean) => void;
}

const NewsItemDescriptionDetails: FC<INewsItemDescriptionDetailsProps> = ({
	description,
	handleSetIsModalVisible,
}) => {
	const detailsRef = useRef<HTMLDivElement>(null);

	const [isFullDetailsVisible, setIsFullDetailsVisible] = useState(
		!!(description.length <= 150)
	);
	const isDescriptionLong = description.length > 150;

	return (
		<FormatContainer className={classes.formatContainer}>
			<div
				className={`${classes.detailContainer} ${
					!isFullDetailsVisible ? classes.notAllTheDetails : ''
				}`}
			>
				<div ref={detailsRef} className={classes.details}>
					<p>{description}</p>
				</div>
				<button
					title='click to see the full description'
					className={classes.cover}
					onClick={() => setIsFullDetailsVisible(true)}
				></button>
			</div>
			{isDescriptionLong &&
				(!isFullDetailsVisible ? (
					<button
						className={`${helpersClasses.textGlowSpecial} ${helpersClasses.displayInline}`}
						title='click to see the full description'
						onClick={() => setIsFullDetailsVisible(true)}
					>
						<span className={helpersClasses.fontWeightBold}>...</span>see more
					</button>
				) : (
					<button
						className={`${helpersClasses.textGlowSpecial} ${helpersClasses.displayInline}`}
						title='click to see less of the description'
						onClick={() => {
							setIsFullDetailsVisible(false);
							if (detailsRef.current) {
								detailsRef.current.scrollIntoView();
							}
						}}
					>
						see less
					</button>
				))}{' '}
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
