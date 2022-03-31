export const handleRequestStateChanges = async <
	TData,
	R = undefined,
	TInitExtraData = undefined,
	TErrorExtraData = undefined,
	TSuccessExtraData = undefined
>({
	onInit,
	onError,
	onSuccess,
	extraData,
	responseSuccessType = 'json',
}: {
	onInit: (extraData: TInitExtraData) => Promise<Response>;
	onError: (error: string, extraData: TErrorExtraData) => void;
	onSuccess: (data: TData, extraData: TSuccessExtraData) => R | void;
	extraData?: {
		init?: TInitExtraData;
		error?: TErrorExtraData;
		success?: TSuccessExtraData;
	};
	responseSuccessType?: 'json' | 'text';
}): Promise<R | void | undefined> => {
	const response = await onInit(extraData?.init || ({} as TInitExtraData));

	if (!response.ok) {
		onError(await response.text(), extraData?.error || ({} as TErrorExtraData));
		return;
	}

	return onSuccess(
		responseSuccessType === 'json'
			? await response.json()
			: await response.text(),
		extraData?.success || ({} as TSuccessExtraData)
	);
};

export const returnBearerTokenIfExist = (token?: string) =>
	token && `Bearer ${token}`;
