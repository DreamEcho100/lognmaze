/*
interface SetCookieInterface {
	cookieName: string;
	cookieValue?: string;
	options: {
    path: string;
    sameSite: 'Strict' | 'strict' | 'Lax' | 'lax' | 'None' | 'none';
    secure: boolean;
    expires?: Date;
    domain?: string;
    httpOnly?: boolean;
	};
}
*/

type SetCookieOptionsType = {
	path?: string;
	sameSite?: 'Strict' | 'strict' | 'Lax' | 'lax' | 'None' | 'none';
	secure?: boolean;
	expires?: Date;
	domain?: string;
	httpOnly?: boolean;
};

export const setCookie = (
	cookieName: string,
	cookieValue: string = '',
	{
		path = '/',
		sameSite = 'lax',
		secure = true,
		...options
	}: SetCookieOptionsType
): void => {
	let cookieString = `${cookieName}=${cookieValue};Path=${path};SameSite=${sameSite};${
		secure && ' secure;'
	}`;

	if (options.expires) cookieString += `Expires=${options.expires};`;
	if (options.domain) cookieString += `Domain=${options.domain};`;
	if (options.httpOnly) cookieString += 'HttpOnly;';

	document.cookie = cookieString;
};

export const getCookie = (cookieName: string): string | undefined => {
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split(';');
	let cookieValue;

	cookieArray.find((cookie) => {
		if (cookie.trim().startsWith(`${cookieName}=`)) {
			cookieValue = cookie.substr(cookie.indexOf('=') + 1);
			return true;
		}
	});

	return cookieValue;
};

export const checkCookieByName = (cookieName: string): boolean =>
	!!getCookie(cookieName);
export const checkCookieByNameAndValue = (
	cookieName: string,
	cookieValue: string
): boolean => {
	const result = getCookie(cookieName);
	return !!result && result === cookieValue;
};

export const deleteCookie = (
	cookieName: string,
	options: SetCookieOptionsType | {} = {}
): void =>
	setCookie(cookieName, '', {
		...options,
		expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
	});

// export default {
//   set: setCookie,
//   get: getCookie,
//   checkByName: checkCookieByName,
//   checkByNameAndValue: checkCookieByNameAndValue,
//   delete: deleteCookie,
// }
