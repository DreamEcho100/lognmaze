---
title: Truncate Text using CSS
tags: truncate text css ellipses
image_alt: Three dots
thumbnailUrl: https://pngimage.net/wp-content/uploads/2018/06/3-dots-png-5.png
description: CSS can truncate single-line and multi-line Text using the property text-overflow
---

CSS can truncate single-line and multi-line Text using the property text-overflow

```css
text-overflow: clip|string|ellipsis|initial|inherit;
```

The `text-overflow` property determines how to handle inline text that overflows its block container by specifying how overflowed text is signaled to the user.

That is, it allows you to specify what to display at the points where the text overflows the container.

Text can overflow a block container only in its inline progression direction. Text may overflow when it is prevented from wrapping (e.g. due to `white-space: nowrap`) or a single word is too long to fit.

The white-space property must be set to nowrap and the overflow property must be set to hidden. The overflowing content can be clipped, display an ellipsis (`…`), or display a custom string.

For example:

## `clip` value

Text is clipped and cannot be seen. This is the default value.

```css
.elem {
	text-overflow: clip;
	/*^^^^^^^^^^^^^^^^*/
	white-space: nowrap;
	/*^^^^^^^^^^^^^^^^*/
	background: white;
	border: 1px solid black;
	max-width: 450px;
	padding: 0.5em 1em;
}
```

```bash
#  -----------------------------------
# | This is some long sentence that ca|nnot wrap, so it overflows the element.
#  -----------------------------------
```

But, as you can see, the text overflows its container but does not get clipped out or hidden. So, without any additional styles, the `text-overflow` property has no effect on the element.

In order for `text-overflow` to work, you need to clip the text that overflows its container. This can be done by setting the `overflow` property of the element to hidden, or any value other than visible. Using `overflow: hidden`, the above element becomes:

```css
.elem {
	text-overflow: white;
	background: white;
	border: 1px solid black;
	overflow: hidden;
	/*^^^^^^^^^^^^^*/
	white-space: nowrap;
	max-width: 450px;
	padding: 0.5em 1em;
}
```

```bash
#  -----------------------------------
# | This is some long sentence that ca|
#  -----------------------------------
```

## `ellipsis` value

Text is clipped and the clipped text is represented as `...`.

```css
.elem {
	text-overflow: ellipsis;
	/*           ^^^^^^*/
	white-space: nowrap;
	overflow: hidden;
	background: white;
	border: 1px solid black;
	max-width: 450px;
	padding: 0.5em 1em;
}
```

```bash
#  -----------------------------------
# | This is some long sentence that...|
#  -----------------------------------
```

## `string` value

**Note:** It's experimental, so you could expect the behavior to change in the future.

The clipped text is represented to the user using a string of the coder's choice. This option is only visible in the Firefox browser.

```css
.elem {
	text-overflow: '>>>';
	/*          ^^^^*/
	white-space: nowrap;
	overflow: hidden;
	background: white;
	border: 1px solid black;
	max-width: 450px;
	padding: 0.5em 1em;
}
```

```bash
#  -----------------------------------
# | This is some long sentence that>>>|
#  -----------------------------------
```

## Multi line truncate

**Multi-line** is not much more difficult, it is a combination of 3 properties. The solution is a proprietary CSS property that will limit the text of a block container to a given number of lines when used in combination with `display: -webkit-box` and `-webkit-box-orient: vertical`;

Even though it is proprietary is has 96% support in browsers according to Can I use.

```css
.elem {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	display: -webkit-box;
	/*^^^^^^^^^^^^^^^^^*/
	-webkit-line-clamp: 2;
	/*^^^^^^^^^^^^^^^^^^*/
	-webkit-box-orient: vertical;
	/*^^^^^^^^^^^^^^^^^^^^^^^^^*/
	background: white;
	border: 1px solid black;
	max-width: 450px;
	padding: 0.5em 1em;
}
```

## Notes

The side of the line that the ellipsis is placed **depends on the direction of the block.** E.g. an overflow hidden right-to-left (`direction:rtl`) block clips inline content on the left side, thus would place a text-overflow ellipsis on the left to represent that clipped content.

## Resources for further reading

- [CSS text-overflow Property (geeksforgeeks.org)](https://www.geeksforgeeks.org/css-text-overflow-property/)

- [Add an Ellipse to Truncated Text with CSS: Single-line and Multi-line Options (designkojo.com)](https://designkojo.com/add-ellipse-truncated-text-css-single-line-and-multi-line-options)

- [CSS Reference PROPERTY text-overflow (tympanus.net)](https://tympanus.net/codrops/css_reference/text-overflow/)

- [CSS text-overflow Property (w3schools.com)](https://www.w3schools.com/cssref/css3_pr_text-overflow.asp)
