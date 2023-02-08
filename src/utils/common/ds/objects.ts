export const objChanges = <T extends Record<string, unknown>>(
	objToCompareTo: T,
	objToCompareWith: T
) => {
	const objWithChanges: Partial<T> = {};

	let key: keyof typeof objToCompareWith;
	for (key in objToCompareWith) {
		if (objToCompareTo[key] !== objToCompareWith[key])
			objWithChanges[key] = objToCompareWith[key];
	}

	return objWithChanges;
};
