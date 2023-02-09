---
title: Useful HTML elements you may not know
tags: html frontend-web-development semantic-markup tags
image_alt: HTML stands for Hyper Text Markup Language
thumbnailUrl: https://www.ravedigital.agency/wp-content/uploads/2015/06/html51.jpg
description: As a web developer, HTML is one of the first languages we learn but it is tricky to learn everything about it and utilize its full potential since it has so many to offer and some of it you may never need and the demand to keep up and update your other skills like in CSS, JavaScript, any other languages, or frameworks/libraries you Know or want to learn
---

As a web developer **HTML** is one of the first languages we learn but it's tricky to learn everything about it and utilize its full potential since it has so many to offer and some of it you may never need and the demand to keep up and update your other skills like in `CSS`, `JavaScript`, any other languages, or **frameworks**_/_**libraries** you Know or want to learn.

Since **semantic HTML** has become common, so many new tags are introduced. But we usually stick to the common ones like `<nav></nav>` `<header></header>` `<footer></footer>` etc... .

But it's never too late to learn about the useful tags that get overlooked or misunderstood despite their benefit. So here in this blog, we will cover some rare and useful **HTML** tags that I think developers probably don’t know to help you discover the power of some under-used tags.

## Address (\<address></address>)

As the name implies, [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address) allows you to semantically markup addresses in **HTML**.

It defines the contact information of the organization or person or the Author of an article. The contact information can be anything; it can be the address, phone number, email, or website URL.

It will also italicize all of the data within the brackets, though the style can easily be changed through simple CSS.

```html
<p>Author contact info:</p>

<address>
	<a href="mailto:jim@rock.com">jim@rock.com</a><br />
	<a href="tel:+13115552368">(311) 555-2368</a>
	<p>1234 Nasr St.</p>
	<p>Cairo, Egypt</p>
</address>
```

### Usage notes for \<address></address>

- The [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address) element can only be used to represent the contact information for its nearest [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) or [`<body>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body) element ancestor.

- This element should not contain more information than the contact information, like a publication date (which belongs in a [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) element).

- Typically an [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address) element can be placed inside the [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) element of the current section if any.

- Although it renders text with the same default styling as the [`<i>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i) or [`<em>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em) elements, it's more appropriate to use [`<address>`](<[`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)>) when dealing with contact information, as it conveys additional semantic information.

## Time (\<time></time>)

The [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) tag tells the browser that the text refers to a time.

On some browsers (mainly on mobile devices) there will be a link to add the time to the calendar.

```html
<p>
	The meeting is on <time datetime="2020-07-17 19:00:00">Friday at 7pm</time>.
</p>
```

### It may represent one of the following

- A time on a 24-hour clock.

- A precise date in the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) (with optional time and timezone information).

- [A valid time duration](https://www.w3.org/TR/2014/REC-html5-20141028/infrastructure.html#valid-duration-string).

**You don’t always need the datetime attribute**. If you’re just showing a time, for example, then you can use [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) without the datetime, in case you are using a correct datetime value inside [`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time).

```html
<p>The meeting is at <time>19:00</time>.</p>
```

### Usage notes for \<time></time>

It may include the datetime attribute to translate dates into a machine-readable format, allowing for better search engine results or custom features such as reminders.

_Click [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#usage_notes) for more about its usage and its **valid datetime values**_

## Fieldset (\<fieldset></fieldset>)

Fieldset is a useful little attribute that you can add to your forms to logically group form elements. Once applied the [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) tag draws a box around the elements within the fieldset.

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

> If you add `disabled` attribute to the [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) tag it will disable all form controls that are descendants of it, even though form elements inside the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element won't be disabled so be cations.

## Small (\<small></small>)

Before **HTML5**, the [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small) element was only a presentational one, used to write words using a smaller font size.

In **HTML5** [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small) has some semantic value. Now the [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small) element represents text often found in small print like disclaimers, caveats, legal restrictions, or copyrights. An example of its use is shown below:

```html
<p>
	This article is offered to you Mazen Mohamed
	<small>Copyright © 2021</small>
</p>
```

### Quoting [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small#notes)

> Although the [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small) element, like the [`<b>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b) and [`<i>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i) elements, may be perceived to violate the principle of separation between structure and presentation, all three are valid in **HTML5**. Authors are encouraged to use their best judgment when determining whether to use [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small) or CSS.

## Details (\<details></details>)

By default, content within the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) tags are hidden but can be shown by clicking on it. Each element should display a summary of what it’s about when it’s hidden.

It creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label must be provided using the [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) element.

Using it looks something like this:

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

You can use `CSS` to style the disclosure widget, and you can _programmatically_ open and close the widget by setting/removing its open attribute. **Unfortunately**, at this time there's no built-in way to animate the transition between open and closed.

## acronym (\<acronym></acronym>)

> Warning it's **deprecated**, as of why we include it's because we will use to explain the [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) tag.

The [`<acronym>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/acronym) tag is a way to define or further explain a group of words. When you hover over text that has the [`<acronym>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/acronym) tag used, a box appears below with the text from the title tag. For example:

```html
<p>
	The company site <acronym title="Founded in 2021"> Twitter</acronym> has
	boommed recently.
</p>
```

But there is other ways that could be better which we will take about next.

## Abbr (\<abbr></abbr>)

The [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) tag is much akin to the [`<acronym>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/acronym) tag, except the [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) tag is not only excluded to **acronym** it can also be used to define **abbreviated** words. Just like [`<acronym>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/acronym), the **optional** `title` attribute can provide an expansion or description for the abbreviation. If present, `title` must contain this full description and nothing else. When a visitor hovers over the **abbreviated** text, the full definition appears below.

When the text hovers over, it will show the full title.

```html
An example for &lt;abbr&gt; tag in
<abbr title="HyperText Markup Language">HTML</abbr>.
```

### Usage notes for \<abbr>

> Each [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) element you use is independent of all others; providing a title for one does not automatically attach the same expansion text to others with the same content text.

And yes, we could do the same thing with a regular `<span>`.

```html
An example of doing it with &lt;span&gt; tag in
<abbr title="HyperText Markup Language">HTML</abbr>.
```

But using [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) can help the visually impaired, **who need text-to-speech software**. The text-to-speech tool is more easily able to tell that it’s an abbreviation this way.

> Accessibility concerns
> Spelling out the acronym or abbreviation in full the first time it's used on a page is beneficial for helping people understand it, especially if the content is technical or industry jargon.

_Click [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr#usage_notes) for more about its usage and its valid datetime values_

### Grammar considerations

In languages with a grammatical numbers (that is, languages where the number of items affects the grammar of a sentence), use the same grammatical number in your title attribute as inside your [`<abbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr) element. This is especially important in languages with more than two numbers, such as Arabic, but is also relevant in English.

## Cite (\<cite></cite>)

The [`<cite>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) tag is really useful for citing bibliographic and other site references like describing a reference to a cited creative work and must include the title of that work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.

It allows you to define the text inside of the element as a reference. Typically the browser will render the text inside of the [`<cite>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) tag in italics, but this can be changed with a little CSS

```html
<p>
	David Allen is breakthrough organization book
	<em><cite>Getting Things Done</cite></em> has taken the web by storm.
</p>
```

### Usage notes for \<cite></cite>

n the context of the [`<cite>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) element, a creative work that might be cited could be, for example, one of the following:

- A book

- A research paper

- An essay

- A poem

- _Click [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite#usage_notes) for more about it's usage_

## Q (\<q></q>`)

the [`<q>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q) tag used to specify the quote, and we can use [`<cite>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) for the source.

Note that until recently [`<cite>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite) could be used only to indicate a work’s title (book, article, film, etc.), not a person. However, this has been updated so that we can use it for ‘citing’ people too.

```html
<p>
	We should fight for our rights because, as <cite>Ezra Pound</cite> said,
	<q
		>If a man isn't willing to take some risk for his opinions, either his
		opinions are no good or he's no good.</q
	>
</p>
```

## Optgroup (\<optgroup></optgroup>)

The [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag is a great way to add a little definition between groups of options inside a select box. If you needed to group dinosaurs, for example, then it would look like this:

```html
<label for="dino-select">Choose a dinosaur:</label>
<select id="dino-select">
	<optgroup label="Theropods">
		<option>Tyrannosaurus</option>
		<option>Velociraptor</option>
		<option>Deinonychus</option>
	</optgroup>
	<optgroup label="Sauropods">
		<option>Diplodocus</option>
		<option>Saltasaurus</option>
		<option>Apatosaurus</option>
	</optgroup>
</select>
```

## Mark (\<mark></mark>)

The [`<mark>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark) tag defines the text that should be marked or highlighted to show the importance. This tag should not be confused with the [`<strong>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong) tag. As [`<strong>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong) tag indicates the span of the text of importance while [`<mark>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark) tag denotes content with a degree of relevance.

> - By default, the browsers display the mark element with a yellow background color.
> - Don't use [`<mark>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark) for syntax highlighting purposes; instead, use the [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) element with appropriate CSS applied to it.

### Quoting [MDN](https://developer.mozilla.org/en-us/docs/web/html/element/mark#usage_notes)

> - When used in a quotation ([`<q>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)) or blockquote ([`<blockquote>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)), it generally indicates text which is of special interest but is not marked in the original source material or material which needs special scrutiny even though the original Author didn't think it was of particular importance. Think of this like using a highlighter pen in a book to mark passages that you find of interest.
>
> - Otherwise, [`<mark>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark) indicates a portion of the document's content that is likely to be relevant to the user's current activity. This might be used, for example, to indicate the words that matched a search operation.

```html
<p><mark>LogNMaze</mark> is a community for creative writers.</p>
```

## Meter (\<meter></meter>)

The [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) tag defines either a scalar value within a known range or a fractional value.

For example disk usage, query result relevancy, etc.

Based on this element’s definition in the specification, [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) is not good to measure something like external temperature — because it doesn’t have a fixed range (you can define, it but it’s arbitrary).

This element has several attributes.

- Value: Refers to the current numeric value. Must lie between the min and max value.

- Min: It's the lower numeric bound of the measured range. Must be less than the maximum value if mentioned.

- Max: It's the upper numeric bound of the measured range. Must be greater than the minimum value if mentioned.

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

> Note: Unless the value attribute is between 0 and 1 (inclusive), the min and max attributes should define the range so that the value attribute values are within it.

## In Conclusion

In this article, we’ve discussed a number of **HTML** tags that are less used and often forgotten. I suggest you read the complete list of **HTML** tags available from [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or [here](https://html.spec.whatwg.org/multipage/#auto-toc-4) from time to time. In this way, you’ll refresh your knowledge of semantic elements

## Other tags to look and search for

- [`<template></template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)

- [`<wbr></wbr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr)

- [`<kbd></kbd>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)

- [`<samp></samp>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp)

- [`<ins></ins>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins)

- [`<del></del>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del)

- [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)

- [`<dfn></dfn>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn)

- [`<output></output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output)

- [`<pre></pre>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)

- [`<dialog></dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)

- [`<datalist></datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist)

- [`<menu></menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu)

## Resources and further reading

> Note there is a lot of researching and resource gathered from MDN, and the links for them is provided in the tags name like in [`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address) feel free to check them to read more about the topic.

- [8 Rare and Useful **HTML** tags You Probably Don’t Know (widgetcore.com)](https://widgetcore.com/8-rare-and-useful-html-tags-you-probably-dont-know/)

- [10 **HTML** tags You May Not Be Using (sitepoint.com)](https://www.sitepoint.com/10-html-tags-not-using/)

- [Five Obscure but Useful **HTML** tags (section.io)](https://www.section.io/engineering-education/obscure-html/)

- [10 Rare **HTML** tags You Really Should Know (code.tutsplus.com)](https://code.tutsplus.com/articles/10-rare-html-tags-you-really-should-know--net-3908)

- [10 **HTML** Elements You Didn't Know You Needed (dev.to)](https://dev.to/emmabostian/10-html-element-you-didnt-know-you-needed-3jo4)
