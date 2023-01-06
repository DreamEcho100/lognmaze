---
title: "Understanding Big O Notation: A Comprehensive Guide for Developers"
description: Big O notation is a fundamental concept in computer science and algorithms, used to measure the efficiency of code. In this blog post, we will cover the basics of Big O notation, including its importance, how to calculate it, and common examples in Typescript. By the end of this post, you will have a strong understanding of how to analyze the performance of your own code and make informed decisions about optimization.
tags: big-o-notation time-complexity space-complexity algorithms data-structure performance optimization computer-science typescript
thumbnailUrl: https://miro.medium.com/max/650/1*6mpaXFsrRPFXSKXK5Qgm8w.png
---

Welcome, In this post, we'll dive into the important concepts of _Big O notation_, how it's used in programming, and how to calculate its complexity. We'll also discuss why constants are dropped in Big O calculations and the importance of considering the worst case scenario. By the end of this post, you'll have a solid understanding of _Big O notation_ and how to use it in your own coding projects.

## What is Big O notation in programming?

Big O is a way to **measure** how **long** it takes for an algorithm or program to **run**. It helps us understand how **the time** it takes to run a program **increases** as **the input size grows**.

In computer science, **Big O notation** is a way to **describe** the complexity of an algorithm, or **the amount** of time and space an algorithm **requires** to run. It is often used to compare the efficiency of different algorithms and to analyze the performance of an algorithm in **the worst case scenario**.

**Big O notation** is a mathematical way of measuring the complexity of an algorithm. It provides a way to compare the efficiency of different algorithms by looking at how the running time or space required by an algorithm grows as the input size increases. **Big O notation** is commonly used in computer science to analyze and compare the performance of different algorithms. For example, if an algorithm has a running time of _O(n)_, it means that the running time grows linearly with the size of the input. On the other hand, if an algorithm has a running time of O(n^2), it means that the running time grows quadratically with the size of the input.

## Why do we use is Big O?

It gives us **a rough estimate** of the resources (such as time or memory) required to execute an algorithm. So it helps us determine **the time and space complexity** of an algorithm.

It helps us understand how well a program will scale as the input size grows. So it is a way to measure how efficient an algorithm is.

By analyzing the Big O complexity of an algorithm, we can:

- Determine the best approach to solving a problem.
- Make informed decisions about trade-offs between different algorithms.
- It allows us to compare the efficiency of different algorithms and choose the most suitable one for a given problem.
- It is a valuable tool for **optimizing the performance** of programs when working with large datasets or when performance is a critical factor.

we can use **Big O notation** to analyze the performance of functions and identify potential bottlenecks. For example, a function with a _time complexity_ of _O(n)_ will take longer to run as the input size increases, while a function with a _time complexity_ of _O(1)_ will take the same amount of time regardless of the input size. By understanding the Big O complexity of our algorithms, we can make informed decisions about which approaches are the most efficient and scalable for our specific use cases.

## Example of Big O notation (time complexity)

Here is an example of **Big O notation** in Typescript:

```ts
// O(1) - Constant time complexity
function getFirstElement(array: number[]) {
 return array[0];
}

// O(n) - Linear time complexity
function findElement(array: number[], element: number) {
 for (let i = 0; i < array.length; i++) {
  if (array[i] === element) {
   return true;
  }
 }
 return false;
}

// O(n^2) - Quadratic time complexity
function findDuplicates(array: number[]) {
 for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length; j++) {
   if (i !== j && array[i] === array[j]) {
    console.log(array[i]);
   }
  }
 }
}

// O(log n) - Logarithmic time complexity
function binarySearch(array: number[], element: number) {
 let left = 0;
 let right = array.length - 1;
 while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  if (array[mid] === element) {
   return mid;
  } else if (array[mid] < element) {
   left = mid + 1;
  } else {
   right = mid - 1;
  }
 }
 return -1;
}
```

In the above example:

- The `getFirstElement` function has a _time complexity_ of **O(1)**, because it only performs a single operation (accessing the first element of the array).
- The `findElement` function has a _time complexity_ of **O(n)**, because it performs a single operation (comparing each element to the given element) for each element in the array.
- The `findDuplicates` function has a _time complexity_ of **O(n^2)**, because it performs a nested loop, with the outer loop running n times and the inner loop running n times for each iteration of the outer loop.
- The `binarySearch` function has a _time complexity_ of **O(log n)**, because it reduces the search area by half with each iteration of the loop.

We will give more as we go but first let's have a refresher about ..., _log_?

## What is log

In mathematics and programming, log is a function that represents the power to which a base must be raised to produce a certain number. For example, the log base 2 of 8 is 3, because 2 to the power of 3 is 8. In programming, log is often used to calculate the complexity of algorithms, especially when it comes to searching and sorting algorithms.

In the context of calculating **Big O notation**, log is often used to represent the _time complexity_ of algorithms that involve searching or dividing a data set into smaller pieces. For example, the _time complexity_ of a binary search algorithm is typically represented as **O(log n)**, because the algorithm reduces the size of the data set by half on each iteration, resulting in a logarithmic growth rate.

In addition to being used to represent the _time complexity_ of algorithms, log is also used in other areas of computer science and mathematics, such as calculating the _space complexity_ of algorithms, representing the growth rate of certain functions, and solving equations. It is a fundamental concept in mathematics and has many practical applications in programming and other fields.

## Important concepts for Big O notation

Some important concepts of _Big O notation_ include:

- **Time complexity:** This refers to **the number of operations** an algorithm performs as a function of the size of its input data. For example, an algorithm that performs a linear search on an array of size n would be _O(n)_.

- **Space complexity:** This refers to **the amount** of memory an algorithm **consumes** as a function of the size of its input data. For example, an algorithm that uses a recursive function to compute the nth Fibonacci number would have _O(n)_ space complexity.

- **Asymptotic complexity:** This refers to **the behavior of an algorithm as the size of its input data becomes very large**. For example, an algorithm that has O(n^2) time complexity would have a slower running time than an algorithm with _O(n)_ time complexity when the size of the input data is large.

- **Best-case, worst-case, and average-case complexity:** These refer to **the performance of an algorithm under different circumstances**. For example, a sorting algorithm may have a best-case complexity of _O(n log n)_ if the input data is already sorted, a worst-case complexity of O(n^2) if the input data is reverse-sorted, and an average-case complexity of _O(n log n)_ if the input data is randomly sorted.

## The simplest solutions and tricks to find the complexity of Big O notation

To find the complexity of an algorithm using _Big O notation_, you can use the following simple tricks:

- **Count the number of basic operations** (e.g. assignments, comparisons, etc.) that are performed as the size of the input data increases.

- Identify the portion of the code **that takes the most time to execute**, and consider **only** that part when determining the complexity (So basically between loops and assignments or comparisons you will compare depending on loops).

- **Ignore constants and lower order terms**, as they are not significant when the size of the input data gets very large.

## More examples of Big O notation (time complexity)

```ts
function findLargestNumber(arr: number[]) {
 let largest = 0;
 for (let i = 0; i < arr.length; i++) {
  if (arr[i] > largest) {
   largest = arr[i];
  }
 }
 return largest;
}
```

In this example, the time complexity of the algorithm is _O(n)_, where n is the size of the input array.

This is because the number of basic operations performed (i.e. the comparison in the if statement) is directly proportional to the size of the input array.

```ts
function example(n) {
 // The first for loop has a complexity of O(n)
 for (let i = 0; i < n; i++) {
  console.log(i);
 }

 // The second for loop has a complexity of O(n)
 for (let j = 0; j < n; j++) {
  console.log(j);
 }
}
```

In this example, the complexity of the two for loops is _O(n)_ because the number of iterations is directly proportional to the value of n. This means that if n increases by 1, the number of iterations in both for loops will also increase by 1.

The overall complexity of this function is _O(2n)_, which can be simplified to _O(n)_. This means that the time complexity of this function is directly proportional to the value of n, and as n increases, the time it takes to execute the function will also increase linearly.

```ts
function bubbleSort(arr: number[]) {
 for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) {
   if (arr[j] > arr[j + 1]) {
    let temp = arr[j];
    arr[j] = arr[j + 1];
    arr[j + 1] = temp;
   }
  }
 }
}
```

In this example, we implemented **a bubble sort** is which an example of an _O(n^2)_ sorting algorithm. This is because it has two nested loops, both of which iterate over all n elements of the input array. The complexity is therefore _O(n^2)_.

```ts
function quickSort(arr: number[]) {
 if (arr.length <= 1) {
  return arr;
 }

 const pivot = arr[0];
 const left = [];
 const right = [];

 for (let i = 1; i < arr.length; i++) {
  if (arr[i] < pivot) {
   left.push(arr[i]);
  } else {
   right.push(arr[i]);
  }
 }

 return [...quickSort(left), pivot, ...quickSort(right)];
}
```

n this example, we implemented **a quick sort**, which is an example of an _O(n log n)_ sorting algorithm. It has a recursive function that divides the input array in half at each step, so the complexity is _O(log n)_. However, this function is called n times (once for each element in the array), so the overall complexity is _O(n log n)_.

**Quicksort** is a **divide-and-conquer** sorting algorithm that has an average case time complexity of O(n log n). It works by selecting a pivot element from the array and partitioning the other elements into two sub arrays, according to whether they are less than or greater than the pivot. The sub arrays are then sorted recursively, and the result is combined into a sorted array.

## Why practically constants are pretty important, but theoretically we drop or ignore them when calculating the Big O notation

In _Big O notation_, the goal is to determine the overall growth rate of an algorithm as the input size increases.

Constants are not generally considered when analyzing the growth rate because they don't affect the overall trend. For example, if an algorithm has a time complexity of _O(n + 2)_ and another algorithm has a time complexity of _O(n + 200)_, both algorithms have a linear time complexity of _O(n)_. The constants 2 and 200 do not affect the trend of the growth rate, which is why they are dropped in _Big O notation_.

In practice, however, constants can be important because they can have a significant impact on the performance of an algorithm. For example, if an algorithm has a time complexity of _O(n + 2)_ and another algorithm has a time complexity of _O(n + 200)_, the algorithm with the time complexity of _O(n + 2)_ may be much faster in practice because it has a lower constant factor. Therefore, it is important to consider constants in practice, but they are generally ignored when analyzing the overall growth rate of an algorithm in _Big O notation_.

consider the following two implementations of quicksort in Typescript:

```ts
// Implementation 1
function quicksort(arr: number[]) {
 if (arr.length <= 1) return arr;
 const pivot = arr[0];
 const left = [];
 const right = [];
 for (let i = 1; i < arr.length; i++) {
  if (arr[i] < pivot) left.push(arr[i]);
  else right.push(arr[i]);
 }
 return quicksort(left).concat(pivot, quicksort(right));
}
```

```ts
// Implementation 2
function quicksort(arr: number[]) {
 if (arr.length <= 1) return arr;
 const pivotIndex = Math.floor(arr.length / 2);
 const pivot = arr[pivotIndex];
 const left = [];
 const right = [];
 for (let i = 0; i < arr.length; i++) {
  if (i === pivotIndex) continue;
  if (arr[i] < pivot) left.push(arr[i]);
  else right.push(arr[i]);
 }
 return quicksort(left).concat(pivot, quicksort(right));
}
```

Both implementations have the same time complexity of _O(n log n)_, but the second implementation may be faster in practice because it avoids the constant overhead of performing an extra comparison in the loop condition. This is just one example of how constants can affect the performance of an algorithm, even if they are ignored in the theoretical analysis.

> This time complexity is considered to be very efficient, as it is much faster than other sorting algorithms such as **bubble sort** or **insertion sort**, which have time complexities of _O(n^2)_. In fact, **Quicksort** is often used as **the default** sorting algorithm in many programming languages and libraries because of its efficiency and ease of implementation.

One reason why constants are ignored in the calculation of _Big O notation_ is that they have little impact on the overall complexity of the algorithm. For example, in the Quicksort algorithm, the constant time it takes to divide the input into left and right arrays and to combine them back together at the end is insignificant compared to the time it takes to sort the input. Therefore, these constants are usually dropped or ignored when analyzing the complexity of the algorithm.

Another reason why constants are ignored in the calculation of _Big O notation_ is that they can vary significantly depending on the specific implementation of the algorithm. For example, the constants in the Quicksort algorithm may be different if the pivot element is chosen differently (e.g. by selecting the first element in the array instead of the last element) or if the arrays are implemented differently (e.g. using a linked list instead of an array). These variations in constants can make it difficult to accurately compare the complexities of different algorithms, so they are typically dropped or ignored in the calculation of _Big O notation_.

Let's say we have the following function in Typescript:

```ts
function constantExample(n) {
 let sum = 0;
 for (let i = 0; i < n; i++) {
  sum += i;
 }
 return sum;
}
```

This function has a time complexity of _O(n)_, because the number of operations (in this case, adding each element of the array to the sum) grows linearly with the size of the input (n). Now, let's say we add a constant operation to the function:

```ts
function constantExample(n) {
 let sum = 0;
 for (let i = 0; i < n; i++) {
  sum += i;
 }
 for (let i = 0; i < 100; i++) {
  sum \*= 2;
 }
 return sum;
}
```

This function still has a time complexity of _O(n)_, even though we added a constant operation (the second for loop). This is because the constant operation (performing 100 multiplications) is not relevant to the overall growth of the algorithm. It will always take the same amount of time, regardless of the size of the input. Therefore, we drop the constant when calculating the complexity of the algorithm.

## What do we mean when we say that we consider the worst case when calculating the complexity of the Big O notation and give a code example

In the context of _Big O notation_, "worst case" refers to the scenario in which an algorithm performs the most number of operations, or takes the longest amount of time, to complete. This is typically used as a measure of an algorithm's performance because it represents the upper bound of the time or space required by the algorithm.

For example, consider a simple sorting algorithm that iterates through an array of numbers and swaps any adjacent elements that are out of order. In the worst case scenario, the array may be already sorted in the reverse order, meaning that the algorithm would need to perform n-1 swaps to sort the array, where n is the length of the array. The complexity of this algorithm in the worst case would be _O(n)_, since the number of operations grows linearly with the size of the input.

Here is an example of this sorting algorithm in Typescript:

```ts
function sort(arr) {
 for (let i = 0; i < arr.length - 1; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) {
   if (arr[j] > arr[j + 1]) {
    // Swap elements
    let temp = arr[j];
    arr[j] = arr[j + 1];
    arr[j + 1] = temp;
   }
  }
 }
}
```

In this example, the outer loop iterates n times, and the inner loop iterates n-i times on each iteration, for a total of n \* (n-1) / 2 operations in the worst case. This results in a complexity of _O(n^2)_ in the worst case.

## What do we mean when we say growth with respect to input when calculating the complexity of the Big O notation and give a code example

In the context of _Big O notation_, "growth with respect to input" refers to how the complexity of an algorithm or function scales as the input size increases. For example, consider the following function in Typescript that calculates the sum of all elements in an array:

```ts
function sum(arr) {
 let total = 0;
 for (let i = 0; i < arr.length; i++) {
  total += arr[i];
 }
 return total;
}
```

The complexity of this function is _O(n)_, where n is the size of the input array. This means that as the size of the input array increases, the amount of time and resources required to execute the function also increases linearly. This is because the function needs to loop through the entire array once in order to calculate the sum, and the larger the array, the more times the loop will iterate.

By contrast, consider the following function that calculates the sum of all elements in an array and also squares each element before adding it to the total:

```ts
function sumAndSquare(arr) {
 let total = 0;
 for (let i = 0; i < arr.length; i++) {
  total += arr[i] \*\* 2;
 }
 return total;
}
```

The complexity of this function is still _O(n)_, because the loop still needs to iterate through the entire array once in order to calculate the sum. However, the additional operation of squaring each element adds a constant amount of time to each iteration of the loop, which is insignificant compared to the overall complexity of the function as the size of the input array increases. Therefore, constants are typically dropped when calculating the complexity of an algorithm using _Big O notation_.
