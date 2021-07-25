const { Pool } = require('pg');

export const connectionString = process.env.PG_CONNECTION_STRING;

export const pool = new Pool({
	connectionString,
});

export const selectAllFrom = async ({ table }) => {
	return await pool.query(`SELECT * FROM ${table}`);
};

export const checkUserExistAndReturnPasswordById = async (
	res,
	id,
	extraData = {}
) => {
	const user = await pool
		.query(
			'SELECT user_account_id AS id, password FROM user_account WHERE user_account_id = $1',
			[id]
		)
		.then((response) => response.rows[0] || {});

	if (!user.id && res) {
		res.status(404).json({
			status: 'error',
			message: 'User not found!',
			isAuthorized: false,
		});
	}

	return user;
};

const userAccountKeys = (withId, withPassword) => {
	return `
		${withId ? 'user_account.user_account_id AS id,' : ''}\
		user_account.email,
		user_account.email_verified,
		user_account.show_email,
		${withPassword ? 'user_account.password,' : ''}
		user_account.phone_number,
		user_account.phone_verified,
		user_account.show_phone_number,
		user_account.role,
		user_account.created_at,
		user_account.last_sign_in
	`;
};

const userProfileKeys = (withId) => {
	return `
		${withId ? 'user_profile.user_profile_id AS id,' : ''}
		user_profile.user_name_id,
		user_profile.first_name,
		user_profile.last_name,
		user_profile.date_of_birth,
		user_profile.show_date_of_birth,
		user_profile.gender,
		user_profile.profile_picture,
		user_profile.cover_photo,
		user_profile.bio,
		user_profile.bio_format_type,
		user_profile.show_bio
	`;
};

const userAddressKeys = (withId) => {
	return `
		${withId ? 'user_address.user_address_id AS id,' : ''}
		user_address.country_of_birth,
		user_address.state_of_birth,
		user_address.city_of_birth,
		user_address.show_address_of_birth,
		user_address.country_of_resident,
		user_address.state_of_resident,
		user_address.city_of_resident,
		user_address.address_of_resident,
		user_address.show_address_of_resident
	`;
};

const putInQuotationMark = (item) => {
	if (item.startsWith("'") && item.endsWith("'")) {
		return item;
	}

	return `'${item}'`;
};

export class QueryBuilder {
	constructor() {
		this.CTEParamsObj = {};
		this.CTEParamsArray = [];
		this.CTEFuncsNames = [];
		this.CTEFuncs = [];
		this.CTEFuncCounter = 0;
		this.clauseString = '';
		this.clauses = {
			$where: true,
			$and: true,
			$in: true,
		};
	}

	arrayToCTE = (array) => {
		const CTEFuncs = [];
		const CTEFuncsNames = [];

		array.forEach((item) => {
			const { type } = item;

			if (type === 'insert') {
				const {
					table,
					target,
					sharedkeys,
					sharedValues,
					distencKeysAndValues,
				} = item;
				const { keys, values, returning = [] } = distencKeysAndValues;

				if (target === 'one') {
					sharedValues.forEach((item) => {
						if (!this.CTEParamsObj[item]) {
							this.CTEParamsObj[item] = this.CTEParamsArray.length + 1;
							this.CTEParamsArray.push(item);
						}
					});

					values.forEach((item) => {
						if (!this.CTEParamsObj[item]) {
							this.CTEParamsObj[item] = this.CTEParamsArray.length + 1;
							this.CTEParamsArray.push(item);
						}
					});

					const funcName = `insert_item_${++this.CTEFuncCounter}`;
					const func = `${funcName} AS (
              INSERT INTO ${table} (${[...sharedkeys, ...keys].join(
						','
					)}) VALUES (${[...sharedValues, ...values]
						.map((item) => `$${this.CTEParamsObj[item]}`)
						.join(',')}) RETURNING ${
						returning.length !== 0 ? returning.join(',') : "''"
					}
            )
          `;
					CTEFuncs.push(func);
					CTEFuncsNames.push(funcName);
				} else if (target === 'many') {
					values.forEach((items) => {
						items.forEach((item) => {
							if (!this.CTEParamsObj[item])
								this.CTEParamsObj[item] = this.CTEParamsArray.length + 1;
							this.CTEParamsArray.push(item);
						});

						const funcName = `insert_item_${++this.CTEFuncCounter}`;
						const func = `${funcName} AS (
              INSERT INTO ${table} (${[...sharedkeys, ...keys].join(
							','
						)}) VALUES (${[...sharedValues, ...items]
							.map((item) => `$${this.CTEParamsObj[item]}`)
							.join(',')}) RETURNING ${
							returning.length !== 0 ? returning.join(',') : "''"
						}
            )
          `;
						CTEFuncs.push(func);
						CTEFuncsNames.push(funcName);
					});
				}
			} else if (type === 'update') {
				const { $where, table, keysAndValues, returning = [] } = item;
				const whereClause = this.whereClausesHandler({ obj: $where });

				for (let key in keysAndValues) {
					if (!this.CTEParamsObj[keysAndValues[key]]) {
						this.CTEParamsObj[keysAndValues[key]] =
							this.CTEParamsArray.length + 1;
						this.CTEParamsArray.push(keysAndValues[key]);
					}
				}

				const keys = Object.keys(keysAndValues);
				const funcName = `update_item_${++this.CTEFuncCounter}`;
				const func = `${funcName} AS (
          UPDATE ${table} SET ${keys.map(
					(key, index) => `${key}=($${this.CTEParamsObj[keysAndValues[key]]})`
				)} ${whereClause} RETURNING ${
					returning.length !== 0 ? returning.join(',') : "''"
				}
        )
      `;
				CTEFuncs.push(func);
				CTEFuncsNames.push(funcName);
			} else if (type === 'delete') {
				const { $where, table, returning = [] } = item;
				const whereClause = this.whereClausesHandler({ obj: $where });

				const funcName = `delete_item_${++this.CTEFuncCounter}`;
				const func = `${funcName} AS (
            DELETE FROM ${table} ${whereClause} RETURNING ${
					returning.length !== 0 ? returning.join(',') : "''"
				}
          )
        `;
				CTEFuncs.push(func);
				CTEFuncsNames.push(funcName);
			}
		});

		this.CTEFuncs = CTEFuncs;
		this.CTEFuncsNames = CTEFuncsNames;

		return {
			CTEFuncs,
			CTEFuncsNames,
			CTEParamsObj: this.CTEParamsObj,
			CTEParamsArray: this.CTEParamsArray,
			CTEFuncCounter: this.CTEFuncCounter,
			SQLCTEQuery: this.SQLCTEQuery(),
		};
	};

	SQLCTEQuery = () => {
		return `
			WITH ${this.CTEFuncs.join(',')}

			SELECT * FROM ${this.CTEFuncsNames.join(',')};
		`;
	};

	whereClausesHandler = ({ obj }) => {
		const clauses = {
			$where: true,
			$and: true,
			$in: true,
		};
		const clauseGetter = ({ clause, obj }) => {
			return (
				{
					$where: ({ obj, string = '' }) => {
						let tempString = string.length !== 0 ? string : 'WHERE';

						for (let key in obj) {
							if (clauses[key]) {
								tempString +=
									' ' +
									clauseGetter({
										clause: key,
										obj: obj[key],
									});
							} else {
								if (!this.CTEParamsObj[obj[key]]) {
									this.CTEParamsObj[obj[key]] = this.CTEParamsArray.length + 1;
									this.CTEParamsArray.push(obj[key]);
								}
								tempString += ` ${key}=($${this.CTEParamsObj[obj[key]]})`;
							}
						}

						return tempString;
					},
					$and: ({ obj, string = '' }) => {
						let tempString = string.length !== 0 ? string : 'AND';

						for (let key in obj) {
							if (clauses[key]) {
								tempString +=
									' ' +
									clauseGetter({
										clause: key,
										obj: obj[key],
									});
							} else {
								if (!this.CTEParamsObj[obj[key]]) {
									this.CTEParamsObj[obj[key]] = this.CTEParamsArray.length + 1;
									this.CTEParamsArray.push(obj[key]);
								}
								tempString += ` ${key}=($${this.CTEParamsObj[obj[key]]})`;
							}
						}

						return tempString;
					},
					$in: ({ obj, string = '' }) => {
						let tempString = string.length !== 0 ? string : '';

						for (let key in obj) {
							if (clauses[key]) {
								tempString +=
									' ' +
									clauseGetter({
										clause: key,
										obj: obj[key],
									});
							} else {
								const keys = [];
								obj[key].forEach((item) => {
									if (!this.CTEParamsObj[item]) {
										this.CTEParamsObj[item] = this.CTEParamsArray.length + 1;
										this.CTEParamsArray.push(item);
									}
									keys.push(this.CTEParamsObj[item]);
								});
								tempString += ` ${key} IN  ($${keys.join(',')})`;
							}
						}

						return tempString;
						
					},
				}[clause]({ obj }) || ''
			);
		};

		let clauseString = '';
		
		clauseString += clauseGetter({
			clause: '$where',
			obj,
		});

		return clauseString;
	};
}

export const queryBuilder = new QueryBuilder();

export const getUserData = async ({ filterBy, withPassword }) => {
	return await pool
		.query(
			`
				SELECT
					${userAccountKeys(true, withPassword)},

					${userProfileKeys()},

					${userAddressKeys()}
				FROM
					user_account
				JOIN user_profile
					ON user_profile.user_profile_id = user_account.user_account_id
				JOIN user_address
					ON user_address.user_address_id = user_account.user_account_id
				${filterBy.key ? `WHERE ${filterBy.key} = $1` : ''}
			`,
			[filterBy.value]
		)
		.then((response) => (response.rows.length !== 0 ? response.rows[0] : {}));
};
