import { encodeObjectToUrlQueries } from '@commonLibIndependent/object';
import { headersDefault } from '@coreLib/networkReqArgs/__utils';
import { ICreateNewsItemReqArgs, IGetNewsReqArgs } from './ts';
import networkReqNewsItemArgs from './[news_id]';

export const getNewsReqArgs = ({ urlOptions }: IGetNewsReqArgs) => {
	const requestInfo: RequestInfo = `/api/news${
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

export const createNewsItemReqArgs = ({
	bodyContent,
	headersList,
}: ICreateNewsItemReqArgs) => {
	const requestInfo: RequestInfo = `/api/news`;
	const requestInit: RequestInit = {
		method: 'POST',
		headers: {
			...headersDefault,
			...headersList,
		},
		body: JSON.stringify(bodyContent),
	};

	return {
		requestInfo,
		requestInit,
	};
};

const networkReqNewsArgs = {
	get: getNewsReqArgs,
	item: {
		create: createNewsItemReqArgs,
		...networkReqNewsItemArgs,
	},
};

export default networkReqNewsArgs;
