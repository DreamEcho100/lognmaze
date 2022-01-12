import { useState } from 'react';
import dynamic from 'next/dynamic';

import { useUserSharedState } from '@store/UserContext';

const CreateAction = dynamic(
	() => import('@components/UI/V1/News/Action/Create'),
	{
		ssr: false,
	}
);
import Button from '@components/UI/V1/Button';

const CreateNewsButton = ({ newsItemData = {} }) => {
	const [userState, userDispatch] = useUserSharedState();

	const [showCreateNewsButtonModal, setShowCreateNewsButtonModal] =
		useState(false);

	if (!userState.userExist) {
		return <></>;
	}

	return (
		<>
			<Button
				title='Create News'
				onClick={() => setShowCreateNewsButtonModal(true)}
			>
				Create News
			</Button>
			<CreateAction
				showModal={showCreateNewsButtonModal}
				setShowModal={setShowCreateNewsButtonModal}
				newsItemData={newsItemData}
			/>
		</>
	);
};

export default CreateNewsButton;
