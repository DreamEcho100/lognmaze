import { IHandleFetchProps } from './ts';

export const handleFetch = async <T>({
	handleFetchArgs,
	handleFetchArgsProps,
	onError = () => {},
	onSuccess = () => {},
}: IHandleFetchProps<T>) => {
	const { requestInfo, requestInit } = handleFetchArgs(handleFetchArgsProps);
	const response = await fetch(requestInfo, requestInit);

	if (response.ok) onSuccess(response);

	onError(response);
};
