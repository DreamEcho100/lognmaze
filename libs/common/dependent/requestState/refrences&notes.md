```ts
import { String, Union } from 'ts-toolbelt';

// const query = `/home?a=foo&b=wow`;

// type Query = typeof query;

// type SecondQueryPart = String.Split<Query, "?">[1];

// type QueryElements = String.Split<SecondQueryPart, "&">;

// type QueryParams = {
//   [QueryElement in QueryElements[number]]: {
//     [Key in String.Split<
//       QueryElement,
//       "="
//     >[0]]: String.Split<QueryElement, "=">[1];
//   };
// }[QueryElements[number]];

// const obj: Union.Merge<QueryParams> = {
//   a: "foo",
//   b: "wow",
// };

const requestString = 'create,get,delete,update';
type TRequestString = typeof requestString;

const t: ['create', 'get', 'delete', 'update'] = [
 'create',
 'get',
 'delete',
 'update',
];

type TRequestKeysPart = typeof t; //String.Split<TRequestString, ",">; // [1];

// type TRequestKeysElements = String.Split<TRequestKeysPart, "&">;

interface IRequestState {
 isLoading: boolean;
 success: boolean;
 error: string;
}

type TRequestKeysParams = {
 [TRequestKeysElement in TRequestKeysPart[number]]: {
  [Key in String.Split<TRequestKeysElement, '='>[0]]: IRequestState; // String.Split<TRequestKeysElement, "=">[1];
 };
}[TRequestKeysPart[number]];

const s: Union.Merge<TRequestKeysParams> = {
 get: {
  isLoading: false,
  success: false,
  error: '',
 },
 create: {
  isLoading: false,
  success: false,
  error: '',
 },
 delete: {
  isLoading: false,
  success: false,
  error: '',
 },
 update: {
  isLoading: false,
  success: false,
  error: '',
 },
};
```

````tsx
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgZRlYA7A5gGjgVQ2AgzgF84AzKCEOAIhgGcBaGCCAGwCMBTTmPQDcAKBEB6cXADGJJvACOAV15QAnnAC8cAAbiAFrV4B+AIabKHAGTdNAdwh2doiVJhqwvOAEUV6rXDunhCUcMqqai6SgR5eyLyyGAAmvhEACqawAajo2AB0yGCcwDAAPKnqePTG9AB8ANoAjAC6UW6xPn5qAKKcvCC8GMzZaJhYBUUlpfGJKV0ZsFVWdW0xnp3pmaYgTAEIrnCH9RU9fQNDcJgb6r39g8z1GEogfFDNzQBciAeHRwDSvA0VxyYwmxTKP1+hxOt3OMBwkKh9E09ERcAaAAZ3l8QflCuDyl1YfcqiiGi1RNFDmRKVIyMciWd7kxHs9Xu9Vol5HAINwAFZfQjEDB5ACyqiwvEJmyg2yYtT2kNMX3olgg9ARVLg3BVDjsGoONLEXPglF4MGk+lxWACAHJpFBeKYYLwcJL4Ul+ObXUowElnbxbaIgl4ACoAMXNlutARDISoUato2wLhNgS+9XoDqdLo1DHdefonr6uaqvv9ueaATgmezAcLBaqxe9hfL9daYhDcAjiYBaiYC3g2jjoRgQkk1rBUx7FqTuVwDBwKzg0SaHYOXZnlr7TGJQ122kn+OnkdnO8HSxWYkwLqglFM0i8AElT9GYAHvodgEwADIQUxJGMXzcBwfSmBgoiHEwSjSI+TBMMBoFOhBIiHKoNBQF88jzqIZCdh0W76OeWw7IqRyETue7wFcFGAgOmQwKyLyqNin6-PUfaXKQR6TBCUKHLR-ZUQi-EMCiqG-JirEvomqABkIK5SDxBKCbuTJDKSdRrpB5C4fUqmDkx7LrmmCFCiQYoSlKBkkfKZFwO6Xz7FC35-gBQFUKYnBMK6ElQTBcEIZ53m+VC6HQF8tq2iJ5AxXWLpOX5ly-v+gHYF894hTF-mwbw8EZV5PnZXA4WYXAUUxWQMXNglbFfil7npcFRVJdBuX5c1oW-KVkXRRJVUSW2tXOb8rmpR5mUtVCbWBQVWVJT15V9dSIhkEAA
import { useReducer, useCallback, useEffect, Dispatch } from 'react';
import { String, Union } from 'ts-toolbelt';

enum ERequestsStateConstants {
 'IS_LOADING' = 'IS_LOADING',
 'SUCCESS' = 'SUCCESS',
 'ERROR' = 'ERROR',
}

export const requestsConstants = ERequestsStateConstants;

interface IRequestsStateReducerActionLoading<T> {
 type: ERequestsStateConstants.IS_LOADING;
 payload: {
  target: T;
 };
}
interface IRequestsStateReducerActionError<T> {
 type: ERequestsStateConstants.ERROR;
 payload: {
  target: T;
  error: string;
 };
}
interface IRequestsStateReducerActionSuccess<T> {
 type: ERequestsStateConstants.SUCCESS;
 payload: {
  target: T;
 };
}
export type TRequestsStateReducerActions<T> =
 | IRequestsStateReducerActionLoading<T>
 | IRequestsStateReducerActionError<T>
 | IRequestsStateReducerActionSuccess<T>;

interface IRequestStateReducerActionLoading {
 type: ERequestsStateConstants.IS_LOADING;
}
interface IRequestStateReducerActionError {
 type: ERequestsStateConstants.ERROR;
 payload: {
  error: string;
 };
}
interface IRequestStateReducerActionSuccess {
 type: ERequestsStateConstants.SUCCESS;
}
export type TRequestStateReducerActions =
 | IRequestStateReducerActionLoading
 | IRequestStateReducerActionError
 | IRequestStateReducerActionSuccess;

export interface IRequestsState {
 isLoading: boolean;
 success: boolean;
 error: string;
}

interface IPropsV1<T extends string> {
 requestsString: T;
 defaults?: { [key: string]: Partial<IRequestsState> };
}
interface IPropsV2 {
 defaults?: { [key: string]: Partial<IRequestsState> };
}

// export type TUseRequestsStateV1 = <T extends string>(
//  props: IPropsV1<T>
// ) => {
//  requestsState: {
//   [x: string]: IRequestsState;
//  };
//  requestsActionsDispatch: Dispatch<TRequestsStateReducerActions<string>>;
//  requestsConstants: typeof ERequestsStateConstants;
// };
// export type TUseRequestsStateV2 = <T extends undefined>(
//  props: IPropsV2
// ) => {
//  requestsState: IRequestsState;
//  requestsActionsDispatch: Dispatch<TRequestStateReducerActions>;
//  requestsConstants: typeof ERequestsStateConstants;
// };

/**
 * @example
 * ```tsx
 * const Example = () => {
 *   const { requestsState, requestsActionsDispatch, requestsConstants } =
 *     useRequestsState({
 *       requestsString: 'create,get,delete,update',
 *     });
 *   const getState = requestsState.get;
 *   return <>{getState.isLoading && <p>Loading items...</p>}</>;
 * };
 * ```
 * @param requestsString
 * @returns
 * requestsState:,
 * requestsActionsDispatch:,
 * requestsConstants:,
 * requestsKeys
 */

const handleIsString = ({
 requestsString,
 defaults,
}: {
 requestsString: string;
 defaults?: { [key: string]: Partial<IRequestsState> };
}) => {
 type TRequestsString = typeof requestsString;

 type TRequestsKeysPart = String.Split<TRequestsString, ','>;

 type TRequestsKeys = {
  [TRequestsKeysElement in TRequestsKeysPart[number]]: {
   [Key in String.Split<TRequestsKeysElement, '='>[0]]: IRequestsState;
  };
 }[TRequestsKeysPart[number]];

 type TRequestsState = Union.Merge<TRequestsKeys>;

 const requestsKeys = requestsString.split(',');

 const reducerCallback = (
  state: TRequestsState, // ReturnType<TUseRequestsState>['requestsState'],
  action: TRequestsStateReducerActions<keyof TRequestsState>
 ): TRequestsState => {
  if (process.env.NODE_ENV === 'development') {
   console.log('action.type', action.type);
  }

  switch (action.type) {
   case ERequestsStateConstants.IS_LOADING: {
    const { target } = action.payload;
    return {
     ...state,
     [target]: {
      isLoading: true,
      success: false,
      error: '',
     },
    };
   }
   case ERequestsStateConstants.ERROR: {
    const { target, error } = action.payload;
    return {
     ...state,
     [target]: {
      isLoading: false,
      success: false,
      error,
     },
    };
   }
   case ERequestsStateConstants.SUCCESS: {
    const { target } = action.payload;
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

 const initialState = (() => {
  const obj = {} as TRequestsKeys;

  requestsKeys.forEach((item) => {
   obj[item as keyof typeof obj] = {
    isLoading: false,
    success: false,
    error: '',
    ...(() => (defaults && item in defaults ? defaults[item] : {}))(),
   };
  });

  return obj as TRequestsState;
 })();

 return {
  reducerCallback,
  initialState,
  requestsKeys,
 };
};

const handleIsNotString = (defaults?: {
 [key: string]: Partial<IRequestsState>;
}) => {
 const reducerCallback = (
  state: IRequestsState,
  action: TRequestStateReducerActions
 ) => {
  if (process.env.NODE_ENV === 'development') {
   console.log('action.type', action.type);
  }

  switch (action.type) {
   case ERequestsStateConstants.IS_LOADING: {
    return {
     isLoading: true,
     success: false,
     error: '',
    };
   }
   case ERequestsStateConstants.ERROR: {
    const { error } = action.payload;
    return {
     isLoading: false,
     success: false,
     error,
    };
   }
   case ERequestsStateConstants.SUCCESS: {
    return {
     isLoading: false,
     success: true,
     error: '',
    };
   }

   default:
    break;
  }
  return state;
 };

 const initialState = {
  isLoading: false,
  error: '',
  success: false,
 };

 return {
  reducerCallback,
  initialState,
 };
};

// function useRequestsState <T extends string>(props: IPropsV1<T>): {
//  requestsState: {
//   [x: string]: IRequestsState;
//  };
//  requestsActionsDispatch: Dispatch<TRequestsStateReducerActions<string>>;
//  requestsConstants: typeof ERequestsStateConstants;
// };
// function useRequestsState <T extends string>(props?: IPropsV1<T>): {
//  requestsState: {
//   [x: string]: IRequestsState;
//  };
//  requestsActionsDispatch: Dispatch<TRequestsStateReducerActions<string>>;
//  requestsConstants: typeof ERequestsStateConstants;
// };

/**
 * @example
 * ```tsx
 * const Example = () => {
 *   const { requestsState, requestsActionsDispatch, requestsConstants } =
 *     useRequestState({
 *       requestString: 'create,get,delete,update',
 *     });
 *   const getState = requestsState.get;
 *   return <>{getState.isLoading && <p>Loading items...</p>}</>;
 * };
 * ```
 * @param requestString
 * @returns
 * requestsState:,
 * requestsActionsDispatch:,
 * requestsConstants:,
 * requestKeys
 */
const useRequestState = <T extends string>(props: IPropsV1<T>) => {
 const { reducerCallback, initialState } = handleIsString(props);

 const [requestsState, requestsActionsDispatch] = useReducer(
  reducerCallback,
  initialState
 );

 return {
  requestsState,
  requestsActionsDispatch,
  requestsConstants,
 };
};

export default useRequestState;

const Example = () => {
 const { requestsState, requestsActionsDispatch, requestsConstants } =
  useRequestState({
   requestString: 'create,get,delete,update',
  });
 const getState = requestsState.get;

 const handleFetchedData = (data: any) => {
  console.log(data);
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
````
