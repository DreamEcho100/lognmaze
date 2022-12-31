---
title: Full guide to cookies and JavaScript (client-side)
tags: cookies javascript client-side browser
image_alt: cookies and JavaScript
thumbnailUrl: https://i.morioh.com/2021/08/02/1f0e3c44.webp
description: cookies are data, stored in small text files, on your computer, and JavaScript has the ability to create, read, update, delete it on the client-side. we will take about cookies and how to CRUD them with JavaScript
---

## What are Cookies?

HTTP cookies (also called web cookies, Internet cookies, browser cookies, or simply cookies) are data, stored in small text files, on your computer.

When a web server has sent a web page to a browser, the connection is shut down, and the server forgets everything about the user.

Cookies were invented to solve the problem "how to remember information about the user":

- When a user visits a web page, his/her name can be stored in a cookie.
- Next time the user visits the page, the cookie "remembers" his/her name.

Cookies are saved in name-value pairs like

```bash
token = 123
```

When a browser requests a web page from a server, cookies belonging to the page are added to the request. This way the server gets the necessary data to "remember" information about users.

> None of the examples below will work if your browser has local cookies support turned off.

JavaScript can create, read, and delete cookies with the document.cookie property.

## Create a Cookie with JavaScript

With JavaScript, a cookie can be created like this:

```js
document.cookie = 'token=123';
```

### Persistent cookie

A persistent cookie **expires at a specific date or after a specific length of time**. For the persistent cookie's lifespan set by its creator, its information will be transmitted to the server every time the user visits the website that it belongs to, or every time the user views a resource belonging to that website from another website (such as an advertisement).

For this reason, persistent cookies are sometimes referred to as tracking cookies because they can be used by advertisers to record information about a user's web browsing habits over an extended period of time. However, they are also used for "legitimate" reasons (such as keeping users logged into their accounts on websites, to avoid re-entering login credentials at every visit).

Example:

```js
document.cookie = 'token=123; expires=Thu, 27 Dec 2021 12:00:00 UTC';
```

> Alternatively, the **_Max-Age_** attribute can be used to set the cookie's expiration as an interval of seconds in the future, relative to the time the browser received the cookie.

### Session cookie

A session cookie (also known as an in-memory cookie, transient cookie, or non-persistent cookie) exists only in temporary memory while the user navigates a website. Session cookies expire or are deleted when the user closes the web browser. Session cookies are identified by the browser by the absence of an expiration date assigned to them.

With a path parameter, you can tell the browser what path the cookie belongs to. By default, the cookie belongs to the current page.

> _Just set it with no specified date_

```js
document.cookie = 'token=123;';
```

### Domain and Path

The **_Domain_** and **_Path_** attributes define the scope of the cookie. They tell the browser what website the cookie belongs to. For security reasons it can only be set and accessed by the top domain **(If not specified then the current domain it's been set on, and the path is / by default)** and its subdomain so site **_example1.com_** can't access the cookie of **_example-2.org_**

```js
document.cookie = 'token=123; expires=Thu, 27 Dec 2021 12:00:00 UTC; path=/';
```

### Secure and HttpOnly

The Secure and HttpOnly attributes do not have associated values. Rather, the presence of just their attribute names indicates that their behaviors should be enabled.

The **_Secure_** attribute is meant to keep communication limited to encrypted transmission, directing the browser to use cookies only via encrypted/secure connection.

> However if a web server sets a cookie with **_Secure_** from a non-secure connection it can still be intercepted by _a man in the middle attack_, so consider setting them via secure connection only for more security.

The **_HttpOnly_** attribute directs the browser to not expose cookies through channels except for the **_HTTP/HTTPS_** request.

> The **_HttpOnly_** will lead to the cookie not be accessed by client-side scripting but it can be accessed the server via the **_HTTP/HTTPS_** request.

### Same-site

SameSite can have a value of **_Strict_**, **_Lax_** or **_None_**.

- **_SameSite=Strict_** the browsers would only send cookies to a target domain that is the same as the origin domain. This would effectively mitigate cross-site request forgery (CSRF) attacks.
- **_SameSite=Lax_** browsers would send cookies with requests to a target domain even it is different from the origin domain, but only for safe requests such as GET (POST is unsafe) and not third-party cookies (inside iframe).
- **_SameSite=None_** would allow third-party (cross-site) cookies, however, most browsers require secure attribute on SameSite=None cookies.

Example:

```js
document.cookie =
	'token=123; expires=Thu, 27 Dec 2021 12:00:00 UTC; path=/; SameSite=Lax';
```

Let's Create a function that will Create the cookie

```js
export const setCookie = (cookieName, cookieValue, options = {}) => {
	let cookieString = '';
	const {
		expiryDate,
		domain,
		path = '/',
		samesite = 'Lax',
		Secure = true,
		HttpOnly
	} = options;

	cookieString += `${cookieName}=${cookieValue || ''};`;
	if (expiryDate)
		cookieString += `Expires=${new Date(expiryDate).toUTCString()};`;
	if (domain) cookieString += `Domain=${domain};`;
	if (path) cookieString += `Path=${path};`;
	if (samesite) cookieString += `samesite=${samesite};`;
	if (HttpOnly) cookieString += 'HttpOnly;';
	if (Secure) cookieString += 'Secure;';

	document.cookie = cookieString;
};
```

```js
// Lets's set a token = 12345 to cookie
const expiryDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10); // 10 days
setCookie('token', '12345', {
	expiryDate
	// ... other options you want to set
});
// We will set token_expiry_date to cookie since we will need it later
setCookie('token_expiry_date', expiryDate, {
	expiryDate
	// ... other options you want to set
});
```

## Read a Cookie with JavaScript

> document.cookie will return all cookies in one string much like: cookie1=value; cookie2=value; cookie3=value;

Let's Create a function that will read the value of the name we want in a cookie string

```js
const getCookie = (cookieName = '', cookieString = document.cookie) => {
	const decodedCookie = decodeURIComponent(cookieString);
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
```

## Change or update a Cookie with JavaScript

With JavaScript, you can change a cookie the same way you create it

> - The bad thing is the options will be overwritten including **expiry date** and if no value is provided it will turn it into a session cookie which will delete itself when you leave, **We can use token_expiry_date that we set in the cookie earlier in a cookie to work around this issue!**

```js
// let's take expiryDate from the cookie that we set previously first
const expiryDate = getCookie('token_expiry_date');

// Then let's change the token value in the cookie
setCookie('token', '54321', {
	expiryDate
	// ... Any other options you have previously set and don't want to change it
});
```

## Delete a Cookie with JavaScript

Deleting a cookie is very simple.

You don't have to specify a cookie value when you delete a cookie.

Just set the expires parameter to a past date:

> If you stored its expiry date in the cookie like I did don't forget to delete it.

```js
setCookie('token', undefined, {
	expiryDate: 'Thu, 01 Jan 1970 00:00:00 UTC'
});
// Don't forget
setCookie('token_expiry_date', undefined, {
	expiryDate: 'Thu, 01 Jan 1970 00:00:00 UTC'
});
```

Or Mke a function for it:

```js
const deleteCookie = (cookieName, options = {}) => {
	// We can
	document.cookie = `${cookieName}=''; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=${
		options.path ? options.path : '/'
	}; ${options.domin ? `Domin=${options.domin}` : '/'};`;
	// Or
	setCookie('token', undefined, {
		expiryDate: 'Thu, 01 Jan 1970 00:00:00 UTC',
		...options // Like the path
	});
};
```

```js
deleteCookie('token');
deleteCookie('token_expiry_date');
```

## Resources

- [JavaScript Cookies (w3schools.com)](https://www.w3schools.com/js/js_cookies.asp)

-[Document.cookie - Web APIs (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

- [HTTP cookie (en.wikipedia.org)](https://en.wikipedia.org/wiki/HTTP_cookie)
- [Cookies, document.cookie (javascript.info)](https://javascript.info/cookie)
