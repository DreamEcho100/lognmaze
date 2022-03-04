// https://github.com/you-dont-need/You-Dont-Need-Momentjs
// Weeks In Week Year
// Start of Time

import {
	IDateBasicValuesOptions,
	TAddDateValues,
	TAddZeroToStringStartIfLessThanLimit,
	TCalcBasicDateValues,
	TDateIsAfter,
	TDateIsBefore,
	TDateIsBetween,
	TDateIsLeapYear,
	TDateIsSame,
	TFormatDate,
	TGetDateValues,
	TIsDate,
	TMaxOfDates,
	TMinOfDates,
	TSetDateValues,
	TSubtractDateValues,
	TTwoDateDifference,
} from './ts';

export const getDateValues: TGetDateValues = (
	dateValue = new Date(),
	{
		milliseconds,
		seconds,
		minutes,
		hours,
		daysInMonth,
		month,
		year,
		dayOfWeek,
		time,
		date,
	} = {}
) => {
	const dateObject = new Date(dateValue);
	const result: ReturnType<TGetDateValues> = {};

	if (milliseconds) result.milliseconds = dateObject.getMilliseconds();
	if (seconds) result.seconds = dateObject.getSeconds();
	if (minutes) result.minutes = dateObject.getMinutes();
	if (hours) result.hours = dateObject.getHours();
	if (daysInMonth) result.daysInMonth = dateObject.getDate();
	if (month) result.month = dateObject.getMonth() + 1;
	if (year) result.year = dateObject.getFullYear();
	if (dayOfWeek) result.dayOfWeek = dateObject.getDate();

	return result;
};

export const setDateValues: TSetDateValues = (
	dateValue = new Date(),
	{
		milliseconds,
		seconds,
		minutes,
		hours,
		daysInMonth,
		month,
		year,
		weekOfYear,
	} = {}
) => {
	const dateObject = new Date(dateValue);

	if (milliseconds && !isNaN(milliseconds))
		dateObject.setMilliseconds(milliseconds);
	if (seconds && !isNaN(seconds)) dateObject.setSeconds(seconds);
	if (minutes && !isNaN(minutes)) dateObject.setMinutes(minutes);
	if (hours && !isNaN(hours)) dateObject.setHours(hours);
	if (daysInMonth && !isNaN(daysInMonth)) dateObject.setDate(daysInMonth);
	if (month && !isNaN(month)) dateObject.setMonth(month);
	if (year && !isNaN(year)) dateObject.setFullYear(year);
	if (weekOfYear) {
		const MILLISECONDS_IN_WEEK = 604800000;
		const firstDayOfWeek = 1; // monday as the first dateObject (0 = sunday)
		const startOfYear = new Date(dateObject.getFullYear(), 0, 1);
		startOfYear.setDate(
			startOfYear.getDate() + (firstDayOfWeek - (startOfYear.getDay() % 7))
		);
		const dayWeek =
			Math.round(
				(new Date(dateObject).getTime() - new Date(startOfYear).getTime()) /
					MILLISECONDS_IN_WEEK
			) + 1;
		dateObject.setDate(dateObject.getDate() - (dayWeek - weekOfYear) * 7);
		// dateObject.toISOString();
		// => "2018-06-10T09:12:49.794Z
	}

	return new Date(dateObject);
};

// Manipulate
const calcBasicDateValues: TCalcBasicDateValues = (
	dateValue = new Date(),
	options = {},
	calcFunc
) => {
	const dateObject = new Date(dateValue);

	const dateValues: typeof options = getDateValues(
		dateObject,
		options as unknown as IDateBasicValuesOptions<boolean>
	);

	let item: keyof typeof options;
	let dateValuesItem: number;
	let optionsItem: number;

	for (item in options) {
		if (!dateValues[item] || !options[item]) continue;

		dateValuesItem = dateValues[item] as number;
		optionsItem = options[item] as number;

		if (item === 'milliseconds')
			dateObject.setMilliseconds(calcFunc(dateValuesItem, optionsItem));
		else if (item === 'seconds')
			dateObject.setSeconds(calcFunc(dateValuesItem, optionsItem));
		else if (item === 'minutes')
			dateObject.setMinutes(calcFunc(dateValuesItem, optionsItem));
		else if (item === 'hours')
			dateObject.setHours(calcFunc(dateValuesItem, optionsItem));
		else if (item === 'daysInMonth')
			dateObject.setDate(calcFunc(dateValuesItem, optionsItem));
		else if (item === 'month')
			dateObject.setMonth(calcFunc(dateValuesItem, optionsItem));
		else if (item === 'year')
			dateObject.setFullYear(calcFunc(dateValuesItem, optionsItem));
	}

	return dateObject;
};
// Add
// Add the specified number of days to the given date.
export const addDateValues: TAddDateValues = (
	dateValue = new Date(),
	options = {}
) =>
	calcBasicDateValues(
		dateValue,
		options,
		(dateIMilliseconds1, dateIMilliseconds2) =>
			dateIMilliseconds1 + dateIMilliseconds2
	);
// Start of Time
// Return the start of a unit of time for the given date.
export const subtractDateValues: TSubtractDateValues = (
	dateValue = new Date(),
	options = {}
) =>
	calcBasicDateValues(
		dateValue,
		options,
		(dateIMilliseconds1, dateIMilliseconds2) =>
			dateIMilliseconds1 - dateIMilliseconds2
	);

// Maximum of the given dates
// Returns the maximum (most distant future) of the given date.
export const maxOfDates: TMaxOfDates = (datesArray) =>
	new Date(
		Math.max.apply(
			null,
			datesArray.map((item) => new Date(item).getTime())
		)
	);
// new Date(Math.max(...datesArray.map(item => new Date(item).getTime())));

// Minimum of the given dates
// Returns the minimum (most distant future) of the given date.
export const minOfDates: TMinOfDates = (datesArray) =>
	new Date(
		Math.min.apply(
			null,
			datesArray.map((item) => new Date(item).getTime())
		)
	);
// new Date(Math.min(...datesArray.map(item => new Date(item).getTime())));

// End of Time
// Return the end of a unit of time for the given date.
// export const endOfTime = () => new Date().setHours(23, 59, 59, 999);

// Format
// Return the formatted date string in the given format.
// DateTimeFormat
const addZeroToStringStartIfLessThanLimit: TAddZeroToStringStartIfLessThanLimit =
	(str, limit) => {
		if (str.length >= limit) return str;

		return `0${str}`;
	};

export const formatDate: TFormatDate = (providedDate, options) => {
	// const providedDate = providedDate ? new Date(providedDate) : new Date();
	const result = options
		? addZeroToStringStartIfLessThanLimit(
				providedDate.toLocaleDateString(options.locales, options.format),
				2
		  )
		: addZeroToStringStartIfLessThanLimit(providedDate.toLocaleDateString(), 2);

	const tempArray: string[] = result.split(', ');

	if (tempArray.length === 1)
		return {
			date: tempArray[0],
		};
	// const tempArray2: string[] = [];

	const fullTimeString: string = tempArray[tempArray.length - 1];

	const fullDateString = tempArray.slice(0, tempArray.length - 1).join(',');

	let time: string;
	let timeZoneName: string;
	let withTimeZoneName: boolean = false;
	// let withHour12: boolean = false;

	if (options?.format?.timeZoneName) withTimeZoneName = true;
	// if (options?.format?.hour12) withHour12 = true;

	if (withTimeZoneName) {
		time = fullTimeString.split(/ \w+\+\d$/)[0];
		timeZoneName = fullTimeString.slice(time.length - 1);

		return {
			date: fullDateString,
			time,
			timeZoneName,
		};
	} else {
		time = fullTimeString;
		return {
			date: fullDateString,
			time,
		};
	}
};

// Time from now
// Return time from now.
// // Native
// new Intl.RelativeTimeFormat().format(-4, 'day');
// // => "4 days ago"

// Time from x
// Return time from x
// // Moment.js
// moment([2007, 0, 27]).to(moment([2007, 0, 29]));
// // => "in 2 days"
// // date-fns
// import formatDistance from 'date-fns/formatDistance';
// formatDistance(new Date(2007, 0, 27), new Date(2007, 0, 29));
// // => "2 days"

// Difference
// Get the unit of time between the given dates.
export const twoDateDifference: TTwoDateDifference = (date1, date2) =>
	new Date(new Date(date1).getTime() - new Date(date2).getTime());

// Is Before
// Check if a date is before another date.
export const dateIsBefore: TDateIsBefore = (date1, date2) =>
	new Date(date1) < new Date(date2);

// Is Same
// Check if a date is the same as another date.
export const dateIsSame: TDateIsSame = (date1, date2) =>
	new Date(date1) === new Date(date2);

// Is After
// Check if a date is after another date.
export const dateIsAfter: TDateIsAfter = (date1, date2) =>
	new Date(date1) > new Date(date2);

// Is Between
// Check if a date is between two other dates.
export const dateIsBetween: TDateIsBetween = (date, dateMin, dateMax) => {
	const dateObject = new Date(date);
	return dateObject > new Date(dateMin) && dateObject < new Date(dateMax);
};

// Is Leap Year
// Check if a year is a leap year.
export const dateIsLeapYear: TDateIsLeapYear = (date) => {
	const dateYear = getDateValues(date, { year: true }).year;

	if (typeof dateYear === 'number') {
		return new Date(dateYear, 1, 29).getDate() === 29;
	}

	console.error('dateYear variable is not a number');
	return false;
};

// Is a Date
// Check if a variable is a native js Date object.
export const isDate: TIsDate = (date) => new Date(date) instanceof Date;
