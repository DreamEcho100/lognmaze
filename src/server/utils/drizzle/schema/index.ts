export * as drizzleTables from './tables';
export * as drizzleRelations from './relations';

import * as drizzleTables from './tables';
import * as drizzleRelations from './relations';

const drizzleSchema = {
	...drizzleTables,
	...drizzleRelations
};

export default drizzleSchema;

export type DrizzleSchema = typeof drizzleSchema;
