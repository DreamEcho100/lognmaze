type TItemsInObject = <TObj>(
	obj: TObj,
	items: (keyof TObj)[]
) => {
	existingItems: TObj;
	atLeastOneItemExist: boolean;
};

export const itemsInObject: TItemsInObject = (obj, items) => {
	if (!obj || typeof obj !== 'object') throw new Error('');

	const existingItems: typeof obj = {} as typeof obj;
	let atLeastOneItemExist = false;

	items.forEach((item) => {
		if (item in obj) {
			existingItems[item] = obj[item];
			// if (!atLeastOneItemExist) atLeastOneItemExist = true;
		}
	});

	let item: keyof typeof obj;
	// eslint-disable-next-line
	for (item in obj) {
		atLeastOneItemExist = true;
		break;
	}

	return {
		existingItems,
		atLeastOneItemExist,
	};
};

export const encodeObjectToUrlQueries = (obj: { [key: string]: any }) => {
	let queryString: string = '';
	let key: keyof typeof obj;
	for (key in obj) {
		queryString += `${queryString && '&'}${key}=${encodeURIComponent(
			typeof obj[key] === 'object' || Array.isArray(obj[key])
				? JSON.stringify(obj[key])
				: obj[key]
		)}`;
	}

	return queryString || '';
};
