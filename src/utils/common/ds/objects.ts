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



export const omitObjByKeys = <Obj, ObjKeys extends (keyof Obj)[]>(
	obj: Obj,
	keys: ObjKeys
): Omit<Obj, ObjKeys[number]> => {
	const objCopy = {
		...obj,
	} as Omit<Obj, ObjKeys[number]>;

	let key: string;
	for (key of keys as unknown as (ObjKeys[number] & string)[]) {
		console.log('key', key);
		delete objCopy[key as keyof typeof objCopy];
	}

	return objCopy;
};
