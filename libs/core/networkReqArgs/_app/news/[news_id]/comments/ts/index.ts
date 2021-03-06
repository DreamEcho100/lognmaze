import { TNewsItemCommentTypeMain } from '@coreLib/ts/global';

export interface IUrlOptionsQueriesTypeCommentMain {
	comment_type: 'comment_main';
	last_comment_created_at?: string;
	comments_to_not_fetch?: string[];
}
export interface IUrlOptionsQueriesTypeCommentMainReply {
	comment_type: 'comment_main_reply';
	replies_to_not_fetch?: string[];
	last_reply_created_at?: string;
	parent_id: TNewsItemCommentTypeMain['news_comment_id'];
}
export interface IGetNewsItemCommentsReqArgs {
	urlOptions: {
		params: {
			news_id: string;
		};
		queries:
			| IUrlOptionsQueriesTypeCommentMain
			| IUrlOptionsQueriesTypeCommentMainReply;
	};
}

/* */

interface ICreateNewsItemCommentReqArgsPropsBodyContentBasic {
	news_id: string;
	content: string;
}
export interface ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMain
	extends ICreateNewsItemCommentReqArgsPropsBodyContentBasic {
	comment_type: 'comment_main';
}
export interface ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMainReply
	extends ICreateNewsItemCommentReqArgsPropsBodyContentBasic {
	comment_type: 'comment_main_reply';
	parent_id: string;
	reply_to_comment_id?: string;
	reply_to_user_id: string;
}
export interface ICreateNewsItemCommentReqArgs {
	urlOptions: {
		params: {
			news_id: string;
		};
	};
	headersList: {
		Authorization?: string;
	};
	bodyContent:
		| ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMain
		| ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMainReply;
}
