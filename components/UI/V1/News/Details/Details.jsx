import { useEffect, useState } from 'react';
import Md from '../Format/Md/Md';

import classes from './Details.module.css';

const Details = ({ detailsType, setCloseModal, data }) => {
	const [loading, setLoading] = useState(true);

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
				<>
					<p>{data.description}</p>
					<p onClick={() => setCloseModal(false)}>
						Read More on a Pop Up Window {'->'}
					</p>
				</>
			);
		} else if (data.type === 'post') {
			return (
				<>
					<p>{data.content}</p>
					<p onClick={() => setCloseModal(false)}>
						Keep Reading On a Pop Up Window {'->'}
					</p>
				</>
			);
		}
	} else if (detailsType === 'content') {
		if (data.format_type === 'md') {
			return <Md content={data.content || ''} />;
		} else {
			return <p>{data.content}</p>;
		}
	}

	return <p>No Content {':('}</p>;
};

export default Details;
