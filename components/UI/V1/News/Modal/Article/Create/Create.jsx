import ModalTemplate from '../ModalTemplate/ModalTemplate';

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
		<ModalTemplate
			closeModal={closeModal}
			fetcher={fetcher}
			templateType='create'
		/>
	);
};

export default Create;
