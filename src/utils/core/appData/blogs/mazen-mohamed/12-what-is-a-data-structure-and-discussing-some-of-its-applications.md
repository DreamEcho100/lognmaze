---
title: what is a Data Structure and a discussing some of its applications
Tags: data-structure programming
image_alt: Nodes connecting to their siblings in a tree like Structure
thumbnailUrl: https://img.favpng.com/6/17/18/data-structures-and-algorithms-algorithms-data-structures-programs-computer-science-png-favpng-WLB6bjNKJudwXf5EVbHqwXNsF.jpg
description: A data structure is a particular way of organizing data in a computer so that it can be used effectively. it consists of a set of nodes that contain the necessary data items or elements that are needed by computer applications.
---

A data structure is a particular way of organizing data in a computer so that it can be used effectively.

For example, we can store a list of items having the same data type using the array data structure.

We can also define it simply as a collection of data elements in some organized fashion.

In other words, the data structures consist of **a set of nodes** that contain the necessary data items or elements that are needed by computer applications.

and there is the following point to remember:

- Each node (data element) may be represented by one computer word or several words in the memory of the computer system.

> As we know a memory consists of cells called words: with sizes 1,2, 4, and 8 bytes.

## What is a Node

Node (item or element):

- An Element or item of the data structure is called (node). Thus a data structure consists of a set of nodes.
- The data at each node is represented by one word or more.

## A data structure Example

- list of names of customers.

```bash
#
#             ----------------------------------------------
#    List    |  Ali  |  Omar  |  Anas  |  Badr  |  Ebrahim  |
#             ----------------------------------------------
#    Index       0       1         2       3         4
#
```

## Node address

Each node has some address (memory location of its first word), It is called a **link, pointer, or reference**.

The address may be:

- absolute address (10, for example).
- relative to some base address **(base + R)**

## Basic Operations on nodes

Note:

- I will use the index **instead** of **address**.
- **index** will always start from 0.

### Accessing

Finding the position of some node to get its content or change the content.

For example Print name in the index of 3 in the _list of names of customers_.

```bash
#
#             ----------------------------------------------
#    List    |  Ali  |  Omar  |  Anas  |  Badr  |  Ebrahim  |
#             ----------------------------------------------
#    Index       0       1         2       3         4
#
#                                       ^^^^^^^^
```

Index three contains "Badr".

### Inserting

In some cases, a new node may be inserted into the data structure

For example, inserting the name "Baher" in _list of names of customers_ in the end, will
give the following structure.

```bash
#
#   Before inserting:
#             ----------------------------------------------
#    List    |  Ali  |  Omar  |  Anas  |  Badr  |  Ebrahim  |
#             ----------------------------------------------
#    Index       0       1         2       3         4
#
#   After inserting:
#             -------------------------------------------------------
#    List    |  Ali  |  Omar  |  Anas  |  Badr  |  Ebrahim  |  Baher |
#             -------------------------------------------------------
#    Index       0       1         2       3         4           5
#
```

### Deletion

In some cases, we may delete some nodes for some reason.

For example, deleting the node containing the name "Anas" in _list of names of customers_ gives the following data structure.

```bash
#
#   Before deletion
#             -------------------------------------------------------
#    List    |  Ali  |  Omar  |  Anas  |  Badr  |  Ebrahim  |  Baher |
#             -------------------------------------------------------
#    Index       0       1         2       3         4           5
#                              ^^^^^^^^
#
#
#   After deletion
#             ----------------------------------------------
#    List    |  Ali  |  Omar  |  Badr  |  Ebrahim  |  Baher |
#             ----------------------------------------------
#    Index       0       1        2         3           4
#
```

we will have to first search for it is located before deleting it.

## Searching

Finding some node with a certain value, for example: find the index of the node in the given data structure containing the name "Badr" in _list of names of customers_.

```bash
#
#             ----------------------------------------------
#    List    |  Ali  |  Omar  |  Badr  |  Ebrahim  |  Baher |
#             ----------------------------------------------
#    Index       0       1        2         3           4
#                              ^^^^^^^^
#
```

the name "Badr" is in the index of 2.

### Sorting

Sorting of nodes is done based on some key (ascending or descending).

For example, sorting the _list of names of customers_ alphabetically descending.

```bash
#
#    Before sorting:
#             ----------------------------------------------
#    List    |  Ali  |  Omar  |  Badr  |  Ebrahim  |  Baher |
#             ----------------------------------------------
#    Index       0       1        2         3           4
#
#    After sorting:
#             ----------------------------------------------
#    List    |  Ali  |  Badr  |  Baher  |  Ebrahim  |  Omar |
#             ----------------------------------------------
#    Index       0       1        2         3           4
#
```

### Copying

The whole structure or some part of It may be copied into another structure.

For example, coping that starts with the letter "B" from the _list of names of customers_ and create a new list named _list of names of customers B_

```bash
#
#    List of names of customers:
#             ----------------------------------------------
#    List    |  Ali  |  Badr  |  Baher  |  Ebrahim  |  Omar |
#             ----------------------------------------------
#    Index       0       1        2         3           4
#
#    list of names of customers B
#             ------------------
#    List    |  Badr  |  Baher  |
#             ------------------
#    Index       0         1

```

### Combining and splitting (separating)

Combining means that two or more structures can be joined into a single structure.

Splitting is the inverse operation of combining.

for example, splitting the _list of names of customers B_ to two half's and then adding the second half to the first to the _list of names of customers_

```bash
#
#    List of names of customers:
#             ----------------------------------------------
#    List    |  Ali  |  Badr  |  Baher  |  Ebrahim  |  Omar |
#             ----------------------------------------------
#    Index       0       1        2         3           4
#
#    List of names of customers B before splitting
#             ------------------
#    List    |  Badr  |  Baher  |
#             ------------------
#    Index       0         1
#
#
#    (1) List of names of customers B after splitting
#
#
#                          --------
#    List (first half)    |  Badr  |
#                          --------
#    Index                     0
#
#                           ---------
#    List (second half)    |  Baher  |
#                           ---------
#    Index                     0
#
#    (2) Adding the second half to the first to the _list of names of customers_
#
#             --------------------------------------------------------
#    List    |  Ali  |  Badr  |  Baher  |  Ebrahim  |  Omar |  Baher  |
#             --------------------------------------------------------
#    Index       0       1        2         3           4        5
#                                                            ^^^^^^^^^
#
```
