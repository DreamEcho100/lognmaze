---
title: What is JSON and what are the advantages of it
Tags: json programming developer
image_alt: JSON
thumbnailUrl: https://miro.medium.com/max/1024/1*M7ayIrIeF9Ss-VNwes7uBw.png
description: JSON is a language-independent data format. It was derived from JavaScript, it stands for JavaScript Object Notation and it is often used when data is sent from a server to a web page
---

## What is JSON?

JSON stands for **J**ava**S**cript **O**bject **N**otation.

JSON is an open standard lightweight file format and data interchange format for storing and transporting data.

JSON is often used when data is sent from a server to a web page.

JSON is "self-describing" and easy to understand.

## Advantages and why it is preferably used

- It is simple to build and debug.
- Low light-weight payload size.
- Acceptable across all modern high-level programming languages.

## JSON Syntax Rules

- Data is in name and value pairs.
- A name/value pair consists of a field name (in double quotes), followed by a colon, followed by a value: `"name": "John"` _(JSON names require double quotes)_.
- Data is separated by commas.
- Curly braces hold objects.
- Square brackets hold arrays.
- Arrays are called JSON Arrays.
- JSON Arrays hold JSON objects.
- JSON objects can contain other JSON objects and this is called **N**ested **J**SON **O**bjects.

### JSON Values

In JSON, values must be one of the following data types:

- string
- number
- object
- array
- boolean
- null

### example is a JSON string

```json
{
	"name": "John",
	"age": 30,
	"isMarried": false,
	"car": null,
	"hobbies": ["Hiking", "fishing", "cycling"],
	"contactInfo": {
		"phoneNumber": "000-000-000-000",
		"address": "blah blah street, at something city, etc."
	}
}
```

## JSON Files

The file type for JSON files is ".json"
The MIME type for JSON text is "application/json"

## JavaScript and JSON

JSON is a language-independent data format. It was derived from JavaScript _(as it is syntactically identical to the code for creating JavaScript objects)_, So a JavaScript program can easily convert JSON data into native JavaScript objects. Many modern programming languages include code to generate and parse JSON-format data. JSON filenames use the extension `.json`.

In JavaScript, an object value can be all like the values on JSON, plus any other valid JavaScript expression, including:

- function
- date
- undefined

## Parsing JSON in JavaScript

Imagine we received this text from a web server:

`'{ "name": "John", "age": 30, "isMarried": false, "car": null, "hobbies": ["Hiking", "fishing", "cycling"], "contactInfo": { "phoneNumber": "000-000-000-000", "address": "blah blah street, at something city etc." } }'`

Use the JavaScript function JSON.parse() to convert text into a JavaScript object:

```js
const data = JSON.parse(
	'{ "name": "John", "age": 30, "isMarried": false, "car": null, "hobbies": ["Hiking", "fishing", "cycling"], "contactInfo": { "phoneNumber": "000-000-000-000", "address": "blah blah street, at something city etc." } }'
);
```
