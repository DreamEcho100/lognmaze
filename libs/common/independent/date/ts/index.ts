// Weeks In Week Year
// Start of Time

type TDate = number | string | Date;

export interface IDateBasicValuesOptions<T> {
	milliseconds?: T;
	seconds?: T;
	minutes?: T;
	hours?: T;
	daysInMonth?: T;
	month?: T;
	year?: T;
}

export interface TGetDateValuesOptions
	extends IDateBasicValuesOptions<boolean> {
	dayOfWeek?: boolean;
	time?: boolean;
	date?: boolean;
}
interface TGetDateValuesReturn extends IDateBasicValuesOptions<number> {
	dayOfWeek?: number;
}

export interface TSetDateValuesOptionsNumber
	extends IDateBasicValuesOptions<number> {
	time?: number;
	date?: number;
	weekOfYear?: number;
}

export type TGetDateValues = (
	dateValue: TDate,
	options: TGetDateValuesOptions
) => TGetDateValuesReturn;

export type TSetDateValues = (
	dateValue: TDate,
	options: TSetDateValuesOptionsNumber
) => Date;

export type TAddZeroToStringStartIfLessThanLimit = (
	str: string,
	limit: number
) => string;
export interface TFormatDateOptions {
	locales?: string | string[];
	format?: Intl.DateTimeFormatOptions;
}
export type TFormatDate = (
	providedDate: Date,
	options?: TFormatDateOptions
) => {
	date: string;
	time?: string;
	timeZoneName?: string;
};

export type TMaxOfDates = (datesArray: TDate[]) => Date;
export type TMinOfDates = (datesArray: TDate[]) => Date;

export type TCalcBasicDateValues = (
	dateValue: TDate,
	options: IDateBasicValuesOptions<boolean | number>,
	calcFunc: (dateIMilliseconds1: number, dateIMilliseconds2: number) => number
) => Date;
export type TAddOrSubtractDateValues = (
	dateValue: TDate,
	options: IDateBasicValuesOptions<number>
) => Date;
export type TAddDateValues = TAddOrSubtractDateValues;
export type TSubtractDateValues = TAddOrSubtractDateValues;

type twoDateOneReturn<R> = (date1: TDate, date2: TDate) => R;
export type TTwoDateDifference = twoDateOneReturn<Date>;
export type TDateIsBefore = twoDateOneReturn<boolean>;
export type TDateIsSame = twoDateOneReturn<boolean>;
export type TDateIsAfter = twoDateOneReturn<boolean>;

export type TDateIsBetween = (
	date: TDate,
	dateMin: TDate,
	dateMax: TDate
) => boolean;

type oneDateOneReturn<R> = (date: TDate) => R;
export type TDateIsLeapYear = oneDateOneReturn<boolean>;
export type TIsDate = oneDateOneReturn<boolean>;
