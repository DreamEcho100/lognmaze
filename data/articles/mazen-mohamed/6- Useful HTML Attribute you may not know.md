---
title: Useful HTML Attribute you may not know
tags: html frontend-web-development frontend web-development attribute
image_alt: HTML (Hyper Text Markup Language)
image_src: https://revisezone.com/Imagedata/GraphicsWeb/attribute.jpg
description: From the SEO perspective, these attributes provide additional semantics to the code, which should be something positive for a search engine. HTML is the core of web development. Yet, many aspiring programmers merely learn about the surface of it, the little that gets them to know enough to move to CSS, JavaScript, etc. missing its full potential.
---

**HTML** is the core of web development. Yet, many aspiring programmers merely learn about the surface of it, the little that gets them to know enough to move to **CSS**, **Javascript**, etc. missing its full potential.

From the SEO perspective, these attributes provide additional semantics to the code, which should be something positive for a search engine.

We will take here a list of **HTML** attributes that many may not know, and they could be helpful.

## [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) `<input>` and `<form>` _(but not in HTML5)_

The `accept` attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow.

It used to be supported on the `<form>` element but was removed in favor of the file in HTML5.

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
> **_Because of this, you should make sure that the expected requirement is validated server-side._**

## [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple) in `<input>` and `<select>`

The `multiple` attribute, if set, it indicates whether multiple values can be entered in an input of the type email or file.

Valid for the email and file **input types** and the `<select>`.

## [`cite`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote#attr-cite) in  `<blockquote>`, `<del>`, `<ins>`, and `<q>`

The value will be an URL containing an online resource in which contains the quoted reference (or the insertion/deletion information in the case of `<ins>` and `<del>` tags respectively).

It is not a required attribute, but it can be interesting if we are citing an online article or document.

```html
<blockquote cite="https://datatracker.ietf.org/doc/html/rfc1149">
  <p>Avian carriers can provide high delay, low
  throughput, and low altitude service. The
  the connection topology is limited to a single
  point-to-point path for each carrier, used with
  standard carriers, but many carriers can be used
  without significant interference with each other,
  outside of early spring...</p>
</blockquote>
```

## [`allow`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allow) in `<iframe>`

Specifies the feature policy with the features available within the iframe. Some of [the values that it can have](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy): camera, accelerometer, fullscreen, microphone, USB...

`allow` redefines how features are included in the iframe. It is the way moving forward and leaves the attributes `allowfullscreen` or `allowpaymentrequest` for **legacy**.

## [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) in `<input>` and `<textarea>`

validation with regex!

Defines a regular expression against which the element's value will be validated against.

```html
<input type="password" 
 name="password" 
 id="password" 
 placeholder="6-20 chars, at least 1 digit, 1 uppercase and one lowercase letter" 
 pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$" autofocus required>

```

## [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) in `<input>` and `<textarea>`

An attribute that provides focus to the input element automatically by placing the cursor on it on page load, or when the [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) that it is part of is displayed.

```html
<input type="text" id="first-name" name="first-name" required autofocus>
```

## [`datetime`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del#attr-datetime) in `<time>`, `<ins>` and `<del>`

This attribute indicates **the time and date** of the **change** and must be [a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings) with an optional time.

If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp for the format of the string without a time.

The format of the string if it includes both date and time is covered in [Local date and time strings](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings).

For `ins` and `<del>`, the `datetime` will indicate the moment of the insertion/deletion.

```html
<p>
	<del datetime="2020-11-08T12:00">This text has been deleted</del>, here is the rest of the paragraph.
	<ins datetime="2010-07-10T19:00">T his paragraph has been inserted.</ins>
</p>
```


## [`spellcheck`](https://www.w3schools.com/tags/att_global_spellcheck.asp) in  `<textarea>`, `<input>` and `contenteditable` elements

The `spellcheck` attribute tells a browser whether or not to check the spelling/grammar of the text in an editable element.

Values include `true` and `false`, and are required if the `spellcheck` attribute is present.

When the `spellcheck` attribute is not included, the default value depends on the element and browser. Generally, `contenteditable` elements and `<textarea>`s behave as if it were set to `true`, and `<input>`s behave as if it were set to `false`.


```html
<input type=text spellcheck="true">
<input type=text spellcheck="false">
```

## [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)

You can use the `contenteditable` attribute in order to enable the user to edit the content or disable the user to edit the content.

> Note, When the `contenteditable` attribute is not set on an element, it will be inherited from its parent.

```html
<h2> Shoppping List(Content Editable) </h2>
 <ul class="content-editable" contenteditable="true">
		<li> 1. Milk </li>
		<li> 2. Bread </li>
		<li> 3. Honey </li>
</ul>
```

##  [`data-*`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

The `data-*` attributes are used to store custom data private to the page or application. The stored data can be used in JavaScript code to create further user experiences.

The `data-*` attributes consist of two parts:

The attribute name should not contain any uppercase letters and must be at least one character long after the prefix `data-*`
The attribute value can be any string

```html
<h2> Know data attribute </h2>
<div
 class="data-attribute" 
 id="data-attr" 
 data-custom-attr="You are just Awesome!"
> 
 I have a hidden secret!
</div>
<button onclick="reveal()">Reveal</button>
```

Then in JavaScript:

```js
const reveal = () => {
 const dataDiv = document.getElementById('data-attr');
 const value = dataDiv.dataset['customAttr'];
 document.getElementById('msg').innerHTML = `<mark>${value}</mark>`;
}
```

**Note:**
For reading the values of these attributes in **JavaScript**, you could use `getAttribute()` with their full **HTML** name(i.e., data-custom-attr)
```js
// From the previous code nstead of
// const value = dataDiv.dataset['customAttr'];
// you can use
const attribute = dataDiv.getAttribute('data-custom-attr');
```
But, the standard defines a more straightforward way: using a dataset property.

## [`translate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/translate)

The `translate` attribute is an enumerated attribute that is used to specify whether an element's translatable attribute values and its Text node children should be translated when the page is localized, or whether to leave them unchanged.

It can have the following values:

- empty string or `yes`, which indicates that the element should be translated when the page is localized.

- `no`, which indicates that the element must not be translated.

> Although not all browsers recognize this attribute, it is respected by automatic translation systems such as Google Translate, and may also be respected by tools used by human translators. As such it's important that web authors use this attribute to mark content that should not be translated.

```html
<header>
 <div class='logo' translate="no">
  <strong>BrandName</strong>
 </div>
</header>
```

## [`headers`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-headers) in `<th>` and `<td>`

This attribute contains a list of space-separated strings, each corresponding to the id attribute of the `<th>` elements that apply to this element.

This attribute is useful in complex tables as it provides context to machines. It could be interesting for assistive technologies or augmented experiences, but, unfortunately, **its support is spotty. So use with caution!**

```html
<table>
  <caption>Weekend plan</caption>
  <thead>
    <tr>
      <th></th>
      <th id="saturday">Saturday</th>
      <th id="sunday">Sunday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td><th id="morning" colspan="2">Morning</th>
    </tr>
    <tr>
      <th id="hour08">8:00-10:00</th>
      <td headers="saturday morning hour08">Soccer practice</td>
      <td headers="sunday morning hour08">Reading</td>
    </tr>
    <tr>
      <th id="hour10">10:00-12:00</th>
      <td headers="saturday morning hour10">Basketball game</td>
      <td headers="sunday morning hour10">Brunch</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td></td><th id="afternoon" colspan="2">Afternoon</th>
    </tr>
    <tr>
      <th id="hour12">12:00-14:00</th>
      <td headers="saturday afternoon hour12">Siesta</td>
      <td headers="sunday afternoon hour12">Golf</td>
    </tr>
    <tr>
      <th id="hour14">14:00-18:00</th>
      <td headers="saturday afternoon hour14">Party!</td>
      <td headers="sunday afternoon hour14">Monday readiness</td>
    </tr>
  </tbody>
</table>
```

## [`poster`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster) in `<video>`

When adding a video to a webpage instead of having an image and replacing it with the `<video>` once clicked. you can use this attribute. It will take the URL of an image, replaced when the video starts playing. It looks the same, but it provides more control over the video and how it is loaded.

```html
<video controls poster="video-poster-link.jpg">
  <source src="video-link.mp4" type="video/mp4">
  <source src="video-link.webm" type="video/webm">
  Sorry, your browser doesn't support embedded videos.
</video>
```

## [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) in `<input>`, `<textarea>` and `contenteditable` elements

The `inputmode` attribute is an enumerated attribute that hints at the type of data that might be entered by the user while editing the element or its contents. This allows a browser to display an appropriate virtual keyboard. For example, if you pick the type **number** when the keyboard **opens** on mobile, it will open with only numbers.

It is used primarily on `<input>` elements. but `<textarea>` tag and `contenteditable` elements can get a similar effect by using the attribute `inputmode`. So developers can decide what type of keyboard opens when the editable element is focused.

The `inputmode` property can have the values: decimal, email, none (no keyboard displayed on focus), numeric, search, tel, text (default), or URL.

```html
<input inputmode='email' type='email' name='email'>
<textarea inputmode="none" name="myTextarea">
<div contenteditable inputmode="decimal"></div>
```

## [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title)

The `title` attribute specifies extra information about an element.

The information is most often shown as a tooltip text when the mouse moves over the element.

The `title` attribute can be used on any **HTML** element (it will validate on any **HTML** element. However, it is not necessarily useful).

```html
<p><abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>
<p title="Free Web tutorials">W3Schools.com</p>
```

## [`download`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download) in `<a>`

The `download` attribute specifies that the target (the file specified in the href attribute) will be downloaded when a user clicks on the hyperlink.

The optional value of the `download` attribute will be the new name of the file after it is downloaded. There are no restrictions on allowed values, and the browser will automatically detect the correct file extension and add it to the file (.img, .pdf, .txt, .html, etc.).

If the value is omitted, the original filename is used.

```html
<a href="/images/image.jpg" download>
```

## Other attributes to look for

- [`ping`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-ping) in `<a>`: _A space-separated list of URLs. When the link is followed, the browser will send POST requests with the body PING to the URLs. Typically for tracking._

## Resources and further reading

- [7 interesting **HTML** attributes (you may not know) (dev.to)](https://dev.to/alvaromontoro/7-interesting-html-attributes-you-may-not-know-58j0)

- [10 **HTML** tags and attributes maybe you didn't know!😶 (dev.to)](https://dev.to/iftekhs/10-html-tags-and-attributes-maybe-you-didn-t-know-ake)

- [10 useful HTML5 features, you may not be using (blog.greenroots.info)](https://blog.greenroots.info/10-useful-html5-features-you-may-not-be-using)

- [HTML5 Forms: SpellCheck Type Attribute (wufoo.com)](https://www.wufoo.com/html5/spellcheck-attribute/)

- [**HTML** Global title Attribute (w3schools.com)](https://www.w3schools.com/tags/att_global_title.asp)

- [**HTML** **a** tag download Attribute](https://www.w3schools.com/tags/att_a_download.asp)
