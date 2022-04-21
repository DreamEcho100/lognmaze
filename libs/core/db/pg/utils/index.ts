import { itemsInObject } from '@commonLibIndependent/object';
import {
	IFilterByUsersHandlerProps,
	TAddParam,
	TChooseFilter,
	TFilterByUsersHandler,
	TGetTableAndColumnNames,
} from '../ts';

export const addParam: TAddParam = (
	paramsObj,
	paramsArr,
	name,
	value,
	preNameTitle = ''
) => {
	if (!paramsObj[preNameTitle + name]) {
		paramsObj[preNameTitle + name] = paramsArr.push(value);
		return true;
	}

	return false;
};

export const getTableAndColumnNames: TGetTableAndColumnNames = (
	tableAndItsColumns,
	name
) => `${tableAndItsColumns[name].table}.${tableAndItsColumns[name].column}`;

const priorityOptions: {
	[key: string]: string;
} = {
	AND: 'AND',
	OR: 'OR',
};

export const chooseFilter: TChooseFilter = ({
	whereFilter,
	paramsObj,
	paramsArr,
	item,
	tableAndItsColumns,
}) => {
	if (Array.isArray(item)) {
		let i;
		for (i = 0; i < item.length; i++) {
			if (!addParam(paramsObj, paramsArr, item[i].name, item[i].value)) {
				continue;
			}
			if (whereFilter.length !== 0)
				whereFilter +=
					' ' + priorityOptions[item[i]?.priority?.toUpperCase() || 'AND'];

			whereFilter += ` ${getTableAndColumnNames(
				tableAndItsColumns,
				item[i].name
			)} = ($${paramsObj[item[i].name]})`;
		}

		return ' ' + whereFilter;
	}

	switch (item.type) {
		case '$any': {
			if (whereFilter.length !== 0)
				whereFilter +=
					' ' + priorityOptions[item?.priority?.toUpperCase() || 'AND'];

			let anyKey;
			for (anyKey in item.targets) {
				if (
					!addParam(
						paramsObj,
						paramsArr,
						item.targets[anyKey].name,
						item.targets[anyKey].value,
						'$any_'
					)
				) {
					continue;
				}
				if (whereFilter.length !== 0)
					whereFilter +=
						' ' +
						priorityOptions[
							item.targets[anyKey]?.priority?.toUpperCase() || 'AND'
						];

				whereFilter += ` ${getTableAndColumnNames(
					tableAndItsColumns,
					item.targets[anyKey].name
				)} = ANY($${paramsObj['$any_' + item.targets[anyKey].name]})`;
			}
			break;
		}

		default:
			break;
	}

	return ' ' + whereFilter;
};

export const filterByUsersHandler: TFilterByUsersHandler = <T, TCR>({
	itemsInObjectArr,
	objectToCheck,
	callBack,
}: IFilterByUsersHandlerProps<T, TCR>) => {
	const { existingItems, atLeastOneItemExist } = itemsInObject<
		typeof objectToCheck
	>(objectToCheck, itemsInObjectArr);

	return callBack({
		existingItems,
		atLeastOneItemExist,
	});
};
