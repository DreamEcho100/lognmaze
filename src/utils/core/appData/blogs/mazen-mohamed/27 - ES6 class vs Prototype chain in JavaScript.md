---
title: ES6 class vs Prototype chain in JavaScript
description: we will covers the differences between the class syntax introduced in ES6 and the prototype chain, both ways to work with objects and inheritance in JavaScript. It covers the different ways to create new objects, implement inheritance, work with static properties and methods, and getters and setters. It also highlights the advantages and disadvantages of each approach and provides examples of code written in both styles.
tags: es6 class syntax javascript prototype-chain inheritance objects static-properties methods getters setters
thumbnailUrl: https://velog.velcdn.com/images/dltkdals224/post/f93bfb9d-4b72-4297-9058-1d549e4d483a/image.jpeg
---

ES6 introduced the class syntax, which is a more modern way of creating objects and working with the prototype chain in JavaScript. The class syntax provides a more familiar and traditional way of creating objects and working with inheritance, similar to the way it is done in other object-oriented languages like Java and C++.

And it also allows you to do a lot things easily like:

## Creating a new object and implement inheritance using the `extends` keyword

Here's an example of how you might use the class syntax in JavaScript to create an object and work with inheritance:

JavaScript ES6 class example:

```js
class Parent {
	constructor() {
		this.property1 = 'value1';
	}

	method1() {
		console.log('Hello');
	}
}

class Child extends Parent {
	method2() {
		console.log('Child method');
	}
}

const child = new Child();
console.log(child.property1); // 'value1'
child.method1(); // 'Hello'
child.method2(); // 'Child method'
```

JavaScript Prototype chain example:

```js
const Parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};

const Child = Object.create(Parent);
Child.method2 = function () {
	console.log('Child method');
};

const child = Object.create(Child);
console.log(child.property1); // 'value1'
child.method1(); // 'Hello'
child.method2(); // 'Child method'
```

As you can see, the `class` keyword is used to define a new class, and the `extends` keyword is used to indicate that one class inherits from another. The `constructor` method.

## Static methods and properties

Can be defined on a class using the `static` keyword. These methods and properties are **shared across all instances of the class** and are not available on individual instances. They are useful for utility methods, or for creating **"namespaces"** to group related functions.

JavaScript ES6 class example:

```js
class MyMath {
	static PI = 3.14;
	static add(a, b) {
		return a + b;
	}
}
console.log(MyMath.PI); //3.14
console.log(MyMath.add(1, 2)); //3
```

JavaScript Prototype chain example:

```js
const MyMath = {};
Object.defineProperty(MyMath, 'PI', {
	value: 3.14,
	enumerable: true,
	writable: false,
	configurable: false
});

MyMath.add = function (a, b) {
	return a + b;
};
console.log(MyMath.PI); //3.14
console.log(MyMath.add(1, 2)); //3
```

In this example, we create an object `MyMath` and define the property 'PI' using the `Object.defineProperty()` method, this allows you to create a read-only property with a fixed value. Also, static methods, such as `add()` is added to the object directly.

Here, the `Object.defineProperty()` method is used to create a property with specific attributes, like in this case, we want to make it read-only and non-configurable, this is an equivalent of the static keyword in the class syntax.

Keep in mind that this approach does not provide the same level of organization and readability as the class syntax and it's considered less elegant.

You can also use `Object.defineProperty` method that allows you to define multiple properties for an object in one go.
Also, If you're using a library like `Object.defineProperty` might not be fully supported in some older browser so you may need to include additional libraries or transpile your code in order to use this approach in older browsers.

## Getters and setters

Can be defined using the get and set keywords, this allows you to define a function to be called when getting or setting the value of a property.

JavaScript ES6 class example:

```js
class MyString {
	constructor() {
		this._name = 'defaultName';
	}
	get name() {
		return this._name;
	}
	set name(newName) {
		this._name = newName;
	}
}

const myString = new MyString();
console.log(myString.name); // defaultName
myString.name = 'newName';
console.log(myString.name); // newName
```

JavaScript Prototype chain example:

```js
const MyString = {
	_name: 'defaultName'
};

Object.defineProperties(MyString, {
	name: {
		get: function () {
			return this._name;
		},
		set: function (newName) {
			this._name = newName;
		}
	}
});

const myString = Object.create(MyString);
console.log(myString.name); // 'defaultName'
myString.name = 'newName';
console.log(myString.name); // 'newName'
```

In this example, we create an object `MyString` that has a `_name` property and define the getter and setter for the name property using the `Object.defineProperties()` method.
This allows you to define a function to be called when getting or setting the value of a property, instead of using the get and set syntax in the class.

We use the `Object.create` method to instantiate the MyString object.

As you can see, this approach requires a bit more code and is less elegant and clear than the class syntax, you need to use `Object.defineProperties` method to create the getter and setter and use `Object.create` method to instantiate the object.
In addition, like the previous example, if you're using a library like `Object.defineProperties` might not be fully supported in some older browser so you may need to include additional libraries or transpile your code in order to use this approach in older browsers.

## Differences in implementation and behavior between the prototype chain and classes in JavaScript

It's important to be mindful of the differences in implementation and behavior between the prototype chain and classes in JavaScript, as they have their own specific differences and gotchas, and being familiar with both can help you write more efficient, maintainable, and effective code.

- The class syntax is just a **syntax sugar**, it does not change the underlying prototype-based model of JavaScript. This means that the prototype chain still works the same way and that instances of classes still have a prototype object.
- Classes are **not hoisted** like function declarations, you need to declare your class before you use it.
- The `constructor` method is special method that is called when an object is instantiated from a class. It's used to set up the initial state of the object, and it's called automatically when the new keyword is used to create a new object.
- Methods and properties are **defined on the prototype object** of the class, so, all instances of the class share the same methods and properties, this is a great way to avoid memory waste.
- If a method is defined inside a class without being in the constructor, it's **added to the prototype object automatically**, as well all properties which not created inside the constructor method.
- The `super()` keyword is used to call a method on the parent class from within a child class, it can be used to access or call the parent class' constructor or methods.
- Keep in mind that, JavaScript classes **support inheritance and polymorphism, but not encapsulation in the traditional sense.** This means that the internal state of an object can be accessed directly and modified by any code with reference to the object.
- Classes are not completely supported in all browsers, specifically older versions of Internet Explorer, so you may need to include additional libraries or transpile your code in order to use classes in older browsers.

## How to check whether an object is an instance of a certain class or constructor and how To check if an object is in the prototype chain

In JavaScript, there are a few ways to check if an object is an instance of a certain class or constructor.

One way is to use the `instanceof` operator. The `instanceof` operator takes two operands, an object and a constructor, and returns true if the object is an instance of the constructor, and `false` otherwise.

```js
class MyClass {}
const myObject = new MyClass();
console.log(myObject instanceof MyClass); // true
```

Another way is to check the object's `constructor` property, which points to the constructor that was used to create the object. The constructor property can be compared to the constructor that you want to check against.

```js
class MyClass {}
const myObject = new MyClass();
console.log(myObject.constructor === MyClass); // true
```

You can also check object's `__proto__` property, which is the object that the object inherits its properties and methods from and check if the object's `__proto__` is equal to the constructor's prototype.

```js
class MyClass {}
const myObject = new MyClass();
console.log(myObject.__proto__ === MyClass.prototype); // true
```

Note that these methods only check that the object was constructed with the constructor, and not if an object has been inherited from a class or constructor.

To check if an object is in the prototype chain, you can use the Object.getPrototypeOf(obj) method which will return the prototype of the object. Then you can check the returned object with your constructor prototype.

```js
class MyClass {}
class MySubClass extends MyClass {}
const myObject = new MySubClass();
console.log(Object.getPrototypeOf(myObject) === MyClass.prototype); // true
```

You can keep checking the prototype of an object this way

## Transpilers and ES6 classes

Modern tools, such as transpilers, allow developers to use newer features of the JavaScript language, such as classes and arrow functions, in older browsers and environments that may not support those features natively. A transpiler is a type of tool that converts one programming language into another, in this case, transpilers are converting modern javascript code into a version of JavaScript that can run on older browsers.

One popular example of a transpiler for JavaScript is Babel. Babel is a JavaScript transpiler that can convert the latest JavaScript syntax into a backwards-compatible version of JavaScript that can be run by older browsers and environments. This allows developers to use newer language features, such as classes, without worrying about compatibility issues.

For example, you can write the following code using the ES6 class syntax:

```js
class MyMath {
	static PI = 3.14;
	static add(a, b) {
		return a + b;
	}
}
console.log(MyMath.PI); //3.14
console.log(MyMath.add(1, 2)); //3
```

And, if you want to run this code on an older browser that does not support the class keyword, you can use Babel to convert it to the following equivalent code that is compatible with older browsers:

```js
var MyMath = {};
Object.defineProperty(MyMath, 'PI', {
	value: 3.14,
	enumerable: true,
	writable: false,
	configurable: false
});

MyMath.add = function (a, b) {
	return a + b;
};
console.log(MyMath.PI); //3.14
console.log(MyMath.add(1, 2)); //3
```

With the help of Babel, you can use the class syntax in your code, and it will convert your code behind the scenes so that it works with older browsers. This makes it possible to use the latest features of the language while maintaining backwards-compatibility with older browsers.

It's also worth mentioning that some other transpilers, such as Traceur also provide support for features not yet standardized in JavaScript, like decorators, private class fields and more.
