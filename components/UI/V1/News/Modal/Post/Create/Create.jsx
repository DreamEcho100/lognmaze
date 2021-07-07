import PostModalTemplate1 from '../PostModalTemplate1/PostModalTemplate1';

const Update = ({ closeModal }) => {
	const fetcher = async ({ bodyObj, token }) =>
		await fetch('/api/v1/users/posts/add', {
			method: 'POST',
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
			templateType='create'
		/>
	);
};

export default Update;
