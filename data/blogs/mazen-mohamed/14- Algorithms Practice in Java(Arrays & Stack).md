---
title: Algorithms to Practice arrays and stack in Java - 1
tags: java algorithms arrays stack dataStructure data_structure
image_alt: Java
image_src: https://www.datasciencecentral.com/wp-content/uploads/2021/10/8667507462.jpeg
description: 5 problems/Algorithms to Practice arrays and stack in Java - 1
---

## Problem 1

Given a linear array A, write a program that maps the location in the array (L) into a memory address, given the base address of A in memory and word count per element (W)

Input:

- **Base address:** 3450
- **Word count:** 8
- **Element number**: 9

Output: 3514

```java

public class Main {

 public static void main(String[] args) {
    int elemAbsLoc;
    int arrBase = 3450;
    int wordCount = 8;
    int elemRelLoc = 9;
    elemAbsLoc = arrBase + wordCount * (elemRelLoc - 1);
    System.out.println(elemAbsLoc);
 }
}

```

## Problem 2

Given a 2-D array, A. Write a Program that maps the location in the array given by (J, K) into a memory address, given the base address of A in memory and word count per element (W) and Number of rows (M) and a number of columns (N) in the case of:

1. Using column by column order.
2. Using row-by-row ordering.

Input:

- **Row or Column Ordering:** Row
- **Number of rows:** 12
- **Number of columns:** 10
- **Base address:** 3450
- **Word count:** 4
- **Element number/index:** 9
- **Row number:** 6

Output: 3682

### Using (column by column) or (row-by-row) ordering depending on the user input

```java
import java.util.Scanner;

public class Main {
   public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);

    char majorType;

    System.out.print("Row(r) or Column(c) Ordering:");
    majorType = scan.nextLine().charAt(0);

      int elemAbsLoc;
      int arrBase = 3450;
      int wordCount = 4;
      int arrRowsCount = 12;
      int arrColumnsCount = 10;
      int elemRelLocJ = 6;
      int elemRelLocK = 9;

      if (majorType == 'c') {
       elemAbsLoc = arrBase + wordCount * (arrRowsCount * (elemRelLocK - 1) + (elemRelLocJ - 1));
       System.out.println(elemAbsLoc);
      }
      else if (majorType == 'r') {
       elemAbsLoc = arrBase + wordCount * (arrColumnsCount * (elemRelLocJ - 1) + (elemRelLocK - 1));
       System.out.println(elemAbsLoc);
      }

      scan.close();
   }
}
```

## Problem 3

```java
public class Main {

 public static void main(String[] args) {
  int[][] matrix1 = { { 1, 0 }, { 2, 3 }, { 7, 6 } };
  int[][] matrix2 = { { 4, 6 }, { 5, 5 }, { 2, 4 } };

  int[][] matrixSum = new int[matrix1.length][matrix1[0].length];

  int i, j;
  for (i = 0; i < matrix1.length; i++) {
   for (j = 0; j < matrix1[0].length; j++) {
    matrixSum[i][j] = matrix1[i][j] + matrix2[i][j];
    System.out.print(matrixSum[i][j] + " ");
   }
   System.out.println("");
  }
 }
}
```

## Problem 4

Add method Clear() in the stack class which removes all values from the stack.

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
}
```

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

## Problem 5

Implement a function that takes input parameters (decimal number) and works on it using Stack to convert it into a binary number.

Note:

Using the `MyStack` class from the previous problem.

```java
public class Main {
 public static void main(String[] args) {
  MyStack stack = new MyStack(5);
  System.out.println("We will convert the number 23 to binary");
  int num = 23;

  while (num > 0) {
   int r = num % 2;

   stack.push(r);
   num /= 2;
  }

  System.out.print("The binary equivalent to 23: ");

  while (!(stack.isEmpty())) {
   System.out.print(stack.pop());
  }
 }
}
```
