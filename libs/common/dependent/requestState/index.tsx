/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer } from 'react';
import { String, Union } from 'ts-toolbelt';

enum ERequestStateConstants {
	'IS_LOADING' = 'IS_LOADING',
	'SUCCESS' = 'SUCCESS',
	'ERROR' = 'ERROR',
}

export const requestsConstants = ERequestStateConstants;

interface IRequestStateReducerActionLoading<T> {
	type: ERequestStateConstants.IS_LOADING;
	payload: {
		target: T;
	};
}
interface IRequestStateReducerActionError<T> {
	type: ERequestStateConstants.ERROR;
	payload: {
		target: T;
		error: string;
	};
}
interface IRequestStateReducerActionSuccess<T> {
	type: ERequestStateConstants.SUCCESS;
	payload: {
		target: T;
	};
}

export type TRequestStateReducerActions<T> =
	| IRequestStateReducerActionLoading<T>
	| IRequestStateReducerActionError<T>
	| IRequestStateReducerActionSuccess<T>;

interface IRequestState {
	isLoading: boolean;
	success: boolean;
	error: string;
}

interface IProps<T extends string> {
	requestString: T;
}

/**
 * @example
 * ```tsx
 * const Example = () => {
 *   const { requestState, requestsActionsDispatch, requestsConstants } =
 *     useRequestState({
 *       requestString: 'create,get,delete,update',
 *     });
 *   const getState = requestState.get;
 *   return <>{getState.isLoading && <p>Loading items...</p>}</>;
 * };
 * ```
 * @param requestString
 * @returns
 * requestState:,
 * requestsActionsDispatch:,
 * requestsConstants:,
 * requestKeys
 */
const useRequestState = <T extends string>({ requestString }: IProps<T>) => {
	type TRequestString = typeof requestString;

	type TRequestKeysPart = String.Split<TRequestString, ','>;

	type TRequestKeys = {
		[TRequestKeysElement in TRequestKeysPart[number]]: {
			[Key in String.Split<TRequestKeysElement, '='>[0]]: IRequestState;
		};
	}[TRequestKeysPart[number]];

	type TRequestState = Union.Merge<TRequestKeys>;

	const requestKeys = requestString.split(',');
	const initState = (() => {
		const obj = {} as TRequestKeys;

		requestKeys.forEach((item) => {
			obj[item as keyof typeof obj] = {
				isLoading: false,
				success: false,
				error: '',
			};
		});

		return obj;
	}) as TRequestState;

	const requestStateReducer = (
		state: TRequestState, // ReturnType<TUseRequestState>['requestState'],
		actions: TRequestStateReducerActions<keyof TRequestState>
	): TRequestState => {
		switch (actions.type) {
			case ERequestStateConstants.IS_LOADING: {
				const { target } = actions.payload;
				return {
					...state,
					[target]: {
						isLoading: true,
						success: false,
						error: '',
					},
				};
			}
			case ERequestStateConstants.ERROR: {
				const { target, error } = actions.payload;
				return {
					...state,
					[target]: {
						isLoading: false,
						success: false,
						error,
					},
				};
			}
			case ERequestStateConstants.SUCCESS: {
				const { target } = actions.payload;
				return {
					...state,
					[target]: {
						isLoading: false,
						success: true,
						error: '',
					},
				};
			}

			default:
				break;
		}
		return state;
	};

	const [requestState, requestsActionsDispatch] = useReducer<
		typeof requestStateReducer
	>(requestStateReducer, initState);

	return {
		requestState,
		requestsActionsDispatch,
		requestsConstants,
		requestKeys,
	};
};

export default useRequestState;

/*
const Example = () => {
	const { requestState, requestsActionsDispatch, requestsConstants, requestKeys } =
		useRequestState({
			requestString: 'create,get,delete,update',
		});
	const getState = requestState.get;

	const handleFetchedData = (data) => {
		// ...
	};

	const fetchItems = useCallback(async () => {
		requestsActionsDispatch({
			type: requestsConstants.IS_LOADING,
			payload: {
				target: 'create',
			},
		});

		const response = await fetch('...');

		if (!response.ok)
			return requestsActionsDispatch({
				type: requestsConstants.ERROR,
				payload: {
					target: 'create',
					error: await response.text(),
				},
			});

		handleFetchedData(await response.json());

		requestsActionsDispatch({
			type: requestsConstants.SUCCESS,
			payload: {
				target: 'create',
			},
		});
	}, [
		requestsActionsDispatch,
		requestsConstants.ERROR,
		requestsConstants.IS_LOADING,
		requestsConstants.SUCCESS,
	]);

	useEffect(() => {
		fetchItems();
	}, [
		fetchItems,
		requestsActionsDispatch,
		requestsConstants.ERROR,
		requestsConstants.IS_LOADING,
	]);

	return <>{getState.isLoading && <p>Loading items...</p>}</>;
};
*/
