---
title: Binary Search Tree (BTS) in Java and some of its common methods
Tags: data-structure programming binary-search-tree bts java
image_alt: Binary Search Tree
thumbnailUrl: https://static.packt-cdn.com/products/9781789801736/graphics/C09581_08_02.jpg
description: Values of keys in the left sub-tree of the root should be smaller than or equal to the values of the key at the root and the keys in the right sub-tree of the root should be larger than or equal to the values of the key at the root. The left and right subtree each must also be a binary search tree.
---

A binary Search Tree is a node-based binary tree data structure that has the following properties:

Values of keys in the left sub-tree of the root should be smaller than or equal to the values of the key at the root and the keys in the right sub-tree of the root should be larger than or equal to the values of the key at the root.

The left and right subtree each must also be a binary search tree.

## Binary Search Tree (BTS) implementation in Java

Before starting with the linked list we will first need a class `Node` that has two attributes:

- `data`: will hold the value
- `right`: it will point to a `Node` _if exist_ that its `data` is greater than the `data` on the `Node` on the left.
- `right`: it will point to a `Node` _if exist_ that its `data` is less than the `data` on the `Node` on the right.

Such a tree can be represented by a linked list data structure in which **each node** is an object.

In addition to a key ﬁeld or data, **each node** contains ﬁelds (left pointer), and (right pointer), (parent pointer) that point to the nodes corresponding to its left child, its right child, and its parent, respectively.

If a child or a parent is missing, the appropriate ﬁeld contains the value `null`. The root node is the only node in the tree whose parent ﬁeld is `null`.

```java
public class Node {
 int data;
 Node right, left;

 public Node(int data) {
  this.data = data;
  right = left = null;
 }

 Node findNode(int value) {
  // `tempNode` points at the first `Node` in the tree
  Node tempNode = root;

  // Continue to loop while `tempNode` exist and `tempNode.data` doesn't equal `value`
  while (tempNode != null && tempNode.data != value) {
  // Choosing the path to go to
   if (value < tempNode.data)
    tempNode = tempNode.left;
   else
    tempNode = tempNode.right;
  }

  // The returned value could be null if not found!
  return tempNode;
 }

 boolean find(int value) {
  // Check if the node with the desired `value` exists on the tree
  return findNode(value) != null;
 }

 Node findParent(int value) {
   // Similar to `findNode` method but we will keep
   // track of the parent node and return it
  Node current = root;
  Node parent = null;

  while (current != null && current.data != value) {
   parent = current;

   if (value < current.data)
    current = current.left;
   else
    current = current.right;
  }

  // The returned value could be null if no root is found
  // The parent could not have the value on their children
  // but it is the best position to insert a `Node` with the `value` as its `data`
  return parent;
 }

 // To get the most right `Node` (that holds the biggest value) on the tree
 // by keeping looping until `Node.right` not equal `null`
 Node getRightMostNode(Node node) {
  Node rightMostNode = node;
  while (rightMostNode.right != null)
   rightMostNode = rightMostNode.right;

  return rightMostNode;
 }

 // To get the most left `Node` (that holds the smallest value) on the tree
 // by keeping looping until `Node.left` not equal `null`
 Node getLeftMostNode(Node node) {
  Node leftMostNode = node;
  while (leftMostNode.left != null)
   leftMostNode = leftMostNode.left;

  return leftMostNode;
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

- `root`: An attribute with `Node` that will point at the **first** `Node` in the tree.
- `MyBinarySearchTree()`: A constructor that will assign `root` to null.
- `isLeaf`: A method that takes `node` with the type of `Node` as an argument and will return a boolean, it will return true if `node.left` equals null and `node.right` equals null.
- `isParentWithOneChild`: A method that takes `node` with the type of `Node` as an argument and will return a boolean, it will return true if it has **only one** child.
- `findNode`: A method that returns a `Node` and takes a `value` as an argument with type `int`:
  - `tempNode` points at the first `Node` in the tree
  - Continue to loop while `tempNode` exist and `tempNode.data` doesn't equal `value`
  - Choosing the path to go to
  - The returned value could be null if not found!
- `find`: A method that returns a `boolean` and takes a `value` as an argument with type `int`:
  - Check if the node with the desired `value` exists on the tree.
- `findParent`: A method that returns a `Node` and takes a `value` as an argument with type `int`:
  - Similar to `findNode` method but we will keep track of the parent node and return it.
  - The returned value could be null if no root is found.
  - The parent could not have the value on its children but is in the best position to insert a `Node` with the `value` as its `data`.
- `getRightMostNode`: A method that accepts a `Node` _(that holds the biggest value)_ and by keeping looping until `Node.right` does not equal `null` To get the most right `Node` on the tree
- `getLefttMostNode`: A method that accepts a `Node` _(that holds the smallest value)_ and by keeping looping until `Node.left` is not equal `null` To get the most left `Node` on the tree

### Insert a node on the binary search tree implementation in Java

```java
void insert(int value) {
  // Check if the `value` already exists in the `Node`s of the tree
  Node current = findNode(value);
  // Return if exist
  if (current != null)
    return;

  // Building a `Node` with `value` as it's `data`
  Node inserted = new Node(value);
  // Find the suitable parent for it
  Node parent = findParent(value);

  // If No parent found then insert it as the root of the binary tree
  // and return from the method
  if (parent == null) {
    root = inserted;
    return;
  }

  // Insert it at the correct branch
  if (value < parent.data)
    parent.left = inserted;
  else if (value > parent.data)
    parent.right = inserted;
}
```

- Check if the `value` already exists in the `Node`s of the tree.
- Return if exist.
- Building a `Node` with `value` as its `data`.
- Find a suitable parent for it.
- If No parent is found then insert it as the root of the binary tree and return from the method.
- Insert it at the correct branch.

```bash
#
# 34, 86, 12, 98, 27, 9, 120, 3
# ^^
# Tree:
#    ----
#   | 34 |
#    ----
#
# -------------------------------------------------------------------
# 34, 86, 12, 98, 27, 9, 120, 3
#     ^^
#
# Tree:
#    ----------
#   |    34    |
#   |     \\   |
#   |      86  |
#    ----------
#
#
# -------------------------------------------------------------------
# 34, 86, 12, 98, 27, 9, 120, 3
#         ^^
#
# Tree:
#    ---------
#   |    34   |
#   |  //  \  |
#   | 12   86 |
#    ---------
#
# -------------------------------------------------------------------
# 34, 86, 12, 98, 27, 9, 120, 3
#             ^^
#
# Tree:
#    ---------          ------------          --------------
#   |    34   |        |     34     |        |      34      |
#   |  /  \\  |        |    / \\    |        |     / \\     |
#   | 12   86 |   ->   |   12  86   |   ->   |   12   86    |
#    ---------          ------------         |         \\   |
#                                            |          98  |
#                                             --------------
#
# -------------------------------------------------------------------
# 34, 86, 12, 98, 27, 9, 120, 3
#                 ^^
#
# Tree:
#    -------------          -------------          --------------
#   |     34      |        |     34      |        |     34       |
#   |    /  \     |        |    //  \    |        |    //  \     |
#   |   12  86    |   ->   |   12   86   |   ->   |   12   86    |
#   |         \   |        |         \   |        |    \\    \   |
#   |         98  |        |         98  |        |     27   98  |
#    -------------          -------------          --------------
#
# -------------------------------------------------------------------
# 34, 86, 12, 98, 27, 9, 120, 3
#                     ^
#
# Tree:
#    -------------          -------------          ---------------
#   |     34      |        |     34      |        |       34      |
#   |    /  \     |        |   //  \     |        |     //  \     |
#   |   12   86   |   ->   |  12   86    |   ->   |    12   86    |
#   |    \     \  |        |    \    \   |        |   // \    \   |
#   |     27   98 |        |    27   98  |        |  9   27   98  |
#    -------------          -------------          ---------------
#
# -------------------------------------------------------------------
# 34, 86, 12, 98, 27, 9, 120, 3
#                        ^^^
#
# Tree:
#    ---------------         ---------------          --------------          -------------------
#   |      34      |        |      34       |        |      34      |        |         34        |
#   |     /  \     |        |     / \\      |        |     / \\     |        |        / \\       |
#   |    12  86    |        |    12   86    |        |    12   86   |        |      12   86      |
#   |   / \    \   |   ->   |   / \     \   |   ->   |   / \    \\  |   ->   |     / \    \\     |
#   |  9   27  98  |        |  9   27   98  |        |  9   27   98 |        |    9   27   98    |
#    -------------           ---------------          --------------         |              \\   |
#                                                                            |               120 |
#                                                                             -------------------
#
# -------------------------------------------------------------------
# 34, 86, 12, 98, 27, 9, 120, 3
#                             ^
#
# Tree:
#    -------------------          --------------------         -------------------         ----------------------
#   |        34         |        |         34        |       |         34         |       |          34          |
#   |       /  \        |        |       //  \       |       |       //  \        |       |        //  \         |
#   |      12   86      |        |      12   86      |       |      12    86      |       |       12   86        |
#   |     / \     \     |   ->   |     / \     \     |  ->   |     // \     \     |  ->   |      // \    \       |
#   |    9   27   98    |        |    9   27   98    |       |    9   27    98    |       |     9   27   98      |
#   |              \    |        |              \    |       |                \   |       |    //          \     |
#   |              120  |        |              120  |       |                120 |       |   3            120   |
#    -------------------          -------------------         --------------------         ----------------------
#
# -------------------------------------------------------------------
#
# Tree:
#    ----------------------
#   |          34          |
#   |         /  \         |
#   |        12  86        |
#   |       /  \   \       |
#   |      9   27  98      |
#   |     /          \     |
#   |    3           120   |
#    ----------------------
```

### Remove a node on the binary search tree implementation in Java

#### (Case 1) Remove a node on the binary search tree implementation in Java

node `n` has no children (a terminal node): In this case, `n` is deleted and replaced with its location in the parent node to the NULL pointer.

#### (Case 2) Remove a node on the binary search tree implementation in Java

N has exactly one child: `n` is deleted from the tree T by replacing the pointer to `n` in Parent[N] with the pointer to the child of `n`.

#### (Case 3) Remove a node on the binary search tree implementation in Java

N has two children :
let `S(N)` denotes the in-order successor of `n`. Deleting `n` is performed by - First deleting `S(N)` and replacing `n` with `S(N)` as in figure (a). - Change the pointer of the parent of `S(N)` to the right child of `S(N)`. See Figure 7-10(b). - Add `S(N)` to the free-storage list denoted by the AVAIL pointer, see

```java
int remove(int value) {
  // We will save the value of the deleted `Node`
  int deletedValue;
  // Using the `findNode` method to find the deleted `Node`
  Node deletedNode = findNode(value);
  // Using the `findParent` method to find the parent of the deleted `Node`
  Node parent = findParent(value);

  if (deletedNode == null) {
    // If there is no `Node` that have the desired value we exit
    System.err.println("Node not found!");
    System.exit(1);
  }

  // Else We will check if the `Node` is a **leaf**
  if (isLeaf(deletedNode)) {
  // If true we will check where it is it and assignning it to `null` to delete it
  if (deletedNode == root)
    root = null;
  else {
  if (parent.left == deletedNode)
    parent.left = null;
  else
    parent.right = null;
  }

  deletedValue = deletedNode.data;
  } else if (isParentWithOneChild(deletedNode)) {
    // Else if it is not a `leaf`, we will check if the parent
    // has one child _either on the left or the right_
    // Then swaping its position with it child _`Node` not equal `null`_
    // After that we assignning it to `null` to delete it
    if (parent.right == deletedNode) {
    if (deletedNode.right != null)
      parent.right = deletedNode.right;
    else
      parent.left = deletedNode.left;
    } else {
    if (deletedNode.right != null)
      parent.right = deletedNode.right;
    else
      parent.left = deletedNode.left;
    }

    deletedValue = deletedNode.data;
  } else {
    // If it is not a leaf or the parent does not have one child
    // Then we will get the `Node` with the largest value on the tree
    // (In the right most of the tree) to delete it
    Node highestLeftNode = getRightMostNode(deletedNode.left);
    deletedValue = remove(highestLeftNode.data);
    deletedNode.data = deletedValue;
  }

  return value;
}
```

- We will save the value of the deleted `Node`.
- Using the `findNode` method to find the deleted `Node`.
- Using the `findParent` method to find the parent of the deleted `Node`.
  - If there is no `Node` that have the desired value we exit.
- Else We will check if the `Node` is a **leaf**.
- If true we will check where it is it and assignning it to `null` to delete it.
- Else if it is not a `leaf`, we will check if the parent has one child _either on the left or the right_.
  - Then swaping its position with it child _`Node` not equal `null`_.
  - After that we assignning it to `null` to delete it.
- If it is not a leaf or the parent does not have one child.
  - Then we will get the `Node` with the largest value on the tree (In the right most of the tree) to delete it.

```bash

# 9, 27, 120
# ^
#9
# Tree:
#    ----------------------          ----------------------          ----------------------
#   |         34           |        |         34           |        |         34           |
#   |        //  \         |        |        //  \         |        |        //  \         |
#   |       12   86        |        |       12   86        |        |       12   86        |
#   |      /  \    \       |   ->   |      // \    \       |   ->   |      /  \    \       |
#   |     9   27   98      |        |     9   27   98      |        |     3   27   98      |
#   |    /           \     |        |    /           \     |        |                \     |
#   |   3            120   |        |   3            120   |        |                120   |
#    ----------------------          ----------------------          ----------------------
#
# -------------------------------------------------------------------
#
# 9, 27, 120
#    ^^
#
#    ---------------------          ---------------------          ---------------------          ---------------------
#   |         34          |        |         34          |        |         34          |        |         34          |
#   |        /   \        |        |        //  \        |        |        //  \        |        |        /   \        |
#   |       12   86       |        |       12   86       |        |       12   86       |        |       12   86       |
#   |      /  \    \      |   ->   |      /  \    \      |   ->   |      / \\    \      |   ->   |      /       \      |
#   |     3   27   98     |        |     3   27   98     |        |     3   27   98     |        |     3        98     |
#   |                \    |        |                \    |        |                \    |        |                \    |
#   |                120  |        |                120  |        |                120  |        |                120  |
#    ---------------------          ---------------------          ---------------------          ---------------------
#
# -------------------------------------------------------------------
#
# 9, 27, 120
#        ^^^
#
#    ---------------------          ---------------------          ---------------------          ---------------------          ---------------------          ---------------------
#   |         34          |        |         34          |        |         34          |        |         34          |        |         34          |        |         34          |
#   |        /   \        |        |        /   \        |        |        /  \\        |        |        /  \\        |        |        /  \\        |        |        /  \\        |
#   |       12   86       |        |       12   86       |        |       12   86       |        |       12   86       |        |       12   86       |        |       12   86       |
#   |      /       \      |   ->   |      /       \      |   ->   |      /       \      |   ->   |      /      \\      |   ->   |      /      \\      |   ->   |      /      \\      |
#   |     3        98     |        |     3        98     |        |     3        98     |        |     3        98     |        |     3        98     |        |     3        98     |
#   |                \    |        |                \    |        |                \    |        |                \    |        |               \\    |         ---------------------
#   |                120  |        |                120  |        |                120  |        |                120  |        |                120  |
#    ---------------------          ---------------------          ---------------------          ---------------------          ---------------------
```

### print inOrder, preOrder, and postOrder on the binary search tree implementation in Java

Unlike linear data structures (Array, Linked List, Queues, Stacks, etc), which have only one logical way to traverse them, trees can be traversed in different ways.

We will discuss the most generally used ways for traversing trees.

```java
void print(int order) {
  switch (order) {
    case 1:
      System.out.println("nInorder traversal of binary tree is:");
      printInOrder(root);
      break;
    case 2:
      System.out.println("Preorder traversal of binary tree is:");
      printPreOrder(root);
      break;
    case 3:
      System.out.println("nPostorder traversal of binary tree is:");
      printPostOrder(root);
      break;
    default:
      break;
  }
}

// Given a binary tree, print its nodes in inorder
void printInOrder(Node currentNode) {
  if (currentNode == null)
    return;

  // First recur on left child
  printInOrder(currentNode.left);
  // Then print the data of node
  System.out.println(currentNode.data);
  // Now recur on right child
  printInOrder(currentNode.right);
}

// Given a binary tree, print its nodes in preorder
void printPreOrder(Node currentNode) {
  if (currentNode == null)
    return;

  // First print data of node
  System.out.println(currentNode.data);
  // Then recur on left subtree
  printPreOrder(currentNode.left);
  // Now recur on right subtree
  printPreOrder(currentNode.right);
}

// Given a binary tree, print its nodes according to the "bottom-up" postorder traversal.
void printPostOrder(Node currentNode) {
  if (currentNode == null)
    return;

  // First recur on left subtree
  printPostOrder(currentNode.left);
  // Then recur on right subtree
  printPostOrder(currentNode.right);
  // Now deal with the node
  System.out.println(currentNode.data);
}
```

Depth First Traversals:

we will use the following example:
If we insert `34, 86, 12, 98, 27, 9, 120, 3` to the tree.

```bash
# Tree:
#    ----------------------
#   |          34          |
#   |         /  \         |
#   |        12  86        |
#   |       /  \   \       |
#   |      9   27  98      |
#   |     /          \     |
#   |    3           120   |
#    ----------------------
```

- Preorder (Root, Left, Right): `34, 12, 9, 3, 27 86,98, 120`.
- Inorder (Left, Root, Right): `3, 9, 12, 27, 34, 86, 98, 120`.
- Postorder (Left, Right, Root): `3, 9, 27, 12, 120, 98, 86, 34`.

#### Inorder(tree) Traversal Algorithm

1. Traverse the left subtree, ex. call `Inorder(left-subtree)`.
2. Visit the root.
3. Traverse the right subtree, ex. call `Inorder(right-subtree)`.

##### Uses of Inorder

In the case of binary search trees (BST), Inorder traversal gives nodes in non-decreasing order.

It provides a simple way to print out all the keys in a Binary Search Tree in an **ascending order**

To get nodes of BST in non-increasing order, a variation of Inorder traversal where Inorder traversal s reversed can be used.

Example: In order traversal for the given example is `3, 9, 12, 27, 34, 86, 98, 120`.

#### Preorder(tree) Traversal Algorithm

1. Visit the root.
2. Traverse the left subtree, ex. call `Preorder(left-subtree)`.
3. Traverse the right subtree, ex. call `Preorder(right-subtree)`.

##### Uses of Preorder

Preorder traversal is used to create a copy of the tree.

Preorder traversal is also used to get prefix expression on an expression tree.

Example: Preorder traversal for the given example is `34, 12, 9, 3, 27 86, 98, 120`.

#### Postorder(tree) Traversal Algorithm

1. Traverse the left subtree, ex. call `Postorder(left-subtree)`.
2. Traverse the right subtree, ex. call `Postorder(right-subtree)`.
3. Visit the root.

##### Uses of Postorder

Postorder traversal is used to delete the tree.

Example: Postorder traversal for the given example is `3, 9, 27, 12, 120, 98, 86, 34`.

```java
public class Main {

 public static void main(String[] args) {
  MyBinarySearchTree myBSTTree = new MyBinarySearchTree();

  // 34, 86, 12, 98, 27, 9, 120, 3
  myBSTTree.insert(34);
  myBSTTree.insert(86);
  myBSTTree.insert(12);
  myBSTTree.insert(98);
  myBSTTree.insert(27);
  myBSTTree.insert(9);
  myBSTTree.insert(120);
  myBSTTree.insert(3);

  myBSTTree.print(1);
  myBSTTree.print(2);
  myBSTTree.print(3);
 }

}
```

```bash
# Tree:
#    ----------------------
#   |          34          |
#   |         /  \         |
#   |        12  86        |
#   |       /  \   \       |
#   |      9   27  98      |
#   |     /          \     |
#   |    3           120   |
#    ----------------------
```

```bash
# Preorder traversal of binary tree is:
# 34
# 12
# 9
# 3
# 27
# 86
# 98
# 120
# Inorder traversal of binary tree is:
# 3
# 9
# 12
# 27
# 34
# 86
# 98
# 120
# Postorder traversal of binary tree is:
# 3
# 9
# 27
# 12
# 120
# 98
# 86
# 34
```

```java
public class Main {
 public static void main(String[] args) {
  MyBinarySearchTree myBSTTree = new MyBinarySearchTree();

  // 34, 86, 12, 98, 27, 9, 120, 3
  myBSTTree.insert(34);
  myBSTTree.insert(86);
  myBSTTree.insert(12);
  myBSTTree.insert(98);
  myBSTTree.insert(27);
  myBSTTree.insert(9);
  myBSTTree.insert(120);
  myBSTTree.insert(3);

  // 9, 27, 120
  myBSTTree.remove(9);
  myBSTTree.remove(27);
  myBSTTree.remove(120);

  myBSTTree.print(1);
  myBSTTree.print(2);
  myBSTTree.print(3);
 }
}
```

```bash
# Tree:
#    ---------------------
#   |         34          |
#   |        /  \         |
#   |       12   86       |
#   |      /      \       |
#   |     3        98     |
#    ---------------------
```

```bash
# Preorder traversal of binary tree is:
# 34
# 12
# 3
# 86
# 98
# Inorder traversal of binary tree is:
# 3
# 12
# 34
# 86
# 98
# Postorder traversal of binary tree is:
# 3
# 12
# 98
# 86
# 34
```

## Complexity of BST

O(log2 `n`), Where `n` is the total number of nodes in BST

## Final Code

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

 Node findNode(int value) {
  Node tempNode = root;

  while (tempNode != null && tempNode.data != value) {
   if (value < tempNode.data)
    tempNode = tempNode.left;
   else
    tempNode = tempNode.right;
  }

  return tempNode;
 }

 boolean find(int value) {
  return findNode(value) != null;
 }

 Node findParent(int value) {
  Node current = root;
  Node parent = null;

  while (current != null && current.data != value) {
   parent = current;

   if (value < current.data)
    current = current.left;
   else
    current = current.right;
  }

  return parent;
 }

 Node getRightMostNode(Node node) {
  Node rightMostNode = node;
  while (rightMostNode.right != null)
   rightMostNode = rightMostNode.right;

  return rightMostNode;
 }

 Node getLeftMostNode(Node node) {
  Node leftMostNode = node;
  while (leftMostNode.left != null)
   leftMostNode = leftMostNode.left;

  return leftMostNode;
 }

 void insert(int value) {
  Node current = findNode(value);
  if (current != null)
   return;

  Node inserted = new Node(value);
  Node parent = findParent(value);

  if (parent == null) {
   root = inserted;
   return;
  }

  if (value < parent.data)
   parent.left = inserted;
  else if (value > parent.data)
   parent.right = inserted;
 }

 int remove(int value) {
  int deletedValue;
  Node deletedNode = findNode(value);
  Node parent = findParent(value);

  if (deletedNode == null) {
   System.err.println("Node not found!");
   System.exit(1);
  }

  if (isLeaf(deletedNode)) {
   if (deletedNode == root)
    root = null;
   else {
    if (parent.left == deletedNode)
     parent.left = null;
    else
     parent.right = null;
   }

   deletedValue = deletedNode.data;
  } else if (isParentWithOneChild(deletedNode)) {
   if (parent.right == deletedNode) {
    if (deletedNode.right != null)
     parent.right = deletedNode.right;
    else
     parent.left = deletedNode.left;
   } else {
    if (deletedNode.right != null)
     parent.right = deletedNode.right;
    else
     parent.left = deletedNode.left;
   }

   deletedValue = deletedNode.data;
  } else {
   Node highestLeftNode = getRightMostNode(deletedNode.left);
   deletedValue = remove(highestLeftNode.data);
   deletedNode.data = deletedValue;
  }

  return value;
 }

 void print(int order) {
  switch (order) {
  case 1:
   System.out.println("Preorder traversal of binary tree is:");
   printPreOrder(root);
   break;
  case 2:
   System.out.println("Inorder traversal of binary tree is:");
   printInOrder(root);
   break;
  case 3:
   System.out.println("Postorder traversal of binary tree is:");
   printPostOrder(root);
   break;
  default:
   break;
  }
 }

 void printPreOrder(Node currentNode) {
  if (currentNode == null)
   return;

  System.out.println(currentNode.data);
  printPreOrder(currentNode.left);
  printPreOrder(currentNode.right);
 }

 void printInOrder(Node currentNode) {
  if (currentNode == null)
   return;

  printInOrder(currentNode.left);
  System.out.println(currentNode.data);
  printInOrder(currentNode.right);
 }

 void printPostOrder(Node currentNode) {
  if (currentNode == null)
   return;

  printPostOrder(currentNode.left);
  printPostOrder(currentNode.right);
  System.out.println(currentNode.data);
 }
}
```
