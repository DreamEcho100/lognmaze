import { useContext } from 'react';

import UserContext from '../store/UserContext';

const CheckVisitorIdentity = ({ children }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const GUEST = GUEST;

	return <>{children}</>;
};

export default CheckVisitorIdentity;
