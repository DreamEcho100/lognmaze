export interface IUpdateNewsItemCommentReqArgs {
	bodyContent: {
		content: string;
	};
	headersList: {
		Authorization: string;
	};
	urlOptions: {
		params: {
			news_id: string;
			comment_id: string;
		};
	};
}
