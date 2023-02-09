---
title: 'JavaScript Objects: Understanding the Basics'
description: JavaScript's Object class is the foundation for all objects in the language. This guide provides an overview of the basics of JavaScript objects, including creation methods such as object literals, constructors, and factory functions. Additionally, it covers the prototype-based nature of JavaScript, which allows for dynamic modification of objects, and the ways to leverage inheritance and the prototype chain to organize and extend your code. With this guide, you will have a solid understanding of the building blocks of JavaScript objects.
tags: javascript objects object-creation object-literals prototype-based factory-functions beginner guide dynamic-objects prototype-chain
thumbnailUrl: https://velog.velcdn.com/images/dltkdals224/Post/f93bfb9d-4b72-4297-9058-1d549e4d483a/image.jpeg
---

In JavaScript, the `Object` class is the base class for all objects in the language. It is the parent of all objects, and provides a set of properties and methods that are available to all objects in the language.

It's important to note that in JavaScript all objects inherit from the `Object` class, but it's a bit different from other OOP languages like Java, C#, etc. because of the prototype-based nature of the language.

JavaScript's objects are dynamic, meaning that you can add, modify, and delete properties and methods on objects at runtime. You can create a new object using the object literal notation `{}`, using the `Object()` constructor, or using the object.create() method.

It's a lot of power, but also a lot of responsibility. Since you have the ability to add new properties or methods to the object prototype chain, it can break or make code much more complex to debug.

> One important thing to note is that JavaScript has a prototype chain that allows objects to inherit properties and methods from their parent objects. Each object has a prototype property that refers to the object from which it inherits properties and methods. This prototype chain is used to implement inheritance in JavaScript.

## Creating objects in JavaScript

There are several ways to create objects in JavaScript, each with its own advantages and disadvantages. Here are a few of the most common methods:

**Object literals:** This is the most basic and common way to create an object in JavaScript. You can create an object using the object literal notation `{}`, like this: `let myObject = {};`. This method is simple, easy to read, and requires minimal code. The main disadvantage of this method is that it creates a new object every time the code is executed, so it can be less efficient if you are creating numerous objects.

**Object constructor:** The `Object()` constructor can be used to create an object, like this: `let myObject = new Object();`. This method is similar to the object literal notation, but it can be used to create an object with a specific prototype. One disadvantage is that it can make the code harder to read and understand.

**`Object.create()`:** The `Object.create()` method can be used to create an object with a specific prototype, like this: `let myObject = Object.create(prototypeObject);` . This method is useful for creating an object that inherits from an existing object, without modifying the existing object. But it's important to note that this method does not create a new object by running the constructor function, it simply creates an object with the prototype specified. This method is less common and can be harder to read and understand.

> Also is possible to use `Object.create(null)` to create an object without any prototype, this is useful when you need an object that doesn't inherit any properties or methods from the `Object` class.

**Factory functions**: This method uses a function to create and return an object. A factory function is a plain function, not a class, that returns a new object. Here's an example:

```js
function createPerson(name) {
	return {
		name: name,
		sayHello: function () {
			console.log('Hello, my name is ' + this.name);
		}
	};
}
let myObject = createPerson('John');
```

This method allows encapsulating the object creation logic, and it is easy to test and reuse.

**The class syntax:** In ES6 a new class syntax was introduced, this allows to create class constructors and instances.

```js
class Person {
	constructor(name) {
		this.name = name;
	}

	sayHello() {
		console.log('Hello, my name is ' + this.name);
	}
}
let myObject = new Person('John');
```

It's more verbose and requires more code but the main advantage is that it can make the code easier to understand and debug, and it's more similar to other OOP languages.

Each of these methods has its own advantages and disadvantages, depending on the specific use case. Some are more efficient, others are easier to read and understand, and some are better suited for certain types of applications.

## Some of the most commonly used properties and methods of the `Object` class

- **[`Object.seal(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)** This method seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable.
- **[`Object.freeze(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)** This method is used to prevent new properties from being added to an object, prevent existing properties from being removed, and prevent existing properties, or their enumerability, configurability, or writability, from being changed.
- **[`Object.preventExtensions(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)** This method prevents new properties from being added to an object.

- **[`Object.isSealed(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)** This method returns a boolean indicating whether an object is sealed, which means that its properties cannot be added, removed, or modified. It can be useful for checking if an object is in a state where it should not be modified.
- **[`Object.isFrozen(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)** This method returns a boolean indicating whether an object is frozen, which means that its properties cannot be modified and are read-only. It can be useful for ensuring that an object's properties remain constant and cannot be changed.
- **[`Object.isExtensible(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)** This method returns a Boolean indicating whether the object is extensible (i.e., whether new properties can be added to it).

- **[`Object.keys(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)** returns an array of the enumerable own properties of an object.
- **[`Object.values(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)** This method returns an array of the object's own enumerable property values.
- **[`Object.entries(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)** This method returns an array of the object's own enumerable property key-value pairs.
- **[`Object.fromEntries(iterable)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)** The Object.fromEntries() static method transforms a list of key-value pairs into an object

- **[`Object.is(value1, value2)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)** This method compares the values of two objects and returns a boolean indicating whether they are the same value.

- **[`Object.hasOwnProperty(propertyName)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)** This method returns a Boolean value indicating whether an object has a property with the specified name.
- **[`Object.defineProperty(obj, prop, descriptor)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) and [`Object.defineProperties(obj, props)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)** Those methods are used to define new properties on an object or modify existing properties.
- **[`Object.isPrototypeOf(obj)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)** This method returns a Boolean value indicating whether an object is a prototype for another object.

- **[`Object.assign(target, ...sources)`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)** This method copies the values of all own enumerable properties from one or more source objects to a target object, and returns the target object.
- **[`Object.create()`:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)** This method creates a new object with the specified prototype object and properties.
