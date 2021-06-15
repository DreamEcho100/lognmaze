import PostModalTemplate1 from '../PostModalTemplate1/PostModalTemplate1';

const Update = ({ closeModal, postContent }) => {
	const fetcher = async ({ bodyObj, token }) =>
		await fetch(`/api/v1/users/posts/update/${postContent.id}`, {
			method: 'PATCH',
			body: JSON.stringify(bodyObj),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});

	return (
		<PostModalTemplate1
			closeModal={closeModal}
			fetcher={fetcher}
			postContent={postContent}
			templateType='update'
		/>
	);
};

export default Update;
