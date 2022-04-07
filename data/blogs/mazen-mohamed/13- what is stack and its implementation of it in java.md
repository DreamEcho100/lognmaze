---
title: what is a stack and its implementation of it in java
tags: data-structure data structure programming stack java
image_alt: push and pop example in a stack
image_src: https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/06/pictorial-representation-of-stack.png
description: Stack is a linear data structure that follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out), we will implement it in java with various of its method like (push, pop, print all, clear all, indexOf).
---

A stack is a linear data structure that follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out), we will implement it in java with various of its method like (push, pop, print all, clear all, indexOf).

## Stack implementation in Java

let's start with a class `MyStack` and add the basic properties and methods that we will need.

```java
public class MyStack {
 int maxSize;
 int stackTop;
 int[] myArr;
 int numberOfElements;

 public MyStack(int maxSize) {
  this.maxSize = maxSize;
  this.myArr = new int[maxSize];
  this.stackTop = -1;
  this.numberOfElements = 0;
 }

 public boolean isFull() {
  return this.maxSize == this.numberOfElements;
 }

 public boolean isEmpty() {
  return this.numberOfElements == 0;
 }
}
```

- `maxSize`: A variable we will use to Know the maximum size **allowed** of the stack.
- `stackTop`: A variable that will **point** the last element of the stack.
- `myArr`: An array where we will **store** the values.
- `numberOfElements`: A variable that we will use to keep **track** of the number of elements.
- `isFull`: A method that will return true if the stack is **empty**.
- `isEmpty`: A method that will return true if the stack is **full**.

### Push an element to Stack in Java

Adds an item in the stack. If the stack is full, then it is said to be an Overflow condition.

```java
public int push(int element) {
  if (this.isFull()) {
    // throw new Exception("Stack Overflow!");
    System.err.println("Stack Overflow!");
    System.exit(-1);
  }

  this.myArr[this.numberOfElements] = element;
  this.stackTop++;
  this.numberOfElements++;

  return element;
}
```

- firstly, We will check if the stack is full, and if true we exit or you can throw an exception return from the method.
- Else we will add it to the end of `myArr` and increase both `stackTop` and `numberOfElements` values by 1.
- Finally return the element.

### Pop an element to Stack in Java

Removes an item from the stack. The items are popped in the reversed order in which they are pushed.

```java
public int pop() {
  if (this.isEmpty()) {
    // throw new Exception("Stack is empty!");
    System.err.println("Stack is empty!");
    System.exit(-1);
  }

  int element = this.myArr[this.stackTop];

  this.stackTop--;
  this.numberOfElements--;

  return element;
}
```

- firstly, We will check if the stack is empty, and if true we exit or you can throw an exception return from the method.
- Else we will store the last element in a variable `element`.
- Then decrease both `stackTop` and `numberOfElements` values by 1.
- Finally return the poped `element`.

### Print all elements on the Stack in Java

```java
public void printAll() {
  int i;
  for (i = this.stackTop; i >= 0; i--) {
    System.out.println(this.myArr[i]);
  }
}
```

We will loop throw all the elements in `myArr` in descendant from `stackTop` _(Which points at the last element of the array)_ to 0.

### Clear all elements on the Stack in Java

```java
public void clearAll() {
  this.stackTop = -1;
  this.numberOfElements = 0;

  int i;
  for (i = this.stackTop; i > 0; i--) {
   this.myArr[i] = 0;
  }
}
```

- Firstly, we will just change the values of `stackTop` to -1 and `numberOfElements` to 0.
- And then we will loop all over elements in `myArr` and assign them to 0.

### Retrieve an element by its index from Stack in Java

```java
public int indexOf(int index) {
  if (index > this.stackTop) {
    // throw new Exception("Inedx is out of the Stack size!");
    System.err.println("Inedx is out of the Stack size!");
    System.exit(-1);
  }

  return this.myArr[index];
}
```

- firstly, We will check if the index is bigger than the `stackTop` variable which holds the last element index, and if true we exit or you can throw an exception return from the method.
- Else we will return the element with the specified index.

## Coming Soon

- Peek or Top: Returns the top element of the stack.
- Duplicate: Copy the top item's value into a variable and push it back into the stack.
- Swap: Swap the two topmost items in the stack.
- Rotate: Move the topmost elements in the stack as specified by a number or move in a rotating fashion.

## Full implementation of the stack algorithm in Java

```java

public class MyStack {
 int maxSize;
 int stackTop;
 int[] myArr;
 int numberOfElements;

 public MyStack(int maxSize) {
  this.maxSize = maxSize;
  this.myArr = new int[maxSize];
  this.stackTop = -1;
  this.numberOfElements = 0;
 }

 public boolean isFull() {
  return this.maxSize == this.numberOfElements;
 }

 public boolean isEmpty() {
  return this.numberOfElements == 0;
 }

 public int push(int element) {
  if (this.isFull()) {
   // throw new Exception("Stack Overflow!");
   System.err.println("Stack Overflow!");
   System.exit(-1);
  }

  this.myArr[this.numberOfElements] = element;
  this.stackTop++;
  this.numberOfElements++;

  return element;
 }

 public int pop() {
  if (this.isEmpty()) {
   // throw new Exception("Stack is empty!");
   System.err.println("Stack is empty!");
   System.exit(-1);
  }

  int element = this.myArr[this.stackTop];

  this.stackTop--;
  this.numberOfElements--;

  return element;
 }

 public void printAll() {
  int i;
  for (i = this.stackTop; i >= 0; i--) {
   System.out.println(this.myArr[i]);
  }
 }

 public void clearAll() {
  this.stackTop = -1;
  this.numberOfElements = 0;

  int i;
  for (i = this.stackTop; i > 0; i--) {
   this.myArr[i] = 0;
  }
 }

 public int indexOf(int index) {
  if (index > this.stackTop) {
   // throw new Exception("Inedx is out of the Stack size!");
   System.err.println("Inedx is out of the Stack size!");
   System.exit(-1);
  }

  return this.myArr[index];
 }
}

```

example:

```java
public class Main {
 public static void main(String[] args) {
  MyStack stack = new MyStack(5);

  stack.push(1);
  stack.push(2);
  stack.pop();
  stack.push(3);
  stack.push(4);
  stack.pop();
  stack.push(4);
  stack.push(6);
  stack.pop();
  stack.push(4);
  stack.pop();
  stack.push(5);

  System.out.println("printAll 1 starts:");
  stack.printAll();
  System.out.println("printAll 1 ends.");

  stack.clearAll();

  System.out.println();

  System.out.println("printAll 2 starts:");
  stack.printAll();
  System.out.println("printAll 2 ends.");
 }
}
```

```none
printAll 1 starts:
5
4
3
1
printAll 1 ends.

printAll 2 starts:
printAll 2 ends.
```
