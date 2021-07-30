import { useState } from 'react';
import CreateAction from '../../UI/V1/News/Action/Action';

import Button from '../../UI/V1/Button';

const CreateNewsButton = () => {
	const [showCreateNewsButtonModal, setShowCreateNewsButtonModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowCreateNewsButtonModal(true)}>
				Create A News
			</Button>
			{showCreateNewsButtonModal && (
				<CreateAction
					closeModal={() => setShowCreateNewsButtonModal(false)}
					news={{ type: 'article', action: 'create', route: 'add' }}
				/>
			)}
		</>
	);
};

export default CreateNewsButton;
