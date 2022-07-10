export interface IUpdateByUserNameIdReqArgs {
	urlOptions: {
		queries: {
			byId: string;
		};
	};
	bodyContent: {
		[key: string]: any;
	};
	headerList: { Authorization?: string };
}
