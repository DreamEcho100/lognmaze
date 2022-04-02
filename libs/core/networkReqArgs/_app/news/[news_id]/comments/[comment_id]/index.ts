import { headersDefault } from '@coreLib/networkReqArgs/__utils';
import {
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
} from '@coreLib/ts/global';
import { IUpdateNewsItemCommentReqArgs } from './ts';

export const updateNewsItemCommentReqArgs = ({
	bodyContent,
	urlOptions,
	headersList,
}: IUpdateNewsItemCommentReqArgs) => {
	const requestInfo: RequestInfo = `/api/news/${urlOptions.params.news_id}/comments/${urlOptions.params.news_comment_id}`;
	const requestInit: RequestInit = {
		method: 'PUT',
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

export interface IDeleteNewsItemCommentReqArgsPropsCommentMain {
	type: TNewsItemCommentTypeMain['type'];
}
export interface IDeleteNewsItemCommentReqArgsPropsCommentMainReply {
	type: TNewsItemCommentTypeReplyMain['type'];
	parent_id: string;
}

export interface IDeleteNewsItemCommentReqArgsProps {
	bodyContent:
		| IDeleteNewsItemCommentReqArgsPropsCommentMain
		| IDeleteNewsItemCommentReqArgsPropsCommentMainReply;
	headersList: {
		Authorization?: string;
	};
	urlOptions: {
		params: {
			news_id: string;
			news_comment_id: string;
		};
	};
}

export const deleteNewsItemCommentReqArgs = ({
	bodyContent,
	urlOptions,
	headersList,
}: IDeleteNewsItemCommentReqArgsProps) => {
	const requestInfo: RequestInfo = `/api/news/${urlOptions.params.news_id}/comments/${urlOptions.params.news_comment_id}`;
	const requestInit: RequestInit = {
		method: 'DELETE',
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

const networkReqNewsItemCommentArgs = {
	update: updateNewsItemCommentReqArgs,
	delete: deleteNewsItemCommentReqArgs,
};

export default networkReqNewsItemCommentArgs;
