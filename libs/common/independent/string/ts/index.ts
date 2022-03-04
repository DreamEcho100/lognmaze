import stringUtilsConstants from '../constants';

export interface IPad0Options {
	maxLength?: number;
	padDir?: 'left' | 'right';
}
export type TPad0 = (str: string, options?: IPad0Options) => string;

export interface IReadingTimeOptions {
	wordsPerMinute?: number;
}
export type TReadingTime = (
	str: string,
	options: IReadingTimeOptions
) => {
	estimatedReadingTime: string;
	wordsPerMinute: number;
	wordsCount: number;
};

export type ISplitStringToSentences = (str: string) => RegExpMatchArray | null;
export type ISplitStringToParagraphs = (str: string) => string[];

export type TCountSentences = (str: string) => number;
export type TCountParagraphs = (str: string) => number;

export type TCase =
	| typeof stringUtilsConstants.KEBAB_CASE
	| typeof stringUtilsConstants.CAMEL_CASE
	| typeof stringUtilsConstants.PASCAL_CASE
	| typeof stringUtilsConstants.SNAKE_CASE
	| typeof stringUtilsConstants.UPPER_CASE
	| typeof stringUtilsConstants.LOWER_CASE
	| typeof stringUtilsConstants.CAPITAL_CASE
	| typeof stringUtilsConstants.CONSTANT_CASE
	| typeof stringUtilsConstants.TITLE_CASE
	| typeof stringUtilsConstants.SENTENCE_CASE;
// | 'header'
export type TArrCaseConvertor = (
	strArr: string[],
	choosedCase: TCase
) => string[];
type TCases = TCase[];
export type TCaseConvertor = (str: string, choosedCase: TCase) => string;
export type TCasesConvertorOptions = {
	cases?: TCases;
};
// interface ICaseConvertorOptions {}
export type TCasesConvertor = (
	str: string,
	options: TCasesConvertorOptions
) => string;
