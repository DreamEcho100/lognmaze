import { useRouter } from 'next/router';

import Settings from '../../../components/Profile/Settings/Settings';

const SettingsPage = () => {
	const router = useRouter();
	console.log(router);

	return (
		<>
			<Settings />
		</>
	);
};

export default SettingsPage;
