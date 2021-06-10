import React from 'react';
import { useEffect, useState } from 'react';

import AllPosts from '../../components/Posts/AllPosts/AllPosts';

const AllPostsPage = ({ data }) => {
	if (data.length === 0) {
		return <p>No Posts Found Here :(</p>;
	}

	return (
		<>
			<AllPosts data={data} />
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	const data = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/user/posts/get-all-posts`
	)
		.then((response) => response.json())
		.then(({ status, message, data }) => {
			if (status === 'error') {
				console.error(message);
				return [];
			}
			const formattedData = data.map(
				({
					id,
					author_id,
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

			return formattedData;
		})
		.catch((error) => {
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
