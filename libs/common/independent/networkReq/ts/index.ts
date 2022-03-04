export interface IHandleFetchProps<HandleFetchArgsProps> {
	handleFetchArgsProps: HandleFetchArgsProps;
	handleFetchArgs: (props: HandleFetchArgsProps) => {
		requestInfo: RequestInfo;
		requestInit: RequestInit;
	};
	onError?: (response: Response) => void;
	onSuccess?: (response: Response) => void;
}
