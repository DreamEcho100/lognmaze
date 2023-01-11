---
title: The power of the Object class in JavaScript
description:
tags:
thumbnailUrl:
---

In JavaScript, the Object class is the base class for all objects in the language. It is the parent of all objects, and provides a set of properties and methods that are available to all objects in the language.

It's important to note that in JavaScript all objects inherit from the Object class but it's a bit different than other OOP languages like Java, C#, etc. because of the prototype-based nature of the language.

JavaScript's objects are dynamic, meaning that you can add, modify, and delete properties and methods on objects at runtime. You can create a new object using the object literal notation "{}", using the Object() constructor, or using the object.create() method .

It's a lot of power, but also a lot of responsibility. Since you have the ability to add new properties or methods to the object prototype chain, it can break or make code much more complex to debug.

There are several ways to create objects in JavaScript, each with its own advantages and disadvantages. Here are a few of the most common methods:

**Object literals:** This is the most basic and common way to create an object in JavaScript. You can create an object using the object literal notation `{}`, like this: `let myObject = {};`. This method is simple, easy to read, and requires minimal code. The main disadvantage of this method is that it creates a new object every time the code is executed, so it can be less efficient if you are creating a large number of objects.

**Object constructor:** The `Object()` constructor can be used to create an object, like this: `let myObject = new Object();`. This method is similar to the object literal notation but it can be used to create an object with a specific prototype. One disadvantage is that it can make the code harder to read and understand.

**`Object.create()`:** The `Object.create()` method can be used to create an object with a specific prototype, like this: `let myObject = Object.create(prototypeObject);` . This method is useful for creating an object that inherits from an existing object, without modifying the existing object. But it's important to note that this method does not create a new object by running the constructor function, it simply creates an object with the prototype specified. This method is less common and can be harder to read and understand.

> Also is possible to use `Object.create(null)` to create an object without any prototype, this is useful when you need an object that doesn't inherit any properties or methods from the Object class.

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

This method allows to encapsulate the object creation logic, and it is easy to test and reuse.

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

## Prototype Chain

In JavaScript, `prototype` is a property of the constructor function that creates a new object, **it's defined as an object that serves as a blueprint for new objects created using that constructor**. When a new object is created using a constructor, it gets an internal property `[[Prototype]]` that points to the prototype of the constructor, this is not directly accessible but you can use `Object.getPrototypeOf(myObject)` or `myObject.__proto__` to access it.

It's also possible to modify the prototype chain by changing the object's prototype. You can use `Object.setPrototypeOf(myObject, newProto)` or `myObject.__proto__ = newProto` to set the prototype of an object to a new object, this will change the object's prototype and the prototype chain. This is a technique that is often used to implement inheritance in JavaScript.

When a property or a method is accessed in the object, the JS engine will first check the object itself, if it doesn't find it, it will look in the object's prototype, if it doesn't find it in the prototype, it will look in the prototype's prototype, and so on. This is how the prototype chain works, it's a linked list of objects that allow JS to look for properties and methods in a hierarchical way.

It's possible to create complex prototype chains with multiple levels, where an object prototype is an object created from another constructor that has a prototype of its own. This way you can create an inheritance hierarchy where properties and methods are inherited from different objects.

It's important to note that the prototype chain is different than the other OOP languages implementation of inheritance and it can be confusing and cause subtle bugs if not handled carefully.

## Similarities between the prototype chain and OOP

The prototype chain in JavaScript is similar to the inheritance mechanism used in other object-oriented programming (OOP) languages in that it allows objects to inherit properties and methods from parent objects. Here are some code examples that illustrate the similarities between the prototype chain and OOP inheritance **We will use Java for the OOP comparison**

> There will be difference between the syntax of the wo languages so you can read the following notes if you are not familiar with them.
>
> In Java:
>
> - classes are defined using the `class` keyword.
> - `this` keyword not needed in Java _(You can still access the class attributes directly without it)._
> - `constructor` is not needed in Java, because the default constructor of parent class will be called implicitly when a new object of Child class is created.
> - `System.out.println` to print the value on the console.
> - In Java, the `main` method is declared in a class separately.
> - Java uses `;` as a statement delimiter _(Not needed in JavaScript except for some cases)._
> - Class properties should be accessed using `.` in both languages.
> - It is a good practice to make a class that is intended to be inherited from should have protected or public fields in order to be accessible by child classes.
> - In Java The main method is declared in a class separately.
>
> In JavaScript:
>
> - `console.log` to print the value on the console.
> - `const` keyword is used to declare constant variables in JavaScript.
> - The uses of `;` is not needed as a statement delimiter _(except for some cases)._
> - Prototype properties should be accessed using `.` in both languages.

```java
class Parent {
    public void commonMethod() {
        System.out.println("Hello");
    }
}

class Child1 extends Parent {
    public void newMethod() {
        System.out.println("Child1 specific method");
    }
}

class Child2 extends Parent {
    public void newMethod() {
        System.out.println("Child2 specific method");
    }
}

class Main {
    public static void main(String[] args) {
        Child1 child1 = new Child1();
        Child2 child2 = new Child2();
        child1.commonMethod(); //"Hello"
        child1.newMethod(); //"Child1 specific method"
        child2.commonMethod(); //"Hello"
        child2.newMethod(); //"Child2 specific method"
    }
}
```

```js
// Define the parent object with a commonMethod
let Parent = {
	commonMethod: function () {
		console.log('Hello');
	}
};

// Create the child1 object that inherits from the parent object
let Child1 = Object.create(Parent);

// Add newMethod specific to the child1 object
Child1.newMethod = function () {
	console.log('Child1 specific method');
};

// Create the child2 object that inherits from the parent object
let Child2 = Object.create(Parent);

// Add newMethod specific to the child2 object
Child2.newMethod = function () {
	console.log('Child2 specific method');
};

// Usage
let child1 = Object.create(Child1);
let child2 = Object.create(Child2);
child1.commonMethod(); // "Hello"
child1.newMethod(); // "Child1 specific method"
child2.commonMethod(); // "Hello"
child2.newMethod(); // "Child2 specific method"
```

### Both provide a way for objects to inherit properties and methods from parent objects

Both the prototype chain in JavaScript and traditional OOP inheritance provide a way for objects to inherit properties and methods from parent objects. This means that developers can create new objects that automatically have access to properties and methods defined on a parent object, without having to explicitly assign those properties and methods to the child object. This can save a significant amount of time and effort, and it can make it easier to manage and maintain large and complex codebases.

```js
// JavaScript prototype chain
const parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};
const child = Object.create(parent);
console.log(child.property1); // 'value1'
child.method1(); // Hello
```

```java
// Java OOP
public class Parent {
    public String property1 = "value1";

    public void method1() {
        System.out.println("Hello");
    }
}

public class Child extends Parent {}

public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        System.out.println(child.property1); // 'value1'
        child.method1();  // Hello
    }
}
```

As you can see in both examples the child object inherits the property and method from the parent object.

### Both allow objects to be organized into hierarchies, with parent objects at the top and child objects at the bottom

Both the prototype chain in JavaScript and traditional OOP inheritance allow objects to be organized into hierarchies, with parent objects at the top and child objects at the bottom. This allows for a more modular and manageable structure to the codebase, where common properties and methods can be defined in parent objects, and specialized properties and methods can be defined in child objects.

```js
// JavaScript prototype chain
const grandParent = {
	property1: 'value1'
};
const parent = Object.create(grandParent);
const child = Object.create(parent);
console.log(child.property1); // 'value1'
```

```java
// Java OOP
public class GrandParent {
    protected String property1 = "value1";
}

public class Parent extends GrandParent {}

public class Child extends Parent {}

public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        System.out.println(child.property1); // 'value1'
    }
}
```

Both examples show that you can create an inheritance hierarchy where a child object inherits properties and methods from its parent and grandparent objects.

### Both allow objects to share common properties and methods, reducing the amount of code that needs to be written

Both the prototype chain in JavaScript and traditional OOP inheritance allow objects to be reused and extended, making it easier to build large and complex applications. This means that developers can create new objects that inherit properties and methods from existing objects, rather than having to recreate those properties and methods each time they're needed. This can save a significant amount of time and effort, and it can make it easier to manage and maintain large and complex codebases.

```js
// JavaScript prototype chain
const parent = {
	commonMethod: function () {
		console.log('Hello');
	}
};
const child1 = Object.create(parent);
const child2 = Object.create(parent);
child1.commonMethod(); // Hello
child2.commonMethod(); // Hello
```

```java
// Java OOP
class Parent {
    public void commonMethod() {
        System.out.println("Hello");
    }
}

class Child1 extends Parent {}
class Child2 extends Parent {}

public class Main {
    public static void main(String[] args) {
        Child1 child1 = new Child1();
        Child2 child2 = new Child2();
        child1.commonMethod(); // Hello
        child2.commonMethod(); // Hello
    }
}
```

Both examples show that the child objects share the same commonMethod from the parent class, this allows to reduce the amount of code and improve maintainability.

### Both allow objects to be reused and extended, making it easier to build large and complex applications

## The differences between the prototype chain is different and OOP, with code examples

The prototype chain in JavaScript is similar to the inheritance mechanism used in other object-oriented programming (OOP) languages in that it allows objects to inherit properties and methods from parent objects, but there are also some key differences. Here are some code examples that illustrate the differences between the prototype chain and OOP inheritance:

    JavaScript's prototype chain is based on objects, not classes:

```js
//JavaScript prototype chain
let parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};
let child = Object.create(parent);
console.log(child.property1); //'value1'
child.method1(); //Hello
```

```java
//Java OOP
class Parent {
    constructor() {
        this.property1 = 'value1';
    }
    method1() { console.log('Hello'); }
}
let child = new Parent();
console.log(child.property1); //'value1'
child.method1(); //Hello
```

In JavaScript, the prototype chain is based on the object's [[Prototype]] internal property that references another object, in contrast, most OOP languages use classes and the extends keyword to define inheritance.

    JavaScript's prototype chain can be modified at runtime:

```js
let parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};
let child = Object.create(parent);
child.method1 = function () {
	console.log('Bye');
};
child.method1(); //Bye
```

In javascript, the prototype chain is a dynamic mechanism, you can change the prototype of an object at any time, this allows for more

    Syntax: The syntax for implementing inheritance and reusing code is different in the prototype chain and traditional OOP. In JavaScript, the prototype chain is used to implement inheritance, while in traditional OOP languages such as Java or C++, the extends keyword is used to indicate inheritance.

    Implementation: The prototype chain is based on a prototype-based model of inheritance, where objects inherit properties and methods directly from other objects. In contrast, traditional OOP is based on a class-based model of inheritance, where classes define the properties and methods that objects will inherit.

    Inheritance and Overriding: In prototype-based OOP, there are no classes, just objects and it is only possible to inherit properties and methods that are directly on the object's prototype, and not to classes, it can be difficult to reason about and reason about the inheritance hierarchy. In contrast, with class-based OOP, the inheritance hierarchy is more structured and the ability to override methods allows for a more fine-grained control over the behavior of an object and its subclasses.

    Encapsulation: In prototype-based OOP, encapsulation is not enforced in the same way as in class-based OOP. Because properties and methods are directly on the object, they can be accessed and modified directly, making it difficult to control access to the data.

    Performance: The prototype chain can be slower than traditional OOP because of its more dynamic nature. When looking up a property, the JavaScript interpreter has to traverse the entire prototype chain to find the property. With traditional OOP, the search for a property is more efficient because it is based on a fixed class hierarchy.

There are several key differences between the prototype chain in JavaScript and traditional Object-Oriented Programming (OOP) inheritance. Here's an example that illustrates some of these differences:

    Syntax: The syntax for implementing inheritance and reusing code is different in the prototype chain and traditional OOP. In JavaScript, the prototype chain is used to implement inheritance.

```js
let parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};
let child = Object.create(parent);
```

In contrast, in traditional OOP languages such as Java or C++, the extends keyword is used to indicate inheritance.

```java
class Parent {
    public void commonMethod() {
        System.out.println("Hello");
    }
}
class Child extends Parent {};
```

    Implementation: The prototype chain is based on a prototype-based model of inheritance, where objects inherit properties and methods directly from other objects. In contrast, traditional OOP is based on a class-based model of inheritance, where classes define the properties and methods that objects will inherit.

    Inheritance and Overriding: In prototype-based OOP, there are no classes, just objects, it can be difficult to reason about the inheritance hierarchy and it is not possible to override properties, only to add new properties.

```js
let parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};
let child = Object.create(parent);
child.property1 = 'newValue'; //this will override the property
```

In contrast, with class-based OOP, the inheritance hierarchy is more structured and the ability to override methods allows for a more fine-grained control over the behavior of an object and its subclasses.

```java
class Parent {
    public void commonMethod() {
        System.out.println("Hello");
    }
}
class Child extends Parent {
    @override
    public void commonMethod(){
        System.out.println("overriden Hello");
    }
}
```

    Encapsulation: In prototype-based OOP, encapsulation is not enforced in the same way as in class-based OOP. Because properties and methods are directly on the object, they can be accessed and modified directly.

    Performance: The prototype chain can be slower than traditional OOP because of its more dynamic nature. When looking up a property, the JavaScript interpreter has to traverse the entire prototype chain to find the property. With traditional OOP, the search for a property is more efficient because it is based on a fixed class hierarchy.

In summary, prototype-based OOP and class-based OOP have different approaches, the prototype chain is more dynamic and the

## The prototype chain and ES6 class

ES6 introduced the class syntax, which is a more modern way of creating objects and working with the prototype chain in JavaScript. The class syntax provides a more familiar and traditional way of creating objects and working with inheritance, similar to the way it is done in other object-oriented languages like Java and C++.

Here's an example of how you might use the class syntax in JavaScript to create an object and work with inheritance:

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

let child = new Child();
console.log(child.property1); // 'value1'
child.method1(); // 'Hello'
child.method2(); // 'Child method'
```

As you can see, the `class` keyword is used to define a new class, and the `extends` keyword is used to indicate that one class inherits from another. The `constructor` method

    The class syntax is just a syntax sugar, it does not change the underlying prototype-based model of JavaScript. This means that the prototype chain still works the same way and that instances of classes still have a prototype object.

    Classes are not hoisted like function declarations, you need to declare your class before you use it.

    The constructor method is special method that is called when an object is instantiated from a class. It's used to set up the initial state of the object, and it's called automatically when the new keyword is used to create a new object.

    Methods and properties are defined on the prototype object of the class, so, all instances of the class share the same methods and properties, this is a great way to avoid memory waste.

    If a method is defined inside a class without being in the constructor, it's added to the prototype object automatically, as well all properties which not created inside the constructor method.

    The super() keyword is used to call a method on the parent class from within a child class, it can be used to access or call the parent class' constructor or methods.

    Keep in mind that, JavaScript classes support inheritance and polymorphism, but not encapsulation in the traditional sense. This means that the internal state of an object can be accessed directly and modified by any code with reference to the object.

    It's important to be mindful of the differences in implementation and behavior between the prototype chain and classes in JavaScript, as they have their own specific differences and gotchas, and being familiar with both can help you write more efficient, maintainable, and effective code.

    	Static methods and properties can be defined on a class using the static keyword. These methods and properties are shared across all instances of the class and are not available on individual instances. They are useful for utility methods, or for creating "namespaces" to group related functions.

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

    	Getters and setters can be defined using the get and set keywords, this allows you to define a function to be called when getting or setting the value of a property.

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

let myString = new MyString();
console.log(myString.name); // defaultName
myString.name = 'newName';
console.log(myString.name); // newName
```

    Classes are not completely supported in all browsers, specifically older versions of Internet Explorer, so you may need to include additional libraries or transpile your code in order to use classes in older browsers.

    It's always a good idea to test your code in different browsers and environments to ensure compatibility

## \_

<!--  -->

Some of the most commonly used properties and methods of the Object class include:

    The constructor property, which returns the function that created an object's prototype.
    The toString() method, which returns a string representation of an object.
    The valueOf() method, which returns the primitive value of an object.
    The hasOwnProperty(propertyName) method, which returns a Boolean value indicating whether an object has a property with the specified name.
    The isPrototypeOf(object) method, which returns a Boolean value indicating whether an object is a prototype for another object.
    The propertyIsEnumerable(propertyName) method, which returns a Boolean value indicating whether the specified property is enumerable.
    The defineProperty(propertyName, descriptor) and defineProperties(properties) methods, which are used to define new properties on an object or modify existing properties.

Yes, here are a few additional notes:

    One important thing to note is that JavaScript has a prototype chain that allows objects to inherit properties and methods from their parent objects. Each object has a prototype property that refers to the object from which it inherits properties and methods. This prototype chain is used to implement inheritance in JavaScript.

    The Object class also has a create() method, which creates a new object with the specified prototype and properties. This is useful for creating an object that inherits from an existing object, without modifying the existing object.

    The Object.freeze() method creates an immutable object, that means that the properties and methods of an object cannot be modified or deleted once the object is frozen. This can be useful for security and data integrity.

    The Object.seal() creates an sealed object, which is an object that can't be extended and not allows adding new properties, but you can still modify it's existing properties.

    The Object.keys(obj) method returns an array containing all the own enumerable properties of an object, including methods and values.

    The Object.values(obj) method returns an array containing all the own enumerable values of an object

    The Object.entries(obj) method returns an array of arrays, where each array contains a key-value pair for each own property.

    As you can see, the Object class provides a lot of useful functionality for working with objects in JavaScript, and it's often used as the base class when creating new objects or custom classes in the language.

In depth, tell me what is the Object class in JavaScript

Explain the following code

```ts
Object.fromEntries(
	Object.entries({
		x: 1,
		y: undefined,
		z: []
	}).filter((item) => typeof item[1] !== 'undefined')
);
```

This code is creating a new object by filtering the entries of another object.

The Object.entries function takes an object and returns an array of its key-value pairs. In this case, the input object is { x: 1, y: undefined, z: [] }. The resulting array is [['x', 1], ['y', undefined], ['z', []]].

The Array.filter function is then used to remove any key-value pairs where the value is undefined. This leaves us with [['x', 1], ['z', []]].

Finally, Object.fromEntries is used to turn the filtered array back into an object. The resulting object is { x: 1, z: [] }.
hassan.refaat.dev@gmail.com
Explain the purpose of the following code

```ts
Object.fromEntries(
	Object.entries({
		x: 1,
		y: undefined,
		z: []
	}).filter((item) => typeof item[1] !== 'undefined')
);
```

The purpose of this code is to remove the keys in an object that have a value of undefined. The code first converts the object to an array of key-value pairs using the Object.entries method. It then filters the array using the filter method and a callback function that checks if the value at index 1 (the value) is not undefined. Finally, the Object.fromEntries method is used to convert the filtered array back into an object.

For example, if we run this code on the following object:

const obj = {
x: 1,
y: undefined,
z: []
};

const result = Object.fromEntries(Object.entries(obj).filter(item => typeof item[1] !== 'undefined'));

Then the value of result would be:

{
x: 1,
z: []
}

The key-value pair y: undefined has been removed because the value is undefined.
hassan.refaat.dev@gmail.com
Write a two different algorithms that achieve the same purpose

Here are two different algorithms that achieve the same purpose as the code you provided:

Algorithm 1:

const obj = {
x: 1,
y: undefined,
z: []
};

const filteredObj = {};

for (const key of Object.keys(obj)) {
if (typeof obj[key] !== 'undefined') {
filteredObj[key] = obj[key];
}
}

console.log(filteredObj);

Algorithm 2:

const obj = {
x: 1,
y: undefined,
z: []
};

const filteredObj = {};

Object.entries(obj).forEach(([key, value]) => {
if (typeof value !== 'undefined') {
filteredObj[key] = value;
}
});

console.log(filteredObj);

hassan.refaat.dev@gmail.com
Between them and the original, which is more performant

It is difficult to accurately determine the performance of the different algorithms without testing them in a specific environment with specific input data. However, in general, the original algorithm using Object.entries() and Object.fromEntries() may be more performant because it utilizes built-in methods that are optimized for the specific task of iterating over the keys and values of an object and creating a new object from those key-value pairs.

Here are two alternative algorithms that achieve the same purpose as the original:

Algorithm 1:

function filterObject(obj: object) {
const result = {};
for (const key in obj) {
if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined') {
result[key] = obj[key];
}
}
return result;
}

Algorithm 2:

function filterObject(obj: object) {
return Object.keys(obj).reduce((result, key) => {
if (typeof obj[key] !== 'undefined') {
result[key] = obj[key];
}
return result;
}, {});
}

hassan.refaat.dev@gmail.com
What are the most under utilized method of the `Object` in JavaScript

It is difficult to determine which methods of the Object object are the most under utilized, as this can vary depending on the context and the specific use case. Some methods of the `Object object that are not commonly used include:

    Object.defineProperties(): This method allows you to define new or modify existing properties on an object, and accept an object that specifies the property descriptor.

    Object.isExtensible(): This method returns a Boolean indicating whether or not the object is extensible (i.e., whether new properties can be added to it).

    Object.preventExtensions(): This method prevents new properties from being added to an object.

    Object.seal(): This method seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable.

    Object.getOwnPropertySymbols(): This method returns an array of all symbol properties found directly on an object.

It is worth noting that these methods may be more or less commonly used depending on the specific use case and programming context.
hassan.refaat.dev@gmail.com
Give more

Here are some other underutilized methods of the Object object in JavaScript:

    Object.is(): This method compares the values of two objects and returns a boolean indicating whether they are the same value.
    Object.setPrototypeOf(): This method sets the prototype of an object, allowing you to modify the prototype chain of an object.
    Object.getOwnPropertySymbols(): This method returns an array of all symbol properties found directly on an object.
    Object.assign(): This method copies the values of all own enumerable properties from one or more source objects to a target object, and returns the target object.
    Object.getPrototypeOf(): This method returns the prototype of an object.

hassan.refaat.dev@gmail.com
Give more

Some other underutilized methods of the Object in JavaScript include:

    Object.getOwnPropertySymbols(): This method returns an array of all symbol properties found directly on an object. It can be useful for discovering and manipulating symbol properties that may not be enumerable or visible through normal object iteration.

    Object.isSealed(): This method returns a boolean indicating whether an object is sealed, which means that its properties cannot be added, removed, or modified. It can be useful for checking if an object is in a state where it should not be modified.

    Object.isFrozen(): This method returns a boolean indicating whether an object is frozen, which means that its properties cannot be modified and are read-only. It can be useful for ensuring that an object's properties remain constant and cannot be changed.

    Object.assign(): This method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It is often used for merging objects or creating shallow copies of objects.

    Object.getOwnPropertyDescriptors(): This method returns an object containing all own property descriptors for an object. Property descriptors are objects that describe the characteristics of a property, such as its value, writability, enumerability, and configurability. This method can be useful for examining and manipulating the properties of an object in a more fine-grained way.

hassan.refaat.dev@gmail.com
Give more

Here are a few more underutilized methods of the Object in JavaScript:

    Object.isExtensible(): This method returns a boolean indicating whether or not the object is extensible, i.e. whether or not new properties can be added to it.

    Object.getOwnPropertySymbols(): This method returns an array of all the symbols in the object's own symbol properties.

    Object.setPrototypeOf(): This method sets the prototype of an object to another object or null.

    Object.assign(): This method copies the values of all enumerable own properties from one or more source objects to a target object.

    Object.values(): This method returns an array of the object's own enumerable property values.

    Object.entries(): This method returns an array of the object's own enumerable property key-value pairs.

hassan.refaat.dev@gmail.com
Give more

Some additional under-utilized methods of the Object object in JavaScript include:

    Object.create(): This method creates a new object with the specified prototype object and properties. It is often under-utilized because many developers are unaware of its existence, or because they prefer to use object literals or the new operator to create objects.

    Object.isExtensible(): This method returns a boolean indicating whether the object is extensible (i.e., whether new properties can be added to it). It is useful for determining whether an object can be modified, but is often overlooked in favor of other methods such as Object.freeze().

    Object.getOwnPropertySymbols(): This method returns an array of all own symbol properties of an object. It is useful for iterating over an object's symbol properties, but is often overlooked in favor of Object.keys() or Object.getOwnPropertyNames().

    Object.getPrototypeOf(): This method returns the prototype of an object. It is useful for determining the inheritance chain of an object, but is often overlooked in favor of other methods such as __proto__ or Object.prototype.isPrototypeOf().

    Object.setPrototypeOf(): This method sets the prototype of an object. It is useful for changing the inheritance chain of an object, but is often overlooked in favor of other methods such as __proto__ or Object.create().

hassan.refaat.dev@gmail.com
In depth, tell me what is the `Object` class in JavaScript

In JavaScript, the Object class is a built-in object constructor that creates an object wrapper for a primitive data type or an object. It is a global object that is used to create new objects, and it is the prototype for many other objects.

The Object class has a number of methods and properties that allow you to work with objects in various ways. Some of the most commonly used methods and properties of the Object class include:

    Object.create(proto[, propertiesObject]): creates a new object with the specified prototype object and properties.
    Object.defineProperty(obj, prop, descriptor): adds the specified property to an object, or modifies an existing property, and returns the object.
    Object.defineProperties(obj, props): adds the specified properties to an object, or modifies existing properties, and returns the object.
    Object.getOwnPropertyDescriptor(obj, prop): returns a property descriptor for an own (i.e., non-inherited) property of an object.
    Object.getOwnPropertyNames(obj): returns an array of all own (i.e., non-inherited) properties of an object.
    Object.getPrototypeOf(obj): returns the prototype (i.e., the internal [[Prototype]] property) of an object.
    Object.keys(obj): returns an array of the enumerable own properties of an object.
    Object.setPrototypeOf(obj, prototype): sets the prototype (i.e., the internal [[Prototype]] property) of an object.

In addition to these methods, the Object class also has a number of properties, including Object.prototype, which is the prototype for all objects created using the Object constructor, and Object.length, which is the number of arguments expected by the Object constructor.

You can use the Object class to create new objects, define and modify properties on objects, and work with the prototype chain of objects. It is an essential part of working with objects in JavaScript.
hassan.refaat.dev@gmail.com
Can you describe more about it?

In JavaScript, the Object class is a built-in constructor that allows you to create objects. These objects are a collection of key-value pairs, where the keys are strings and the values can be any data type (primitive or object). The Object class is part of the core JavaScript language and is used to create and manipulate objects in JavaScript.

The Object class has a number of methods that can be used to manipulate objects, such as:

    Object.assign(): This method is used to copy the values of all enumerable own properties from one or more source objects to a target object.
    Object.create(): This method creates a new object with the specified prototype object and properties.
    Object.defineProperties(): This method is used to define new or modify existing properties on an object.
    Object.defineProperty(): This method is used to define a new property on an object or modify an existing property.
    Object.entries(): This method returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
    Object.freeze(): This method is used to prevent new properties from being added to an object, prevent existing properties from being removed, and prevent existing properties, or their enumerability, configurability, or writability, from being changed.
    Object.getOwnPropertyDescriptor(): This method returns a property descriptor for an own property of an object.
    Object.getOwnPropertyDescriptors(): This method returns all own property descriptors of a given object.
    Object.getOwnPropertyNames(): This method returns an array of all properties (enumerable or not) found directly upon a given object.
    Object.getOwnPropertySymbols(): This method returns an array of all symbol properties found directly upon a given object.
    Object.is(): This method is used to determine whether two values are the same value.
    Object.isExtensible(): This method is used to determine if an object is extensible (i.e., whether new properties can be added to it).
    Object.isFrozen(): This method is used to determine if an object is frozen (i.e., whether new properties can be added to it and whether its existing properties can be changed).
    Object.isSealed(): This method is used to determine if an object is sealed (i.e., whether new properties can be added to it and whether all its existing properties are non-configurable).
    Object.keys(): This method returns an array of a given object's own enumerable property names.
    Object.preventExtensions(): This method is used to prevent new properties from ever being added to an object.
    Object.seal(): This method is used to prevent new properties from being added to an object and to prevent existing properties from being removed.
    Object.values(): This method returns an array of a given object's own enumerable property values.

The Object class also has a number of properties that can be used to access information about an object, such as:

    Object.prototype: This property is the prototype for the Object class.
    Object.constructor: This property returns the function that created an object's prototype.

There are
