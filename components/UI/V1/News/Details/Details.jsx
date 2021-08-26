import dynamic from 'next/dynamic';

import classes from './Details.module.css';

const DynamicMd = dynamic(() => import('@components/UI/V1/Format/Md'));
const DynamicContainer = dynamic(() =>
	import('@components/UI/V1/Format/Container')
);

const Details = ({ detailsType, setShowModal, newsItem }) => {
	if (!newsItem?.news_id) {
		return <h2>Not Found</h2>;
	}

	if (
		newsItem.type === 'article' &&
		detailsType === 'content' &&
		newsItem.isLoadingContent
	) {
		return (
			<section className={classes.details}>
				<p>Loading...</p>
			</section>
		);
	}

	if (detailsType === 'description') {
		if (newsItem.type === 'article') {
			return (
				<>
					<section className={classes.details}>
						<p>{newsItem.description}</p>
					</section>
					<p onClick={() => setShowModal(true)}>Read More {'->'}</p>
				</>
			);
		} else if (newsItem.type === 'post') {
			return (
				<>
					<DynamicContainer className={classes.details}>
						<DynamicMd content={newsItem.content} />
					</DynamicContainer>
					<p onClick={() => setShowModal(true)}>Keep Reading {'->'}</p>
				</>
			);
		}
	} else if (detailsType === 'content') {
		return (
			<DynamicContainer className={classes.details}>
				<DynamicMd content={newsItem.content} />
			</DynamicContainer>
		);
	}

	return (
		<section className={classes.details}>
			<p>No Content {':('}</p>
		</section>
	);
};

export default Details;
