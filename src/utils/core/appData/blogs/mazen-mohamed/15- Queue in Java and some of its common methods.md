---
title: Queue in Java and some of its common methods
tags: data-structure programming queue java
image_alt: Queue
thumbnailUrl: https://cdn.programiz.com/sites/tutorial2program/files/queue-implementation.png
description: A Queue is a linear structure that follows a particular order in which the operations are performed. The order is First In First Out (FIFO). A good example of a queue is any queue of consumers for a resource where the consumer that came first is served first. Here we will implement the queue in Java with some of its common methods like (enqueue, dequeue, peak, and print).
---

## What is a Queue

A Queue is a linear structure that follows a particular order in which the operations are performed.

The order is First In First Out **(FIFO)**.

A good example of a queue is any queue of consumers for a resource where the consumer that came first is served first.

Here we will implement the queue in Java with some of its common methods like (enqueue, dequeue, peak, and print).

## Queue vs Stack

The difference between stacks and queues is in removing. In a stack, we remove the item the most recently added.

In a queue, we remove the item the least recently added.

## Stack implementation in Java

let's start with a class `MyQueue` and add the basic properties and methods that we will need.

```java
public class MyQueue {

 private int front;
 private int rear;
 private int maxSize;
 private int numberOfElements;
 private int list[];

 MyQueue(int maxSize) {
  this.front = 0;
  this.rear = -1;
  this.list = new int[maxSize];
  this.maxSize = maxSize;
  this.numberOfElements = 0;
 }

 public boolean isFull() {
  return this.maxSize == this.numberOfElements;
 }

 public boolean isEmpty() {
  return this.maxSize == 0;
 }
}
```

- `front`: An integer that holds the value of the first index of the queue.
- `rear`: An integer that holds the value of the last index of the queue.
- `maxSize`: A variable we will use to Know the maximum size **allowed** for the queue.
- `numberOfElements`: A variable that we will use to keep **track** of the number of elements in the queue.
- `list`: An array where we will **store** the values of the queue.
- `isFull`: A method that will return true if the queue is **empty**.
- `isEmpty`: A method that will return true if the queue is **full**.

When we call the `MyQueue` class:

- It will take an integer that will determine the `maxSize` of the queue.
- `front`: will be 0;
- `rear`: will be -1 _since there is no element yet_;
- we will initialize the size of the `list` array by the `maxSize`
- And lastly, the `numberOfElements` will be 0.

### Add an element to Stack in Java

```java
public int enqueue(int item) {
  // Check if the last item in the queue is at the end of the queue (at the last allowed index)
  if (this.rear == this.maxSize - 1) {
    // Change the `rear` to point at the first of the array
    this.rear = 0;
  } else {
    // Increase both `rear` and `numberOfElements` by one.
    this.rear++;
    this.numberOfElements++;
  }

  // Place the item to index that `rear` value is
  this.list[this.rear] = item;

  // Return the index of the item in the queue.
  return this.rear;
}
```

- First, We will check if the last item in the queue is at the end of the queue (at the last allowed index), we will change the `rear` to point at the first of the array, **else** we increase both `rear` and `numberOfElements` by one.
- Then that we will place the item to the index value of `rear`.
- Finally, we will return the index of the item in the queue.

### Remove an element to Stack in Java

In A Queue when removing an item we remove the first item to come in.

```java
public int dequeue() {
  // Check if the queue is empty
  if (isEmpty()) {
    // Exit or you can throw an exception.
    System.out.println("Underflow\nProgram Terminated");
    System.exit(-1);
  }

  // Store the item in the index `front` in `removedItem` to return it
  int removedItem = this.list[front];

  // Increase the value of `front` and decrease the value nof `numberOfElements`
  this.front++;
  this.numberOfElements--;

  // If the `front` is at the last index of the queue
  if (this.front == this.maxSize - 1) {
    // Assign it to 0 _(at the first of the queue)_
    this.front = 0;
  }

  // Return the `removedItem`
  return removedItem;
}
```

- First, We will check if the queue is empty, and if true we exit or you can throw an exception.
- Then that we will store the item in the index `front` in `removedItem` to return it.
- After that, we will increase the value of `front` and decrease the value of `numberOfElements`.
- We also will check if the `front` is at the last index of the queue and assign it to 0 _(at the first of the queue)_ if true.
- Finally, we will return the `removedItem`.

## Looking at the first element of the queue (Peak)

```java
public int peek() {
  // Check if the queue is empty
  if (isEmpty()) {
    // Exit or you can throw an exception.
    System.out.println("Underflow\nProgram Terminated");
    System.exit(-1);
  }

  // Return the first element in the queue
  return this.list[this.front];
}
```

- First, We will check if the queue is empty, and if true we exit or you can throw an exception.
- Then we will return the first element in the queue.

## Printing all the elements of the queue

I have added two variations and I advise you to test both of them and see the difference 😁.

### Printing all the elements of the queue V1

```java
public void printV1() {
  if (this.isEmpty()) {
    System.out.println("Queue is Empty");
    return;
  }

  int i;
  if (this.rear >= this.front) {
   for (i = this.front; i < this.rear; i++) {
    System.out.println(list[i]);
   }
  } else {
   for (i = this.front; i < this.maxSize; i++) {
    System.out.println(list[i]);
   }

   for (i = 0; i <= this.rear; i++) {
    System.out.println(list[i]);
   }
  }
}
```

### Printing all the elements of the queue V2

```java
public void printV2() {
  if (this.isEmpty()) {
    System.out.println("Queue is Empty");
    return;
  }

  int i;
  if (this.rear > this.front) {
    for (i = this.front; i <= this.rear; i++) {
      System.out.println(list[i]);
    }
  } else {
    int rearLimit = this.rear == this.front ? this.rear : -1;

  for (i = this.front; i < this.maxSize; i++) {
    System.out.println(list[i]);
  }

  if (this.rear != this.front)
    for (i = 0; i <= this.rear; i++) {
      System.out.println(list[i]);
    }
  }
}
```

## full code for queue implementation in Java

```java
public class MyQueue {

 private int front, rear, maxSize, numberOfElements;
 private int list[];

 MyQueue(int maxSize) {
  this.front = 0;
  this.rear = -1;
  this.list = new int[maxSize];
  this.maxSize = maxSize;
  this.numberOfElements = 0;
 }

 public boolean isFull() {
  return this.maxSize == this.numberOfElements;
 }

 public boolean isEmpty() {
  return this.maxSize == 0;
 }

 public int enqueue(int item) {
  if (this.rear == this.maxSize - 1) {
   this.rear = 0;
  } else {
   this.rear++;
   this.numberOfElements++;
  }

  this.list[this.rear] = item;

  return this.rear;
 }

 public int dequeue() {
  if (isEmpty()) {
   System.out.println("Underflow\nProgram Terminated");
   System.exit(-1);
  }

  int removedItem = this.list[front];

  this.front++;
  this.numberOfElements--;

  if (this.front == this.maxSize - 1) {
   this.front = 0;
  }

  return removedItem;
 }

 public int peek() {
  if (isEmpty()) {
   System.out.println("Underflow\nProgram Terminated");
   System.exit(-1);
  }

  return this.list[this.front];
 }

  public void printV1() {
    if (this.isEmpty()) {
      System.out.println("Queue is Empty");
      return;
    }

    int i;
    if (this.rear >= this.front) {
    for (i = this.front; i < this.rear; i++) {
      System.out.println(list[i]);
    }
    } else {
    for (i = this.front; i < this.maxSize; i++) {
      System.out.println(list[i]);
    }

    for (i = 0; i <= this.rear; i++) {
      System.out.println(list[i]);
    }
    }
  }

  public void printV2() {
    if (this.isEmpty()) {
      System.out.println("Queue is Empty");
      return;
    }

    int i;
    if (this.rear > this.front) {
      for (i = this.front; i <= this.rear; i++) {
        System.out.println(list[i]);
      }
    } else {
      int rearLimit = this.rear == this.front ? this.rear : -1;

    for (i = this.front; i < this.maxSize; i++) {
      System.out.println(list[i]);
    }

    if (this.rear != this.front)
      for (i = 0; i <= this.rear; i++) {
        System.out.println(list[i]);
      }
    }
  }
}
```
