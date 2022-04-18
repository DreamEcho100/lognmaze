import { INewsItemExtraDataContext } from './ts';

export const returnNewsItemExtraDataInitialState =
	(): INewsItemExtraDataContext => ({
		data: {
			comments: [],
			comments_counter: 0,
			hit_comments_limit: false,
		},
		actions: {},
	});
