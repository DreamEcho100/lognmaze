import { useEffect, useState } from 'react';
import Md from '../Format/Md/Md';

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
		return <p>Loading...</p>;
	}

	if (detailsType === 'description') {
		if (data.type === 'article') {
			return (
				<section>
					<p>{data.description}</p>
					<p onClick={() => setShowModal(true)}>
						Read More on a Pop Up Window {'->'}
					</p>
				</section>
			);
		} else if (data.type === 'post') {
			return (
				<section>
					<p>{data.content}</p>
					<p onClick={() => setShowModal(true)}>
						Keep Reading On a Pop Up Window {'->'}
					</p>
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
			<section>
				<Md content={data.content || ''} />
			</section>
		);
	}

	return (
		<section>
			<p>No Content {':('}</p>
		</section>
	);
};

export default Details;
