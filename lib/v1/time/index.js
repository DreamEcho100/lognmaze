const addZeroToStringStartIfLessThanLimit = (string, limit) => {
	if (string.length >= limit) return string;

	return `0${string}`;
};

export const dateToHumanReadableDate = (providedDate, options) => {
	const date = providedDate ? new Date(providedDate) : new Date();
	const result = {};

	let locale;
	let day;
	let month;
	let year;

	if (options) {
		locale = options.locale ? options.locale : 'en-US';
		if (options.format) {
			day = options.format.day ? options.format.day : undefined;
			month = options.format.month ? options.format.month : undefined;
			year = options.format.year ? options.format.year : undefined;
		}
	}

	const dateString = new Date(date).toLocaleDateString(locale, {
		day,
		month,
		year,
	});

	result.dateString = dateString;

	let timeString;

	if (options.withTime) {
		const hours = addZeroToStringStartIfLessThanLimit(
			`${new Date(date).getHours()}`,
			2
		);
		const minutes = addZeroToStringStartIfLessThanLimit(
			`${new Date(date).getMinutes()}`,
			2
		);

		timeString = `${hours}:${minutes}`;
		result.timeString = timeString;
	}

	result.dateAndTimeString = `${dateString}, ${timeString}`;

	return result;
};

// dateToHumanReadableDate(new Date(), {
// 	locale: 'en-us',
// 	format: { day: 'numeric', month: 'long', year: 'numeric' },
// });
