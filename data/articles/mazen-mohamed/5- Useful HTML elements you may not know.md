---
title: Useful HTML elements you may not know
tags: html frontend-web-development semantic-markup tags
image_alt:
image_src:
description: .
---

As a web developer `HTML` is one of the fist language we learn but it is tricky to learn everything about it and utilize it is full potential since it has so many to offer and some of it you may never need and the demand to keep up and update your other skills like in `CSS`, `JavaScript`, any other languages, or **frameworks**_/_**libraries** you Know or want to learn.

Since **semantic `HTML`** has become common, so many new tags are introduced. But we usually stick to the common ones like `<nav></nav>` `<header></header>` `<footer></footer>` etc... .

But it is never to late to learn about the useful tags that get overlooked or misunderstood despite their benefit. So here in this blog, we will cover some rare and useful HTML tags that I think developers probably don’t know to help you discover the power of some under-used tags.

## Address(`<address></address>`)

As the name implies, `<address>` allows you to semantically markup addresses in HTML.

It defines the contact information of the organization or person or the author of an article. The contact information can be anything; it can be the address, phone number, email, or website URL.

It will also italicize all of the data within the brackets, though the style can easily be changed through simple CSS.

```html
<p>Author contact info:</p>

<address>
	<a href="mailto: example@gmail.com">example@gmail.com</a>
	<p>1234 Nasr St.</p>
	<p>Cairo, Egypt</p>
</address>
```

## Time (`<time></time>`)

The <time> tag tells the browser that the text refers to a time.

On some browsers (mainly on mobile devices) there will be a link to add the time to the calendar.

```html
<p>
	The meeting is on <time datetime="2020-07-17 19:00:00">Friday at 7pm</time>.
</p>
```

You don’t always need the datetime attribute. If you’re just showing a time, for example, then you can use `<time>` without the datetime, like so.

```html
<p>The meeting is at <time>19:00</time>.</p>
```

## Fieldset (`<fieldset></fieldset>`)

Fieldset is a useful little attribute that you can add to your forms to logically group form elements. Once applied the `<fieldset>` tag draws a box around the elements within the fieldset.

```html
<form>
	<fieldset>
		<legend>Choose your gender?</legend>
		<label for="male">Male</label>
		<input name="gender" type="radio" id="male" value="male" />

		<label for="female">Female</label>
		<input name="gender" type="radio" id="female" value="female" />
	</fieldset>
</form>
```

## Small (`<small></small>`)

Before HTML5, the `<small>` element was only a presentational one, used to write words using a smaller font.

In HTML5 `<small>` has some semantic value. Now the `<small>` element represents text often found in small print like disclaimers, caveats, legal restrictions, or copyrights. An example of its use is shown below:

```html
<p>
	This article is offered to you Mazen Mohamed
	<small>Copyright © 2021</small>
</p>
```

## Details (`<details></details>`)

By default, content within the `<details>` tags are hidden, but can be shown by clicking on it. Each element should display a summary of what it’s about when it’s hidden. Using it looks something like this:

```html
<details>
	<summary>Click me to see the summary!</summary>
	<p>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo repellendus
		esse accusantium? Ea in voluptatem labore, perspiciatis delectus magni
		aperiam omnis esse quae reiciendis deleniti harum veritatis officiis est
		consectetur.
	</p>
</details>
```

## acronym (`<acronym></acronym>`)

The `<acronym>` tag is a way to define or further explain a group of words. When you hover over text that has the `<acronym>` tag used, a box appears below with the text from the title tag. For example:

```html
<p>
	The company site <acronym title="Founded in 2021"> Twitter</acronym> has
	boommed recently.
</p>
```

But there is other ways that could be better which we will take about next.

## Abbr (`<abbr></abbr>`)

The `<abbr>` tag is much akin to the `<acronym>` tag, except the `<abbr>` tag is only used to define **abbreviated** words. Just like `<acronym>`, you define a title within the tag. When a visitor hovers over the **abbreviated** text, the full definition appears below.

When the text is hovered over, it will show the full title.

```html
An example for &lt;abbr&gt; tag in
<abbr title="HyperText Markup Language">HTML</abbr>.
```

And yes, we could do the same thing with a regular `<span>`.

```html
An example of doing it with &lt;span&gt; tag in
<abbr title="HyperText Markup Language">HTML</abbr>.
```

But using `<abbr>` can help the visually impaired, **who need text-to-speech software**. The text-to-speech tool is more easily able to tell that it’s an abbreviation this way.

## Cite (`<cite></cite>`)

The `<cite>` tag is really useful for citing bibliographic and other site references.

It allows you to define the text inside of the element as a reference. Typically the browser will render the text inside of the `<cite>` tag in italics, but this can be changed with a little of CSS

```html
<p>
	David Allen is breakthrough organization book
	<em><cite>Getting Things Done</cite></em> has taken the web by storm.
</p>
```

## Q (`<q></q>`)

the `<q>` tag used to specify the quote, and we can use `<cite>` for the source.

Note that until recently `<cite>` could be used only to indicate a work’s title (book, article, film, etc.), not a person. However, this has been updated so that we can use it for ‘citing’ people too.

```html
<p>
	We should fight for our rights because, as <cite>Ezra Pound</cite> said,
	<q
		>If a man isn't willing to take some risk for his opinions, either his
		opinions are no good or he is no good.</q
	>
</p>
```

## Optgroup (`<optgroup></optgroup>`)

The `<optgroup>` tag is a great way to add a little definition between groups of options inside a select box. If you needed to group movie listings by time, for example, then it would look like this:

```html
<label for="show_times">Show Times</label>
<select id="show_times" name="show_times">
	<optgroup label="1PM"></optgroup>
	<option value="titanic">Twister</option>
	<option value="nd">Napoleon Dynamite</option>
	<option value="wab">What About Bob?</option>
	<optgroup label="2PM"></optgroup>
	<option value="bkrw">Be Kind Rewind</option>
	<option value="stf">Stranger Than Fiction</option>
</select>
```

## Mark (`<mark></mark>`)

The `<mark>` tag defines the text that should be marked or highlighted to show the importance. This tag should not be confused with the `<strong>` tag. As `<strong>` tag indicates the span of the text of importance while `<mark>` tag denotes content with a degree of relevance.

> By default, the browsers display the mark element with a yellow background color.

```html
<p><mark>LogNMaze</mark> is a community for creative writers.</p>
```

## Meter (`<meter></meter>`)

The [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) tag defines either a scalar value within a known range or a fractional value.

For example: disk usage, query result relevancy, etc.

Based on this element’s definition in the specification, [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) is not good to measure something like external temperature — because it doesn’t have a fixed range (you can define, it but it’s arbitrary).

This element has several attributes.

- Value: Refers to the current numeric value. Must lie between the min and max value.

- Min: It is the lower numeric bound of the measured range. Must be less than the maximum value if mentioned.

- Max: It is the upper numeric bound of the measured range. Must be greater than the minimum value if mentioned.

- Low: Refers to the upper numeric bound of the low-end measured range.

- High: Refers to the lower numeric bound of the high-end measured range.

- Optimum: Indicates the optimal numeric range.

So, if you want to indicate that a Fuel level is 50% remains, you can write:

```html
<label for="fuel">Fuel level:</label>

<meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="50">
	at 50/100
</meter>
```

> Note: Unless the value attribute is between 0 and 1 (inclusive), the min and max attributes should define the range so that the value attribute is value is within it.

## Other tags to look and search for

- `<template></template>`

- `<wbr></wbr>`

- `<kbd></kbd>`

- `<samp></samp>`

- `<ins></ins>`

- `<del></del>`

- `<base/>`

- `<dfn></dfn>`

- `<output></output>`

- `<pre></pre>`

## Resources and further reading

- [\<meter\>: The HTML Meter element (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)

- [8 Rare and Useful HTML Tags You Probably Don’t Know (widgetcore.com)](https://widgetcore.com/8-rare-and-useful-html-tags-you-probably-dont-know/)

- [10 HTML Tags You May Not Be Using (sitepoint.com)](https://www.sitepoint.com/10-html-tags-not-using/)

- [Five Obscure but Useful HTML Tags (section.io)](https://www.section.io/engineering-education/obscure-html/)

- [10 Rare HTML Tags You Really Should Know (code.tutsplus.com)](https://code.tutsplus.com/articles/10-rare-html-tags-you-really-should-know--net-3908)

- [10 HTML Elements You Didn't Know You Needed (dev.to)](https://dev.to/emmabostian/10-html-element-you-didnt-know-you-needed-3jo4)
