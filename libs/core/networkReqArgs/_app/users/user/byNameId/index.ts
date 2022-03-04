import { encodeObjectToUrlQueries } from '@commonLibIndependent/object';
import { IGetByUserNameIdReqArgs } from './ts';

export const getByUserNameIdReqArgs = ({
	urlOptions,
}: IGetByUserNameIdReqArgs) => {
	const requestInfo: RequestInfo = `/api/users/user_name_id${
		urlOptions?.queries
			? '/' + encodeObjectToUrlQueries(urlOptions.queries)
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

const networkReqUserByNameIdArgs = {
	get: getByUserNameIdReqArgs,
};

export default networkReqUserByNameIdArgs;
