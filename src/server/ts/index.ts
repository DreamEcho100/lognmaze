type PickNonNullable<T, K extends keyof T> = {
	[P in K]: NonNullable<T[P]>;
};

export type OmitPickAndSetToNonNullable<T, K extends keyof T> = Omit<T, K> &
	NonNullable<Required<PickNonNullable<T, K>>>;
