export interface IUpdateByUserNameIdReqArgs {
	urlOptions: {
		queries: {
			byId: string;
		};
	};
	bodyContent: {
		// Needs more work :(
		[key: string]: any;
	};
	headerList: { Authorization: string };
}
