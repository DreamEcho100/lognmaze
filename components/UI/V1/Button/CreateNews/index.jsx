import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';

import { useUserSharedState } from '@store/UserContext';

const CreateAction = dynamic(() => import('@components/UI/V1/News/Action'));
import Button from '@components/UI/V1/Button';

const CreateNewsButton = () => {
	const [userState, userDispatch] = useUserSharedState();

	const [showCreateNewsButtonModal, setShowCreateNewsButtonModal] =
		useState(false);

	if (!userState.userExist) {
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
