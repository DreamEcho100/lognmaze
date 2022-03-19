import { INewsContextState } from './ts';

export const returnNewsInitialState = (): INewsContextState => ({
	data: {
		news: [],
		newsExtra: {},
		hit_news_items_limit: false,
	},
	actions: {
		items: {},
	},
});
