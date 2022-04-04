export interface ITableAndItsColumns {
	[key: string]: {
		table: string;
		column: string;
	};
}

/***************************/
/********** utils **********/
/***************************/

export type TAddParam = (
	paramsObj: { [key: string]: number },
	paramsArr: any[],
	name: string,
	value: any,
	preNameTitle?: string
) => boolean;

export type TGetTableAndColumnNames = (
	tableAndItsColumns: ITableAndItsColumns,
	name: string
) => string;

export interface IChooseFilterProps {
	whereFilter: string;
	paramsObj: { [key: string]: number };
	paramsArr: any[];
	item: TGetUsersPropFilterByTarget[] | TGetUsersPropFilterByOptions;
	tableAndItsColumns: ITableAndItsColumns;
}

export type TChooseFilter = (props: IChooseFilterProps) => string;

export interface IFilterByUsersHandlerProps<T, TCR> {
	objectToCheck: {
		[key: string]: T;
	};
	itemsInObjectArr: string[];
	callBack: (props: {
		existingItems: {
			[key: string]: T;
		};
		atLeastOneItemExist: boolean;
	}) => TCR;
}

export type TFilterByUsersHandler = <T, TCR = void>(
	props: IFilterByUsersHandlerProps<T, TCR>
) => TCR;

/***************************/
/********** users **********/
/***************************/
export interface IExtraReturns {
	user_id?: boolean;
	user_password?: boolean;
	user_news_counter?: boolean;
	sensitiveInfo?: boolean;
	password?: boolean;
}

export type TGetUsersPropFilterByTargetPriority = 'AND' | 'OR';

export interface TGetUsersPropFilterByTarget {
	name: string; // 'email' | 'first_name' | 'last_name',
	value: string | string[];
	priority?: TGetUsersPropFilterByTargetPriority;
}

export type TGetUsersPropFilterByOptions = {
	type: '$any';
	priority?: TGetUsersPropFilterByTargetPriority;
	targets: TGetUsersPropFilterByTarget[];
};

export type TGetUsersPropFilterBy = (
	| TGetUsersPropFilterByTarget[]
	| TGetUsersPropFilterByOptions
)[];

export interface IGetUsersProps {
	extraReturns: IExtraReturns;
	filterBy?: TGetUsersPropFilterBy;
}

export type TGetUsers = (props: IGetUsersProps) => Promise<any>;

interface TGetNewsProps {
	with_news_blog_content?: boolean;
	isNewsVotedByUser?: boolean;
	newsCreatedBefore?: string | number | Date;
	newsByUserId?: string;
	filterByBlogTagsOr?: string;
	filterByBlogTagsAnd?: string;
}

export type TGetNews = (props?: TGetNewsProps) => Promise<any>;
