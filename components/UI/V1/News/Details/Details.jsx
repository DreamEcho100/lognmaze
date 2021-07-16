// import Article from './type/Article/Article';
// import Post from './type/Post/Post';
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
					<p onClick={() => setCloseModal(false)}>Keep Reading {'->'}</p>
				</>
			);
		} else if (data.type === 'post') {
			return (
				<>
					<p>{data.content}</p>
				</>
			);
		}
	} else if (detailsType === 'content') {
		if (data.format_type === 'md') {
			return <Md content={data.content || ''} />;
		} else {
			<p>{data.content}</p>;
		}
	}
};

export default Details;
