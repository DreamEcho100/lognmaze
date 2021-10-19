import { useState } from 'react';
import dynamic from 'next/dynamic';

const CreateActionDynamic = dynamic(
	() => import('@components/UI/V1/News/Action/Create'),
	{
		ssr: false,
	}
);

import Button from '@components/UI/V1/Button';

const CreateNewsButton = () => {
	const [showCreateNewsButtonModal, setShowCreateNewsButtonModal] =
		useState(false);

	return (
		<>
			<Button
				title='Create A News'
				onClick={() => setShowCreateNewsButtonModal(true)}
			>
				Create A News
			</Button>
			<CreateActionDynamic
				closeModal={() => setShowCreateNewsButtonModal(false)}
				showModal={showCreateNewsButtonModal}
				setShowModal={setShowCreateNewsButtonModal}
				type='article'
				action='create'
			/>
		</>
	);
};

export default CreateNewsButton;
