import { encodeObjectToUrlQueries } from '@commonLibIndependent/object';
import networkReqUserArgs from './user';

interface IGetUsersReqArgs {
	urlOptions: {
		queries?: {
			$any?: string;
			target?: string;
		};
	};
}

export const getUsersReqArgs = ({ urlOptions }: IGetUsersReqArgs) => {
	const requestInfo: RequestInfo = `/api/users${
		urlOptions?.queries
			? '/?' + encodeObjectToUrlQueries(urlOptions?.queries)
			: ''
	}`;
	const requestInit: RequestInit = {
		method: 'GET',
	};

	return {
		requestInfo,
		requestInit,
	};
};

const networkReqUsersArgs = {
	get: getUsersReqArgs,
	user: networkReqUserArgs,
};

export default networkReqUsersArgs;
