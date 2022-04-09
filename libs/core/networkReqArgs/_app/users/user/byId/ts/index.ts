export interface IUpdateByUserNameIdReqArgs {
	urlOptions: {
		queries: {
			byId: string;
		};
	};
	bodyContent: {
		// Needs more work :(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	};
	headerList: { Authorization: string };
}
