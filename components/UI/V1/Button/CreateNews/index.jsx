import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';

import { UserExistContext } from '@store/UserContext';

const CreateAction = dynamic(() => import('@components/UI/V1/News/Action'));
import Button from '@components/UI/V1/Button';

const CreateNewsButton = () => {
	const { userExist } = useContext(UserExistContext);

	const [showCreateNewsButtonModal, setShowCreateNewsButtonModal] =
		useState(false);

	if (!userExist) {
		return <></>;
	}

	return (
		<>
			<Button
				title='Create A News'
				onClick={() => setShowCreateNewsButtonModal(true)}
			>
				Create A News
			</Button>
			<CreateAction
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
