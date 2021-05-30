import { useState } from 'react';

import classes from './ChangeBasicInfo.module.css';

import Button from '../../../../UI/V1/Button/Button';
import ChangeBasicInfoModal from './ChangeBasicInfoModal/ChangeBasicInfoModal';

const ChangeBasicInfo = () => {
	const [showChangeBasicInfoModal, setShowChangeBasicInfoModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowChangeBasicInfoModal(true)}>
				Change Your Basic Info
			</Button>
			{showChangeBasicInfoModal && (
				<ChangeBasicInfoModal
					closeModal={() => setShowChangeBasicInfoModal(false)}
				/>
			)}
		</>
	);
};

export default ChangeBasicInfo;
