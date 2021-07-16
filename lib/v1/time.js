export const dateToHumanReadableDate = (providedDate, options) => {
	const date = providedDate ? providedDate : new Date();

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

	return new Date(date).toLocaleDateString(locale, {
		day,
		month,
		year,
	});
};

// dateToHumanReadableDate(new Date(), {
// 	locale: 'en-us',
// 	format: { day: 'numeric', month: 'long', year: 'numeric' },
// });
