import { getSession } from 'next-auth/react';

export const reloadSession = () => {
	const event = new Event('visibilitychange');
	document.dispatchEvent(event);
	getSession();
};
