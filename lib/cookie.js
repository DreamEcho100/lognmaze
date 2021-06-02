export const setCookie = (
	cookieName,
	cookieValue,
	timeInMili,
	path = process.env.FRONT_END_URL
) => {
	if (timeInMili && timeInMili !== 'none') {
		const currentDate = new Date();
		currentDate.setTime(currentDate.getTime() + timeInMili);
		const expires = 'expires=' + currentDate.toUTCString();
		document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=${path}`;
		return;
	}

	document.cookie = `${cookieName}=${cookieValue}; path=${path}`;
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

	let tempArray = document.cookie.split(';').map((c) => {
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

export const deleteCookie = (cookieName, path = process.env.FRONT_END_URL) => {
	// const currentDate = new Date();
	// currentDate.setTime(currentDate.getTime() - 2592000000); // 30 * 24 * 60 * 60 * 1000
	// const expires = 'expires=' + currentDate.toUTCString();
	// document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=${path}`;

	document.cookie = `${cookieName}=""; ${new Date(
		'1/1/1970'
	).toUTCString()}; path=${path}`;
};
