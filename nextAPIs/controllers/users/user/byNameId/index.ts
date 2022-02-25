import { returnObjFromJwtToken } from '@coreLib/auth';
import pgActions from '@coreLib/db/pg/actions';
import {
	IExtraReturns,
	TGetUsersPropFilterBy,
	TGetUsersPropFilterByTarget,
} from '@coreLib/db/pg/ts';
import { filterByUsersHandler } from '@coreLib/db/pg/utils';
import { NextApiRequest, NextApiResponse } from 'next';

// @desc    Get User By user_name_id
// @route   GET /api/users/user/byNameId
// @access  Public
export const getByUserNameIdController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const extraReturns: IExtraReturns = {
		user_id: true,
		password: false,
	};
	const filterBy: TGetUsersPropFilterBy = [];
	const filterByItemsArr: TGetUsersPropFilterByTarget[] = [];

	filterByUsersHandler<TGetUsersPropFilterByTarget[]>({
		itemsInObjectArr: ['target'],
		objectToCheck: req.body,
		callBack: (props) => {
			let key: keyof typeof props.existingItems; // : TGetUsersPropFilterByOptions;
			for (key in props.existingItems) {
				props.existingItems[key].map((item) => {
					if (
						!item ||
						!item.value
						// ||
						// !item.name
					) {
						// throw new Error('value or name is not defined');
						return;
					}

					filterByItemsArr.push({
						name: item.name,
						value: item.value,
						priority: item.priority || 'AND',
					});
				});
			}
		},
	});

	filterByItemsArr.push({
		name: 'byUserNameId',
		value: req.query.user_name_id,
		priority: 'AND',
	});
	if (filterByItemsArr.length !== 0) filterBy.push(filterByItemsArr);
	// Example for req.body
	// {
	//   "target": [
	//       {
	//           "name": "byUserId",
	//           "value": "a20ff0d9-d0fd-4d84-b71d-96cd6f3a20b7"
	//       },
	//       {
	//           "name": "byUserNameId",
	//           "value": "mohamed-bek",
	//           "priority": "OR"
	//       }
	//   ]
	// }

	/*
		if (req.query.filter_by_user_id) {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			filterBy.user_profile_id = isAuthorized.id;

			withSensitiveInfo = true;
		}
	*/
	if (await returnObjFromJwtToken(req.headers.authorization))
		extraReturns.sensitiveInfo = true;

	const users = await pgActions.users.get({
		extraReturns,
		filterBy,
	});

	if (!Array.isArray(users) || users.length === 0) {
		res.status(404);
		throw new Error("User/s data doesn't exist");
	}

	res.json(users[0]);
};

const byNameIdController = {
	get: getByUserNameIdController,
};

export default byNameIdController;
