import { useState } from 'react';
// import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Details.module.css';

// const DynamicMd = dynamic(() => import('@components/UI/V1/Format/Md'));
// const DynamicContainer = dynamic(() =>
// 	import('@components/UI/V1/Format/Container')
// );

import Md from '@components/UI/V1/Format/Md';
import FormatterContainer from '@components/UI/V1/Format/Container';

const Details = ({
	isLoadingSkeleton,
	detailsType,
	setShowModal,
	newsItem,
}) => {
	const [showFullDetails, setShowFullDetails] = useState(false);

	if (!isLoadingSkeleton && !newsItem?.news_id) {
		return <h2>Not Found</h2>;
	}

	if (
		isLoadingSkeleton ||
		(newsItem.type === 'article' &&
			detailsType === 'content' &&
			newsItem.isLoadingContent)
	) {
		return (
			<section
				className={`${classes.details} ${
					isLoadingSkeleton
						? `${classes.isLoadingSkeleton} skeleton-loading`
						: ''
				}`}
			></section>
		);
	}

	if (detailsType === 'description') {
		if (newsItem.type === 'article') {
			return (
				<>
					<section className={classes.details}>
						<FormatterContainer>
							{newsItem.description.replace(/\s\w+\s?$/, '').length < 150 ? (
								newsItem.description
							) : (
								<>
									{!showFullDetails && (
										<>
											{newsItem.description
												.slice(0, 150)
												.replace(/\s\w+\s?$/, '')}
											<button
												className='text-glow-special display-inline'
												title='see more'
												onClick={() => setShowFullDetails(true)}
											>
												<strong>...</strong>see more
											</button>
										</>
									)}
									{showFullDetails && (
										<>
											{newsItem.description}{' '}
											<button
												className='text-glow-special display-inline'
												title='see less'
												onClick={() => setShowFullDetails(false)}
											>
												see less
											</button>
										</>
									)}
								</>
							)}
						</FormatterContainer>
					</section>
					<button
						className='text-glow-special display-inline'
						title='Keep Reading'
						onClick={() => setShowModal(true)}
					>
						Keep Reading <FontAwesomeIcon icon={['fas', 'book-reader']} />
					</button>
				</>
			);
		} else if (newsItem.type === 'post') {
			return (
				<FormatterContainer>
					{newsItem.content.replace(/\s\w+\s?$/, '').length < 150 ? (
						newsItem.content
					) : (
						<>
							{!showFullDetails && (
								<>
									<p>
										{newsItem.content.slice(0, 150).replace(/\s\w+\s?$/, '')}
									</p>
									<button
										className='text-glow-special display-inline'
										title='see more'
										onClick={() => setShowFullDetails(true)}
									>
										<strong>...</strong>see more
									</button>
								</>
							)}
							{showFullDetails && (
								<>
									<p>{newsItem.content}</p>
									<button
										className='text-glow-special display-inline'
										title='see less'
										onClick={() => setShowFullDetails(false)}
									>
										see less
									</button>
								</>
							)}
						</>
					)}
				</FormatterContainer>
			);
		}
	} else if (detailsType === 'content') {
		return (
			<FormatterContainer className={classes.details}>
				<Md content={newsItem.content} addHorizontalPhotoAd1={true} />
			</FormatterContainer>
		);
	}

	return (
		<section className={classes.details}>
			<p>No Content {':('}</p>
		</section>
	);
};

export default Details;
