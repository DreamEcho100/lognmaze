import { TNewsData } from '@coreLib/ts/global';

export type INewsContextStateData = {
	news: TNewsData;
	hit_news_items_limit: boolean;
};

export interface INewsContextState {
	data?: INewsContextStateData;
	// actions: {
	// requests: {
	// };

	// init: {
	// };
	// };
}

export type TNewsContextReducerAction = null;
