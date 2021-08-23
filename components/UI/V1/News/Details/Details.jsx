import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import classes from './Details.module.css';

const DynamicMd = dynamic(() => import('@components/UI/V1/Format/Md'));

const Details = ({ detailsType, setShowModal, newsItem }) => {
	if (!newsItem?.news_id) {
		return <h2>Not Found</h2>;
	}

	const [loading, setLoading] = useState(
		(detailsType === 'description' && newsItem.description) ||
			(detailsType === 'content' && newsItem.content)
			? false
			: true
	);

	useEffect(() => {
		if (!loading) return;

		if (
			detailsType === 'description' ||
			(detailsType === 'content' &&
				newsItem.content &&
				newsItem.content.length !== 0)
		) {
			setLoading(false);
		}
	}, [newsItem, newsItem.content]);

	if (loading) {
		return (
			<section className={classes.details}>
				<p>Loading...</p>
			</section>
		);
	}

	if (detailsType === 'description') {
		if (newsItem.type === 'article') {
			return (
				<section className={classes.details}>
					<p>{newsItem.description}</p>
					<p onClick={() => setShowModal(true)}>Read More {'->'}</p>
				</section>
			);
		} else if (newsItem.type === 'post') {
			return (
				<section className={classes.details}>
					<p>{newsItem.content}</p>
					<p onClick={() => setShowModal(true)}>Keep Reading {'->'}</p>
				</section>
			);
		}
	} else if (detailsType === 'content') {
		// if (newsItem.format_type === 'md') {
		// 	return <Md content={newsItem.content || ''} />;
		// } else {
		// 	return <p>{newsItem.content}</p>;
		// }
		return (
			<section className={classes.details}>
				<DynamicMd content={newsItem.content || ''} />
			</section>
		);
	}

	return (
		<section className={classes.details}>
			<p>No Content {':('}</p>
		</section>
	);
};

export default Details;
