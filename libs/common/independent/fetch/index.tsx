export const handleRequestStateChanges = async <
	TData,
	R = boolean,
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
}): Promise<R | boolean> => {
	const response = await onInit(
		extraData?.init || ({} as unknown as TInitExtraData)
	);

	if (!response.ok) {
		onError(
			await response.text(),
			extraData?.error || ({} as unknown as TErrorExtraData)
		);
		return false;
	}

	return (
		onSuccess(
			responseSuccessType === 'json'
				? await response.json()
				: await response.text(),
			extraData?.success || ({} as unknown as TSuccessExtraData)
		) || true
	);
};

export const returnBearerTokenIfExist = (token?: string) =>
	token && `Bearer ${token}`;
