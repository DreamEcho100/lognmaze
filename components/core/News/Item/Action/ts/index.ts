import { Dispatch, SetStateAction } from 'react';

import {
	INewsItemTypeBlogBasicData,
	INewsItemTypePostBasicData,
} from '@coreLib/ts/global';
import { TNewsContextReducerAction } from '@store/NewsContext/ts';
import { TRequestStateReducerActions } from '@commonLibDependent/requestState';

export type THandleSubmitForCreateAndUpdateNewsItemActionType = (
	newsDispatch:
		| Dispatch<TNewsContextReducerAction>
		| ((value: TNewsContextReducerAction) => void),
	requestsActionsDispatch: Dispatch<TRequestStateReducerActions<'request'>>,
	props: INewsItemTypeBlogBasicData | INewsItemTypePostBasicData
) => Promise<string[] | undefined>;

export type TActionCreateAndUpdateValuesTypeBlog =
	INewsItemTypeBlogBasicData['type_data'] & {
		type: INewsItemTypeBlogBasicData['type'];
	};
export type TActionCreateAndUpdateValuesTypePost =
	INewsItemTypePostBasicData['type_data'] & {
		type: INewsItemTypePostBasicData['type'];
	};

export type TActionCreateAndUpdateValues =
	| TActionCreateAndUpdateValuesTypeBlog
	| TActionCreateAndUpdateValuesTypePost;

export type TSetActionCreateAndUpdateValues = Dispatch<
	SetStateAction<TActionCreateAndUpdateValues>
>;
export type TSetActionCreateAndUpdateValuesTypeBlog = Dispatch<
	SetStateAction<TActionCreateAndUpdateValuesTypeBlog>
>;
export type TSetActionCreateAndUpdateValuesTypePost = Dispatch<
	SetStateAction<TActionCreateAndUpdateValuesTypePost>
>;
