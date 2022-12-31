---
title: 10 ways to reverse a string in JavaScript
tags: reverse string javascript js algorithm algorithms
image_alt: Book with JavaScript on it
thumbnailUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--_pyWGSyD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/w9u60357jk4ozdho7urq.jpg
description: Reversing a string is one of the most commonly asked JavaScript questions in the technical round of interviews. Interviewers may ask you to write different ways to reverse a string, reverse a string without using in-built methods, or they may even ask you to reverse a string using recursion!
---

Reversing a string is one of the most commonly asked JavaScript questions in the technical round of interviews. Interviewers may ask you to write different ways to reverse a string, reverse a string without using in-built methods, or they may even ask you to reverse a string using recursion!

There are potentially a lot of ways to do it, excluding the built-in reverse method for strings, as JavaScript does not have one.

Below are ten different ways to solve the problem of reversing a string in JavaScript.

## Important Notes

- Given an input string and the task is to reverse the input string.

- If we are using a variable to use it to **hold** the reversed string remember to assign it first to empty quotes (`''` or `""`) or it **will add `undefined`** to the reversed string :).

- if we are using a loop that increment or assign a value every loop aside from the variable that holds the reversed string, we will declare that variable outside the loop **or it will be declared every loop** for example instead of:

```js
const reverseString = (str) => {
	// ...
	for (let i; i < str.length; i++) {
		// ...
	}
	// ...
};
```

we will do:

```js
const reverseString = (str) => {
	// ...
	let i;

	for (i; i < str.length; i++) {
		// ...
	}
	// ...
};
```

A minor optimization :).

- if we are going to use **an array method** we are going to use **the spilt string method** first to transform the string to an array of characters for example:

```js
const reverseString = (str) => {
	// ...
	str.split('');
	// If str = "Hi"
	// It will return ["H", "i"]
	// ...
};
```

- About the previous point, instead of using **the split string method** we can use **the ES6 spread syntax** for example

```js
const reverseString = (str) => {
	// ...
	[...str];
	// If str = "Hi"
	// It will return ["H", "i"]
	// ...
};
```

## The traditional for loop to reverse the string

In here using the for loop we will loop at the string but we can do it in two different ways by incrementing or decrementing.

### Incrementing

```js
const reverseString = (str) => {
	let reversedStr = '';
	let i;

	for (i = 0; i < str.length; i++) {
		reversedStr = str[i] + reversedStr;
	}
	// Can be shortened (but not recommended for readability) to:
	// for (i = 0; i < str.length; i++) reversedStr = str[i] + reversedStr;

	return reversedStr;
};

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```

In this example as we loop from the first index we will add the character to the first of the `reversedStr` variable.

### Decrementing

```js
const reverseString = (str) => {
	let reversedStr = '';
	let i;

	for (i = str.length - 1; i >= 0; i--) {
		reversedStr += str[i];
	}
	// Can be shortened (but not recommended for readability) to:
	// for (i = str.length - 1; i >= 0; i--) reversedStr += str[i];

	return reversedStr;
};

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```

In this example as we loop from the last index we will add the character to the end of the `reversedStr` variable.

## The for of loop

```js
const reverseString = (str) => {
	let reversedStr = '';
	let char;

	for (char of str) {
		reversedStr = char + reversedStr;
	}
	// Can be shortened (but not recommended for readability) to:
	// for (char of str) reversedStr = char + reversedStr;

	return reversedStr;
};

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```

In this example as we loop from the first character we will add it to the first of the `reversedStr` variable.

## The forEach array method

```js
const reverseString = (str) => {
	let reversedStr = '';

	str.split('').forEach((char) => {
		char += str;
	});
	// Or
	// str.split('').forEach(char => char += str);

	return reversedStr;
};

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```

In this example as we loop from the first character in the array and we will add it to the first of the `reversedStr` variable.

## The reverse array method

```js
const reverseString = (str) => str.split('').reverse().join('');

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```

In this example as we will use the reverse array method then join it return the string.

## ES6 standard

### The spread syntax

Like in the previous example we can use **the spread syntax** instead of the **the split string method**.

```js
const reverseString = (str) => [...str].reverse().join('');

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```

### The reduce array method

At last we can use **the reduce array method**.

```js
const reverseString = (str) =>
	str.split('').reduce((reversedStr, char) => char + reversedStr, '');

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```

## Recursion

1. We will assign the reversedStr `reversedStr = ''` which mean it has the length of zero!

2. We will add a self explanatory if check `if (reversedStr.length >= str.length)` if true we will return `reversedStr`.

3. If the check is false we will call the function we are in again, but here we will provide the original string as the first argument again, and as for the second argument we will provide `reversedStr` but we will add the first character of the `str` to it first.

```js
const reverseString = (str, reversedStr = '') => {
	if (reversedStr.length >= str.length) return reversedStr;

	return reverseString(str, str[reversedStr.length] + reversedStr);
};

const str = 'Hello World!';
const reversedStr = reverseString(str); // !dlroW olleH
console.log(`The reversed of <${str}> is <${reversedStr}>`);
```
