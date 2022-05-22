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
