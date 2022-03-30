import stringUtilsConstants from './constants';

import {
	IPad0Options,
	TPad0,
	IReadingTimeOptions,
	TReadingTime,
	ISplitStringToSentences,
	ISplitStringToParagraphs,
	TCountSentences,
	TCountParagraphs,
	TCaseConvertor,
	TCasesConvertorOptions,
	TCasesConvertor,
} from './ts';

const pad0OptionsDefault: IPad0Options = { maxLength: 2, padDir: 'left' };
export const pad0: TPad0 = (str, options = pad0OptionsDefault) => {
	if (typeof options.maxLength !== 'number')
		throw new Error(
			"'maxLength' attribute in the 'options' prop is either not a number or undefined!"
		);

	if (str.length < options.maxLength) {
		const padding = '0'.repeat(options.maxLength - str.length);
		return options.padDir === 'left' ? padding + str : str + padding;
	}

	return str;
};

// t = 'TestReadingTimeFunction '.repeat(300) + ' ' + 'TestReadingTimeFunction '.repeat(299);
// t = ('TestReadingTimeFunction '.repeat(299)).repeat(2);
// console.log(readingTime(t));
const readingTimeOptions: IReadingTimeOptions = {
	wordsPerMinute: 300,
};
// https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l
export const readingTime: TReadingTime = (
	str,
	options = readingTimeOptions
) => {
	if (typeof options.wordsPerMinute !== 'number')
		throw new Error(
			"'wordsPerMinute' attribute in the 'options' prop is either not a number or undefined!"
		);
	const wordsCount: number = str.trim().split(/\s+/).length;
	const calcArr1: string[] = (wordsCount / options.wordsPerMinute)
		.toFixed(2)
		.split('.');
	const seconds: string = pad0(
		Math.floor(parseInt(calcArr1[1]) * 0.6).toString()
	);
	let hours: string;
	let minutes: string;

	const temp: number = parseInt(calcArr1[0]);
	if (temp > 59) {
		const calcArr2: string[] = (temp / 60).toFixed(2).split('.');
		hours = pad0(calcArr2[0]);
		minutes = Math.ceil(parseInt(calcArr2[1]) * 0.6).toString();
		if (minutes === '60') {
			minutes = '00';
			hours = pad0((parseInt(hours) + 1).toString());
		} else {
			minutes = pad0(minutes.toString());
		}
	} else {
		hours = '00';
		minutes = pad0(temp.toString());
	}

	return {
		estimatedReadingTime: `${hours}:${minutes}:${seconds}`,
		wordsPerMinute: options.wordsPerMinute,
		wordsCount,
	};
};

// Credits to: https://stackoverflow.com/a/31430385/13961420
export const splitStringToSentences: ISplitStringToSentences = (str: string) =>
	// (/([.?!])\s*(?=[A-Z])/g, "$1|_!_|")
	// str.replace(/([.?!])\s*(?=[A-Z])/g, '$1|_!_|').split('|_!_|');
	// str
	// 	.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, '$1$2|_!_|')
	// 	.split('|_!_|');
	str.match(/^\w.+(\.+|\:|\!|\?|\"*|\'*|\)*|}*|]*|\s|\n|\r|\r\n)$/gim);

// https://stackoverflow.com/a/67572651/13961420
export const splitStringToParagraphs: ISplitStringToParagraphs = (
	str: string
) =>
	// (/\n+/gm)
	str.split(/(?:\r?\n)+/g);

// https://stackoverflow.com/a/35298009/13961420
export const countSentences: TCountSentences = (str) =>
	//str.split(/[.!?](?!\d)/g).filter(Boolean).length;
	splitStringToSentences(str)?.length || 0;

export const countParagraphs: TCountParagraphs = (str) =>
	splitStringToParagraphs(str).length;

export const caseConvertor: TCaseConvertor = (str, choosedCase) => {
	if (!str) throw new Error('');

	if (
		choosedCase === stringUtilsConstants.UPPER_CASE ||
		choosedCase === stringUtilsConstants.LOWER_CASE ||
		choosedCase === stringUtilsConstants.SENTENCE_CASE
	) {
		switch (choosedCase) {
			case stringUtilsConstants.UPPER_CASE: {
				return str.toUpperCase();
			}

			case stringUtilsConstants.LOWER_CASE: {
				return str.toLowerCase();
			}

			case stringUtilsConstants.SENTENCE_CASE: {
				return (
					splitStringToSentences(str)
						?.map((item) => item[0].toUpperCase() + item.slice(1))
						.join('') || ''
				);
			}

			default: {
				return str;
			}
		}
	}

	const wordsRegex: RegExp =
		/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

	switch (choosedCase) {
		// Credit to: [toKebabCase](https://www.30secondsofcode.org/js/s/to-kebab-case)
		case stringUtilsConstants.KEBAB_CASE: {
			// return wordsRegexArr.map((x) => x.toLowerCase()).join('-');
			return str
				.replace(wordsRegex, (match, offset, string) => {
					return (
						(offset > 0 && string[offset - 1] !== '\n' ? '-' : '') +
						match.toLowerCase().split(' ')
					);
				})
				.replace(/ +-+/g, '-');
		}

		// Credit to: [toTitleCase](https://www.30secondsofcode.org/js/s/to-title-case)
		case stringUtilsConstants.CAPITAL_CASE: {
			// return wordsRegexArr
			// 	.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
			// 	.join(' ');

			// const wordsRegexArr: RegExpMatchArray | null = str.match(wordsRegex);

			// if (!wordsRegexArr) return '';

			return str.replace(wordsRegex, (match, offset, string) => {
				return (
					// (offset > 0 && string[offset - 1] !== '\n' ? '-' : '') +
					match.charAt(0).toUpperCase() + match.slice(1)
				);
			});
		}

		// Credit to: [toCamelCase](https://www.30secondsofcode.org/js/s/to-camel-case)
		case stringUtilsConstants.CAMEL_CASE: {
			// const tempStr = wordsRegexArr
			// 	.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
			// 	.join('');

			// return tempStr.slice(0, 1).toLowerCase() + tempStr.slice(1);
			return str
				.replace(wordsRegex, (match, offset, string) => {
					return match.slice(0, 1).toUpperCase() + match.slice(1).toLowerCase();
				})
				.replace(/ +/g, '')
				.replace(/\w+/g, (match, offset, string) => {
					return match[0].toLowerCase() + match.slice(1);
				});
		}

		// Credit to: [toPascalCase](https://www.30secondsofcode.org/js/s/to-pascal-case)
		case stringUtilsConstants.PASCAL_CASE: {
			// return wordsRegexArr
			// 	.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
			// 	.join('');

			return str
				.replace(wordsRegex, (match, offset, string) => {
					return match.slice(0, 1).toUpperCase() + match.slice(1).toLowerCase();
				})
				.replace(/ +/g, '');
		}

		// // Credit to: [toSnakeCase](https://www.30secondsofcode.org/js/s/to-snake-case)
		case stringUtilsConstants.SNAKE_CASE: {
			// return wordsRegexArr.map((x) => x.toLowerCase()).join('_');
			return str
				.replace(wordsRegex, (match, offset, string) => {
					return (
						(offset > 0 && string[offset - 1] !== '\n' ? '_' : '') +
						match.toLowerCase().split(' ')
					);
				})
				.replace(/ +_+/g, '_');
		}

		case stringUtilsConstants.CONSTANT_CASE: {
			// return wordsRegexArr.map((x) => x.toUpperCase()).join('_');
			return str
				.replace(wordsRegex, (match, offset, string) => {
					return (
						(offset > 0 && string[offset - 1] !== '\n' ? '_' : '') +
						match.toUpperCase().split(' ')
					);
				})
				.replace(/ +_+/g, '_');
		}

		// Credit to [toTitleCase](https://www.30secondsofcode.org/js/s/to-title-case)
		case stringUtilsConstants.TITLE_CASE: {
			// return str.match(wordsRegex)
			// 	?.map(x => x.charAt(0).toUpperCase() + x.slice(1))
			// 	.join(' ') || '';
			return str
				.replace(wordsRegex, (match, offset, string) => {
					return match.slice(0, 1).toUpperCase() + match.slice(1).toLowerCase();
				})
				.replace(/\W/g, '');
		}

		default: {
			return str;
		}
	}
};

const caseConvertorOptionsDefault: TCasesConvertorOptions = {
	cases: [],
};
export const casesConvertor: TCasesConvertor = (
	str,
	options = caseConvertorOptionsDefault
) => {
	let newStr: string = str;

	options?.cases?.forEach((item) => (newStr = caseConvertor(newStr, item)));

	return newStr;
};
