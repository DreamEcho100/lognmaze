import { getSession } from 'next-auth/react';

export const reloadSession = async () => {
	const event = new Event('visibilitychange');
	document.dispatchEvent(event);
	await getSession();
};
