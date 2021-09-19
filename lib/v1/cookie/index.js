export const setCookie = ({
	cookieName,
	cookieValue,
	expiresDate,
	domain = false, // = process.env.FRONT_END_DOMAIN,
	path = '/',
	samesite = true,
	HttpOnly = true,
	Secure = true,
}) => {
	let cookieString = '';
	if (cookieName) cookieString += `${cookieName}=${cookieValue || ''};`;
	if (expiresDate) cookieString += `Expires=${expiresDate};`;
	if (domain) cookieString += `Domain=${domain};`;
	if (path) cookieString += `Path=${path};`;
	if (samesite) cookieString += 'samesite=lax;';
	if (HttpOnly) cookieString += HttpOnly;
	if (Secure) cookieString += Secure;
	document.cookie = cookieString;
};

export const getCookie = ({ cookieName = '', cookieString = '' }) => {
	let name = cookieName + '=';
	let decodedCookie = decodeURIComponent(cookieString);
	let cookieArray = decodedCookie.split(';');
	if (cookieArray.length !== 0) {
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
	}
	return '';

	let tempArray = cookieString.split(';').map((c) => {
		if (c.trim().startsWith(name + '=')) {
			return c.substr(c.indexOf('=') + 1);
		}
	});

	if (tempArray.length !== 0) {
		return tempArray[0];
	}

	return '';
};

export const checkCookie = ({ cookieName, cookieString }) => {
	const cookie = getCookie({ cookieName, cookieString });

	return cookie ? true : false;
};

export const deleteCookie = ({ cookieName }) => {
	setCookie({
		cookieName,
		cookieValue: '',
		expiresDate: 'Thu, 01 Jan 1970 00:00:00 GMT',
	});
	document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=/`; // SameSite=None; Secure
	document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Max-Age=-1; path=/;`;
};