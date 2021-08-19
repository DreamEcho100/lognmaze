export const validateEmail = (userEmail) => {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
};

export const validatePasswordStrength = (userPassword) => {
	const strongPasswordRequirements = [
		'The password must contain at least 1 lowercase alphabetical character',
		'The password must contain at least 1 uppercase alphabetical character',
		'The password must contain at least 1 numeric character',
		'The password must contain at least one special character',
		'The password must be eight characters or longer',
	];

	if (
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
			userPassword
		)
	) {
		return {
			strength: 'strong',
			strongPasswordRequirements,
		};
	}

	if (
		/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(
			userPassword
		)
	) {
		return {
			strength: 'medium',
			strongPasswordRequirements,
		};
	}

	return {
		strength: 'weak',
		strongPasswordRequirements,
	};
};
