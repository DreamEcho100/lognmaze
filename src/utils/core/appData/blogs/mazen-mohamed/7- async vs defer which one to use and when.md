---
title: async vs defer which one to use and when
Tags: javascript async vs defer
image_alt: the difference between async and defer
thumbnailUrl: https://res.cloudinary.com/josefzacek/image/upload/v1520507339/blog/whats-the-difference-between-async-vs-defer-attributes.jpg
description: both async and defer attributes downloaded the external script in parallel to parsing the page, but the difference is in their execution time
---

The `<script>` tag when executes it is downloaded and executed immediately, blocking parsing until the script is completed

But, there are two attributes (`async`, `defer`) that will change its download time and/or execute time.

> The `async` and the `defer` attributes are only for **external scripts** (and should only be used if the `src` attribute is present).

## async attribute

The `async` attribute is **a boolean attribute**, if the `async` attribute is set, **the script is downloaded in parallel to parsing the page**, and **_executed as soon as it is available_**. **The parsing of the page is interrupted** _(The rendering)_ **once the script is downloaded completely**, and then **_the script is executed, before the parsing of the rest of the page continues_**.

> Parsing means taking the HTML stream and producing a document object. Rendering (and painting, i.e. showing up on the screen).

```js
<script src='script.js' async></script>
```

## defer attribute

The `defer` attribute is **a boolean attribute**. if the `defer` attribute is set, it specifies that **the script is downloaded in parallel to parsing the page**, and **_executed after the page has finished parsing_**.

```js
<script src='script.js' defer></script>
```

## When to use?

As you can see, both async and defer attributes downloaded the external script in parallel to parsing the page, but the difference is in there execution time.

### When to use async attribute?

Using `async` for scripts depends on **whether execution order matters to you** \_,
and remember if you use `async` and you need the **DOM**, you run the risk that the element you need cannot be found!
So you can use it for:

- **If needed,** the **DOM** you need is **already present** _(The **DOM** needed is present before the `<script>` tag with the `async` attribute)_.

- The script **doesn’t need** the **DOM** _(example: analytics, global store for variables)_.

- The script **doesn’t depend on** on other scripts.

### When to use defer attribute?

And `defer` you should use it for all other scripts.

`defer` is great because it:

- Gets loaded as soon as possible — so it reduces load times.

- **Doesn’t execute** until everything you need is **ready** _(so all the **DOM** you need is there, and you can put the `<script></script>` tag with the `defer` attribute in the `<head>` tag)_.

- Follows script order _(allows you to structure which script comes first)_.

## Resources and further reading

- [How and when to use Async and Defer attributes (zellwk.com)](https://zellwk.com/blog/javascript-async-and-defer/)

- [HTML **script** **async** Attribute (w3schools.com)](https://www.w3schools.com/Tags/att_script_async.asp)

- [HTML **script** **defer** Attribute (w3schools.com)](https://www.w3schools.com/Tags/att_script_defer.asp)

- [When to use async vs defer when loading scripts? (stackoverflow.com)](https://stackoverflow.com/questions/44443870/when-to-use-async-vs-defer-when-loading-scripts)

- [Is async ever better than defer? (stackoverflow.com)](https://stackoverflow.com/questions/42079902/is-async-ever-better-than-defer)
