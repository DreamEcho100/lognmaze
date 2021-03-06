type TDifferenceOptions = {
	noDuplicates?: boolean;
};

const DifferenceDefaults: TDifferenceOptions = {
	noDuplicates: false,
};

export const shuffleArray = <T>(array: T[]): T[] => {
	const arrayCopy = array.slice();
	let i, j;

	for (i = arrayCopy.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
	}

	return arrayCopy;
};

export const removeArrayDuplicates = <T>(arr: T[]): T[] => {
	const newArr: T[] = [];
	const items: {
		[key: string]: boolean;
	} = {};

	let itemStringified = '';

	arr.forEach((item) => {
		if ((item && typeof item === 'object') || Array.isArray(item)) {
			itemStringified = JSON.stringify(item);
			if (!items[itemStringified]) {
				items[itemStringified] = true;
				newArr.push(item);
			}
		} else {
			if (!items[item + '']) {
				newArr.push(item);
				items[item + ''] = true;
			}
		}
	});

	return newArr;
};

export const differenceBetweenTwoArrays = <T>(
	array1: T[],
	array2: T[],
	{ noDuplicates }: TDifferenceOptions = DifferenceDefaults
) => {
	const arr1: T[] = noDuplicates ? removeArrayDuplicates<T>(array1) : array1;
	const arr2: T[] = noDuplicates ? removeArrayDuplicates<T>(array2) : array2;

	const removed: T[] = [];
	const added: T[] = [];

	if (arr1.length > arr2.length) {
		arr1.forEach((item, index) => {
			if (arr2.indexOf(item) === -1) removed.push(item);

			if (index < arr2.length && arr1.indexOf(arr2[index]) === -1)
				added.push(arr2[index]);
		});
	} else {
		arr2.forEach((item, index) => {
			if (arr1.indexOf(item) === -1) added.push(item);

			if (index < arr1.length && arr2.indexOf(arr1[index]) === -1)
				removed.push(arr1[index]);
		});
	}

	return {
		removed,
		added,
	};
};

export const joinArrayWith1EmptySpace = (arr: string[]): string =>
	arr.join(' ');

const arrayFormatter = {
	shuffle: shuffleArray,
	removeDuplicates: removeArrayDuplicates,
	differenceBetweenTwo: differenceBetweenTwoArrays,
	joinWith1EmptySpace: joinArrayWith1EmptySpace,
};

export default arrayFormatter;
