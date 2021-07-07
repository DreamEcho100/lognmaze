import ArticleModalTemplate1 from '../ArticleModalTemplate1/ArticleModalTemplate1';

const Create = ({ closeModal }) => {
	const fetcher = async ({ bodyObj, token }) =>
		await fetch('/api/v1/users/news/add', {
			method: 'POST',
			body: JSON.stringify(bodyObj),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		});

	return (
		<ArticleModalTemplate1
			closeModal={closeModal}
			fetcher={fetcher}
			templateType='create'
		/>
	);
};

export default Create;
