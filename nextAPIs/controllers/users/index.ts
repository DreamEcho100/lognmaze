import pgActions from '@coreLib/db/pg/actions';
import {
	TGetUsersPropFilterBy,
	TGetUsersPropFilterByOptions,
	TGetUsersPropFilterByTarget,
} from '@coreLib/db/pg/ts';
import { NextApiRequest, NextApiResponse } from 'next';
import { filterByUsersHandler } from '@coreLib/db/pg/utils';
import userController from './user';

// @desc    Get Users
// @route		/api/users
// @access  Public
export const getUsersController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const extraReturns = {
		user_id: true,
		password: false,
	};
	const filterBy: TGetUsersPropFilterBy = [];

	// let key: TKey;

	let $any: TGetUsersPropFilterByOptions; // unknown as TGetUsersPropFilterByOptions
	if (
		req.query['$any'] &&
		typeof ($any = JSON.parse(req.query['$any'] as string)) === 'object'
	)
		filterByUsersHandler<TGetUsersPropFilterByOptions>({
			itemsInObjectArr: [
				// 'byUsersId', 'byUsersNameId', 'byUsersEmail'
				'$any',
			],
			objectToCheck: {
				$any,
			},
			callBack: (props) => {
				let key: keyof typeof props.existingItems; // : TGetUsersPropFilterByOptions;
				for (key in props.existingItems) {
					if (
						!props.existingItems[key] ||
						props.existingItems[key].targets?.length === 0
					) {
						// throw new Error('targets not defined');
						return;
					}

					filterBy.push({
						type: props.existingItems[key].type || '$any',
						priority: props.existingItems[key].priority || 'AND',
						targets: props.existingItems[key].targets.map((item) => ({
							name: item.name,
							value: item.value,
							priority: item.priority || 'AND',
						})),
					});
				}
			},
		});
	// Example for req.query
	// {
	//   "$any": {
	//       "targets": [
	//           {
	//               "name": "byUsersId",
	//               "value": ["a20ff0d9-d0fd-4d84-b71d-96cd6f3a20b7"]
	//           },
	//           {
	//               "name": "byUsersNameId",
	//               "priority": "OR",
	//               "value": ["mohamed-bek"]
	//           }
	//       ]
	//   }
	// }

	let target: TGetUsersPropFilterByTarget[];
	if (
		req.query['target'] &&
		typeof (target = JSON.parse(req.query['target'] as string)) === 'object'
	)
		filterByUsersHandler<TGetUsersPropFilterByTarget[]>({
			itemsInObjectArr: ['target'],
			objectToCheck: { target },
			callBack: (props) => {
				const items: TGetUsersPropFilterByTarget[] = [];

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

						items.push({
							name: item.name,
							value: item.value,
							priority: item.priority || 'AND',
						});
					});
				}

				if (items.length !== 0) filterBy.push(items);
			},
		});
	// Example for req.query
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

	// if (filterBy.length === 0) {
	// 	res.status(400);
	// 	throw new Error('filterBy Empty!');
	// }

	const users = await pgActions.users
		.get({
			extraReturns,
			filterBy,
		})
		.then((response: { rows: any[] }) => response.rows);

	if (!Array.isArray(users) || users.length === 0) {
		res.status(404);
		throw new Error("User/s data doesn't exist");
	}

	res.json(users);
};

const usersController = {
	get: getUsersController,
	user: userController,
};

export default usersController;
