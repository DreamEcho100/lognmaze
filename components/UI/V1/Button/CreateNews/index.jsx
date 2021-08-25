import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';

import UserContextTest from '@store/UserContextTest';

const CreateAction = dynamic(() =>
	import('@components/UI/V1/News/Action/Action')
);
import Button from '@components/UI/V1/Button';

const CreateNewsButton = () => {
	const { state: userState } = useContext(UserContextTest);

	if (!userState.userExist) {
		return <></>;
	}

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
