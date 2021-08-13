import { useEffect, useState } from 'react';
import Md from '@components/UI/V1/Format/Md';

import classes from './Details.module.css';

const Details = ({ detailsType, setShowModal, data }) => {
	const [loading, setLoading] = useState(
		(detailsType === 'description' && data.description) ||
			(detailsType === 'content' && data.content)
			? false
			: true
	);

	useEffect(() => {
		if (!loading) return;

		if (
			detailsType === 'description' ||
			(detailsType === 'content' && data.content && data.content.length !== 0)
		) {
			setLoading(false);
		}
	}, [data, data.content]);

	if (loading) {
		return (
			<section className={classes.details}>
				<p>Loading...</p>
			</section>
		);
	}

	if (detailsType === 'description') {
		if (data.type === 'article') {
			return (
				<section className={classes.details}>
					<p>{data.description}</p>
					<p onClick={() => setShowModal(true)}>Read More {'->'}</p>
				</section>
			);
		} else if (data.type === 'post') {
			return (
				<section className={classes.details}>
					<p>{data.content}</p>
					<p onClick={() => setShowModal(true)}>Keep Reading {'->'}</p>
				</section>
			);
		}
	} else if (detailsType === 'content') {
		// if (data.format_type === 'md') {
		// 	return <Md content={data.content || ''} />;
		// } else {
		// 	return <p>{data.content}</p>;
		// }
		return (
			<section className={classes.details}>
				<Md content={data.content || ''} />
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
