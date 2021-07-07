import ArticleModalTemplate1 from '../ArticleModalTemplate1/ArticleModalTemplate1';

const Update = ({ closeModal, articleContent, setArticleContent }) => {
	const fetcher = async ({ bodyObj, token }) =>
		await fetch(`/api/v1/users/news/update/${articleContent.id}`, {
			method: 'PATCH',
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
			articleContent={articleContent}
			setArticleContent={setArticleContent}
			templateType='update'
		/>
	);
};

export default Update;
