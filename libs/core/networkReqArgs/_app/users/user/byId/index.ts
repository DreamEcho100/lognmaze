import { encodeObjectToUrlQueries } from '@commonLibIndependent/object';
import { headersDefault } from '@coreLib/networkReqArgs/__utils';
import { IUpdateByUserNameIdReqArgs } from './ts';

export const updateByUserNameIdReqArgs = ({
	urlOptions,
	bodyContent,
	headerList,
}: IUpdateByUserNameIdReqArgs) => {
	const requestInfo: RequestInfo = `/api/users/user/byId${
		urlOptions?.queries
			? '/?' + encodeObjectToUrlQueries(urlOptions.queries)
			: ''
	}`;
	// const requestInfo: RequestInfo = `/api/users/user/byId`;
	const requestInit: RequestInit = {
		method: 'PUT',
		headers: {
			...headersDefault,
			...headerList,
		},
		body: JSON.stringify(bodyContent),
	};

	return {
		requestInfo,
		requestInit,
	};
};

const networkReqUserByIdArgs = {
	update: updateByUserNameIdReqArgs,
};

export default networkReqUserByIdArgs;
