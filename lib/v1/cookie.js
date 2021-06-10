export const setCookie = ({
	cookieName,
	cookieValue,
	expiresDate,
	domain,
	path,
}) => {
	console.log(`${process.env.FRONT_END_DOMAIN}`);
	let cookieString = '';
	if (cookieName) {
		if (cookieValue) {
			cookieString += `${cookieName}=${cookieValue};`;
		} else {
			cookieString += `${cookieName}='';`;
		}
	}
	if (expiresDate) cookieString += `expires=${expiresDate};`;
	// if (domain) cookieString += `domain=${domain};`;
	if (path) cookieString += `path=${path};`;
	console.log(cookieString);
	document.cookie = cookieString;
};

export const getCookie = (cookieName = '', cookieString = '') => {
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

export const checkCookie = (cookieName) => {
	const cookie = getCookie(cookieName);

	return cookie ? true : false;
};

export const deleteCookie = ({ cookieName }) => {
	// const currentDate = new Date();
	// currentDate.setTime(currentDate.getTime() - 2592000000); // 30 * 24 * 60 * 60 * 1000
	// const expires = 'expires=' + currentDate.toUTCString();
	// document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=${path}`;

	// document.cookie = `${cookieName}=""; ${new Date('1/1/1970').toUTCString()};`; // ` path=${path}`;
	// setCookie(
	// 	cookieName,
	// 	'',
	// 	-2592000000,
	// 	process.env.FRONT_END_DOMAIN,
	// 	process.env.FRONT_END_ROOT_URL
	// );

	// setCookie({
	// 	cookieName: cookieName,
	// 	// cookieValue: '',
	// 	expiresDate: new Date(new Date().getTime() - 2592000000).toUTCString(),
	// 	domain: process.env.FRONT_END_DOMAIN,
	// 	path: '/',
	// });

	// document.cookie = `${cookieName}='';max-age=-1;domain=${process.env.FRONT_END_DOMAIN};path=/`;
	document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure`;
};
