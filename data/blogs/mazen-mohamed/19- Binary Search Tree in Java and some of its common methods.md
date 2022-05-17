---
title: Binary Search Tree (BTS) in Java and some of its common methods
tags: datastructure data structure programming binarysearchtree bts java
image_alt:
image_src:
description:
---

Binary Search Tree is a node-based binary tree data structure which has the following properties:

The left subtree of a node contains only nodes with keys lesser than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
The left and right subtree each must also be a binary search tree.

## Binary Search Tree (BTS) implementation in Java

Before starting with the linked list we will first need a class `Node` that has two attributes:

- `data`: will hold the value
- `right`: it will point to a `Node` _if exist_ that its `data` is greater than the `data` on the `Node` on the left.
- `right`: it will point to a `Node` _if exist_ that its `data` is less than the `data` on the `Node` on the right.

```java
public class Node {
 int data;
 Node right, left;

 public Node(int data) {
  this.data = data;
  right = left = null;
 }
}
```

then we will start with building the basic needs of the binary search tree.

```java
public class MyBinarySearchTree {
 Node root;

 public MyBinarySearchTree() {
  root = null;
 }

 boolean isLeaf(Node node) {
  return node.left == null && node.right == null;
 }

 boolean isParentWithOneChild(Node node) {
  return (node.left == null && node.right != null) || (node.left != null && node.right == null);
 }
}
```
