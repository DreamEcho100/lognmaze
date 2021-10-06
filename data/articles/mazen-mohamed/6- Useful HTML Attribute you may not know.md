---
title: Useful HTML Attribute you may not know
tags: html frontend-web-development attribute 
image_alt: HTML
image_src: https://revisezone.com/Imagedata/GraphicsWeb/attribute.jpg
description: HTML is the core of web development. Yet, many aspiring programmers merely learn about the surface of it, the little that get them to know enough to move to CSS, Javascript, etc. missing it's full potential
We will take here about a list of html attributes that many may not know, and they could be helpful
---

**HTML** is the core of web development. Yet, many aspiring programmers merely learn about the surface of it, the little that get them to know enough to move to **CSS**, **Javascript**, etc. missing it's full potential.

We will take here about a list of html attributes that many may not know, and they could be helpful.

## Accept `<input>` and `<form>` **(but not in HTML5)**

The [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow.

It used to be supported on the `<form>` element, but was removed in favor of file in HTML5.

You can use In more than one way in `<input type='file'>`

For instance, there are a number of ways Microsoft Excel files can be identified, so a site that accepts Excel files might use an `<input>` like this:

```html
<input
	type="file"
	id="docpicker"
	accept=".xlsx,.xlsm,.xlsb,.xltx,.xltm,.xls,.xlt,.xls,.xml,.xml,.xlam,.xla,.xlw,.xlr,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
/>
Copy to Clipboard
```

Whereas if you're accepting a media file, you may want to be include any format of that media type:

```html
<input type="file" id="soundFile" accept="audio/*" />
<input type="file" id="videoFile" accept="video/*" />
<input type="file" id="imageFile" accept="image/*" />
```

> The [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) attribute doesn't validate the types of the selected files; it provides hints for browsers to guide users towards selecting the correct file types. It is still possible (in most cases) for users to toggle an option in the file chooser that makes it possible to override this and select any file they wish, and then choose incorrect file types.
>
> **_Because of this, you should make sure that expected requirement is validated server-side._**

## Multiple for `<input>`, `<select>`

The Boolean multiple attribute, if set, it indicates whether multiple values can be entered in an input of the type email or file.

Valid for the `email` and `file` **input types** and the `<select>`.

## Allow for `<iframe>`

Specifies a feature-policy for the iframe.

## Pattern for `<input>`

Defines a regular expression which the element's value will be validated against.

## Datetime

## Spellcheck

## Contenteditable

## Translate

## 2 Submit buttons in 1 form

## headers

## Poster

## Inputmode

## Title

## Download

## Ping

<!-- ## Cite -->

## Resources and further reading

- [7 interesting HTML attributes (you may not know) (dev.to)](https://dev.to/alvaromontoro/7-interesting-html-attributes-you-may-not-know-58j0)

- [10 HTML tags and attributes maybe you didn't know!😶 (dev.to)](https://dev.to/iftekhs/10-html-tags-and-attributes-maybe-you-didn-t-know-ake)

- [7 Useful HTML Attributes that You Probably Don’t Know (morioh.com)](https://morioh.com/p/ad609e587407)

- [10 useful HTML5 features, you may not be using (blog.greenroots.info)](https://blog.greenroots.info/10-useful-html5-features-you-may-not-be-using)
