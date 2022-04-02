export interface IUpdateNewsItemCommentReqArgs {
	bodyContent: {
		content: string;
	};
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
