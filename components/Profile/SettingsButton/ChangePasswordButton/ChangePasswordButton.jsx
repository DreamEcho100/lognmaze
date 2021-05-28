// import { Fragment, useState } from 'react';

// import classes from './ChangePasswordButton.module.css';

// import Modal from '../../../UI/Modal/Modal';
// import Form from './Form/Form';

// const ChangePasswordButton = () => {
// 	const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

// 	const [isPasswordChanging, setIsPasswordChanging] = useState(true);
// 	const [message, setMessage] = useState({
// 		status: '',
// 		message: '',
// 	});

// 	const changePasswordHandler = () => {
// 		// /

// 		// setMessage({
// 		// 	status: '',
// 		// 	message: '',
// 		// });
// 		// /const response = /
// 		// /await fetch('/api/v1/user/change-password', {
// 		// 	method: 'PATCH',
// 		// 	body: JSON.stringify(passwordData),
// 		// 	headers: {
// 		// 		'Content-Type': 'application/json',
// 		// 	},
// 		// })
// 		// 	.then((response) => response.json())
// 		// 	.then((data) => {
// 		// 		console.log(data);
// 		// 		if (data.status === 'error') {
// 		// 			setMessage({
// 		// 				status: 'error',
// 		// 				message: data.message || 'Something went wrong!',
// 		// 			});
// 		// 			return;
// 		// 		}

// 		// 		setMessage({
// 		// 			status: 'success',
// 		// 			message: data.message,
// 		// 		});
// 		// 	})
// 		// 	.catch((error) => {
// 		// 		setMessage({
// 		// 			status: 'error',
// 		// 			message: error.message || 'Something went wrong!',
// 		// 		});
// 		// 		throw new Error(data.message || 'Something went wrong!');
// 		// 	});
//     // /
// 	};

// 	return (
// 		<div>
// 			<button onClick={() => setShowChangePasswordModal(true)}>
// 				Change Password
// 			</button>
// 			{showChangePasswordModal && (
// 				<Modal click={() => setShowChangePasswordModal(false)}>
// 					<Fragment key='header'>Change Password</Fragment>
// 					<Fragment key='body'>
// 						<Form
// 							onChangePassword={changePasswordHandler}
// 							isPasswordChanging={isPasswordChanging}
// 							setIsPasswordChanging={setIsPasswordChanging}
// 							message={message}
// 							setMessage={setMessage}
// 						/>
// 					</Fragment>
// 				</Modal>
// 			)}
// 		</div>
// 	);
// };

// export default ChangePasswordButton;

import { Fragment, useState } from 'react';

import classes from './ChangePasswordButton.module.css';

import Modal from '../../../UI/Modal/Modal';
import Form from './Form/Form';

export const ChangePasswordButton = () => {
	return (
		<div>
			<h1>ChangePasswordButton</h1>
		</div>
	);
};

export default ChangePasswordButton;
