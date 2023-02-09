---
title: "JavaScript's Prototype Chain: A Guide"
description: A comprehensive guide to understanding and implementing prototype chains in JavaScript, including explanations of similarities and differences with other OOP languages.
tags: javascript prototype prototype-chain inheritance oop class syntax extends static getters setters
thumbnailUrl: https://velog.velcdn.com/images/dltkdals224/Post/f93bfb9d-4b72-4297-9058-1d549e4d483a/image.jpeg
---

> Note we won't be talking about the JavaScript ES6 class here, since it will have it's own separate blog Post directory, and I will Post the link for it on the comments when it's ready.

In JavaScript, `prototype` is a property of the constructor function that creates a new object, **it's defined as an object that serves as a blueprint for new objects created using that constructor**. When a new object is created using a constructor, it gets an internal property `[[Prototype]]` that points to the prototype of the constructor, this is not directly accessible, but you can use `Object.getPrototypeOf(myObject)` or `myObject.__proto__` to access it.

It's also possible to modify the prototype chain by changing the object's prototype. You can use `Object.setPrototypeOf(myObject, newProto)` or `myObject.__proto__ = newProto` to set the prototype of an object to a new object, this will change the object's prototype and the prototype chain. This is a technique that is often used to implement inheritance in JavaScript.

When a property or a method is accessed in the object, the JS engine will first check the object itself, if it doesn't find it, it will look in the object's prototype, if it doesn't find it in the prototype, it will look in the prototype's prototype, and so on.

This is how the prototype chain works, it's a linked list of objects that allow JS to look for properties and methods in a hierarchical way.

It's possible to create complex prototype chains with multiple levels, where an object prototype is an object created from another constructor that has a prototype of its own. This way you can create an inheritance hierarchy where properties and methods are inherited from different objects.

It's important to note that the prototype chain is different from the other OOP languages implementation of inheritance, and it can be confusing and cause subtle bugs if not handled carefully.

## Similarities between the prototype chain and the traditional OOP

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
const Parent = {
	commonMethod: function () {
		console.log('Hello');
	}
};

// Create the child1 object that inherits from the parent object
const Child1 = Object.create(Parent);

// Add newMethod specific to the child1 object
Child1.newMethod = function () {
	console.log('Child1 specific method');
};

// Create the child2 object that inherits from the parent object
const Child2 = Object.create(Parent);

// Add newMethod specific to the child2 object
Child2.newMethod = function () {
	console.log('Child2 specific method');
};

// Usage
const child1 = Object.create(Child1);
const child2 = Object.create(Child2);
child1.commonMethod(); // "Hello"
child1.newMethod(); // "Child1 specific method"
child2.commonMethod(); // "Hello"
child2.newMethod(); // "Child2 specific method"
```

As you can see in the example above:

### Both the prototype chain is different and traditional OOP provide a way for objects to inherit properties and methods from parent objects

This means that developers can create new objects that automatically have access to properties and methods defined on a parent object, without having to explicitly assign those properties and methods to the child object. This can save a significant amount of time and effort

### Both the prototype chain is different and traditional OOP allow objects to be organized into hierarchies, with parent objects at the top and child objects at the bottom

This allows for a more modular and manageable structure to the codebase, where common properties and methods can be defined in parent objects, and specialized properties and methods can be defined in child objects.

### Both the prototype chain is different and traditional OOP allow objects to share common properties and methods, reducing the amount of code that needs to be written

Since both allow objects to be reused and extended, making it easier to build large and complex applications. This means that developers can create new objects that inherit properties and methods from existing objects, rather than having to recreate those properties and methods each time they're needed. This can save a significant amount of time and effort.

## The differences between the prototype chain is different and traditional OOP, with code examples

The prototype chain in JavaScript is similar to the inheritance mechanism used in other object-oriented programming (OOP) languages in that it allows objects to inherit properties and methods from parent objects, but there are also some key differences. Here are some code examples that illustrate the differences between the prototype chain and OOP inheritance:

### Syntax differences between JavaScript's prototype and traditional OOP

For example:

JavaScript's prototype chain is based on objects, not classes.

The prototype chain is based on a prototype-based model of inheritance, where objects inherit properties and methods directly from other objects. In contrast, traditional OOP is based on a class-based model of inheritance, where classes define the properties and methods that objects will inherit.

```js
//JavaScript prototype chain
const parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};
const child = Object.create(parent);
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
const child = new Parent();
console.log(child.property1); //'value1'
child.method1(); //Hello
```

In JavaScript, the prototype chain is based on the object's `[[Prototype]]` internal property that references another object, in contrast, most OOP languages use classes and the extends keyword to define inheritance.

### Inheritance and Overriding between JavaScript's prototype and traditional OOP

JavaScript's prototype chain can be modified at runtime.

And In prototype-based OOP, there are no classes, just objects, and it is only possible to inherit properties and methods that are directly on the object's prototype, and not to classes, it can be difficult to reason about and reason about the inheritance hierarchy.

In contrast, with class-based OOP, the inheritance hierarchy is more structured and the ability to override methods allows for a more fine-grained control over the behavior of an object and its subclasses.

```js
const parent = {
	property1: 'value1',
	method1: function () {
		console.log('Hello');
	}
};
const child = Object.create(parent);
child.method1 = function () {
	console.log('Bye');
};
child.method1(); //Bye
```

In JavaScript, the prototype chain is a dynamic mechanism, you can change the prototype of an object at any time, this allows for more

### Encapsulation between JavaScript's prototype and traditional OOP

In prototype-based OOP, encapsulation is not enforced in the same way as in class-based OOP. Because properties and methods are directly on the object, they can be accessed and modified directly.

### Performance between JavaScript's prototype and traditional OOP

The prototype chain can be slower than traditional OOP because of its more dynamic nature. When looking up a property, the JavaScript interpreter has to traverse the entire prototype chain to find the property. With traditional OOP, the search for a property is more efficient because it is based on a fixed class hierarchy.
