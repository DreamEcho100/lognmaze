export const setCookie = (
	cookieName,
	cookieValue,
	timeInMili,
	path = process.env.FRONT_END_URL
) => {
	const currentDate = new Date();
	currentDate.setTime(currentDate.getTime() + timeInMili);
	const expires = 'expires=' + currentDate.toUTCString();
	document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=${path}`;
};

export const getCookie = (cookieName) => {
	let name = cookieName + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let cookieArray = decodedCookie.split(';');
	let i;
	let cookie;
	for (i = 0; i < cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(name) === 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}
	return '';
};

export const checkCookie = (cookieName) => {
	const cookie = getCookie(cookieName);

	return cookie ? true : false;
};

export const deleteCookie = (
	cookieName,
	cookieValue,
	path = process.env.FRONT_END_URL
) => {
	const currentDate = new Date();
	currentDate.setTime(currentDate.getTime() - 2592000000); // 30 * 24 * 60 * 60 * 1000
	const expires = 'expires=' + currentDate.toUTCString();
	document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=${path}`;
};
