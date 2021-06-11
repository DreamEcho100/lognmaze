import React from 'react';
import { useEffect, useState } from 'react';

import AllPosts from '../../components/Posts/AllPosts/AllPosts';

const AllPostsPage = ({ data }) => {
	if (data.length === 0) {
		return <p>No Posts Found Here :(</p>;
	}

	const formattedData = data.map(
		({
			id,
			author_id,
			author_user_name_id,
			format_type,
			title,
			meta_title,
			slug,
			image,
			tags,
			meta_description,
			excerpt,
			content,
			like_user_id,
			likes,
			created_at,
			updated_on,
			user_name_id,
			first_name,
			last_name,
			profile_picture,
		}) => {
			const author = {
				user_name_id,
				first_name,
				last_name,
				profile_picture,
			};
			const post = {
				id,
				author_id,
				author_user_name_id,
				format_type,
				title,
				meta_title,
				slug,
				image,
				tags,
				meta_description,
				excerpt,
				content,
				like_user_id,
				likes,
				created_at,
				updated_on,
			};

			return { author, post };
		}
	);

	return (
		<>
			<AllPosts data={formattedData} />
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	let data = [];
	data = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/users/posts/get/all`
	)
		.then((response) => response.json())
		.then(({ status, message, data }) => {
			if (status === 'error') {
				console.error(message);
				return [];
			}

			return data;
		})
		.catch((error) => {
			console.warn('Oh Come On -_-');
			console.error(error);
			return [];
		});

	return {
		props: {
			data,
		},
	};
};

export default AllPostsPage;
