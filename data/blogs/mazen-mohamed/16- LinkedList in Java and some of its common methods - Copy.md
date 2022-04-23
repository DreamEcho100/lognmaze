---
title: LinkedList in Java and some of its common methods
tags: datastructure data structure programming LinkedList java
image_alt: Linked List
image_src: https://www.alphacodingskills.com/imgfiles/linked-list.PNG
description: a linear data structure where the elements are not stored in contiguous locations and every element is a separate object with a data part and address part. The elements are linked using pointers and addresses. Each element is known as a node. Due to the dynamicity and ease of insertions and deletions, they are preferred over the arrays. It also has a few disadvantages like the nodes cannot be accessed directly instead we need to start from the head and follow through the link to reach a node we wish to access.
---

## What is a LinkedList

> Linked List is a part of the Collection framework present in java.util package. This class is an implementation of the LinkedList data structure which is a linear data structure where the elements are not stored in contiguous locations and every element is a separate object with a data part and address part. The elements are linked using pointers and addresses. Each element is known as a node. Due to the dynamicity and ease of insertions and deletions, they are preferred over the arrays. It also has a few disadvantages like the nodes cannot be accessed directly instead we need to start from the head and follow through the link to reach a node we wish to access.
>
> How Does LinkedList work Internally?
> Since a LinkedList acts as a dynamic array and we do not have to specify the size while creating it, the size of the list automatically increases when we dynamically add and remove items. And also, the elements are not stored continuously. Therefore, there is no need to increase the size. Internally, the LinkedList is implemented using the doubly linked list data structure. The main difference between a normal linked list and a doubly LinkedList is that a doubly linked list contains an extra pointer, typically called the previous pointer, together with the next pointer and data which are there in the singly linked list.
> By [LinkedList in Java (geeksforgeeks.org)](https://www.geeksforgeeks.org/linked-list-in-java/)

## LinkedList implementation in Java

Before starting with the linked list we will first need a class `Node` that has two attributes:

- `data`: will hold the value
- `next`: it will point to the next `Node` if exist.

```java
public class Node {
 int data;
 Node next;

 public Node(int data) {
  this.data = data;
  next = null;
 }
}
```

then we will start with building the basic needs of the linked List.

```java
public class MyLinkedList {
  // Will point at the first `Node` that holds the value and the next `Node` if exist
  Node head;
  // Will keep track of the elements on the linkedList
  private int elementsCount;

  // When been called it will initialize both `head` to point at `null` and `elementsCount` to `0`
  public MyLinkedList() {
  head = null;
    elementsCount = 0;
  }

  // To check whether the linkedList is empty or not
  boolean isEmpty() {
    return (elementsCount == 0);
  }

  // returns the `elementsCount`
  int count() {
    return elementsCount;
  }
}
```

- `head`: an attribute that will point at the first `Node` that holds the value and the next `Node` if exist.
- `elementsCount`: a private integer that will keep track of the elements _(nodes)_ on the LinkedList.
- `MyLinkedList`: a constructor when called will initialize both `head` to point at `null` and `elementsCount` to `0`.
- `isEmpty`: A method that will return a boolean to check whether the LinkedList is empty or not.
- `count`: A method that will return the elements _(nodes)_ count `elementsCount`.

### Insert at the start of the LinkedList

```java
int insertFirst(int data) {
  // Store `data` in a new object `newNode` with type of `Node` and its `newNode.next` = `null`
  Node newNode = new Node(data);

  // Check if the linked list is empty
  if (isEmpty()) {
    // Assign the attribute `head` to the new `newNode`
    head = newNode;
  } else {
    // Assign the `newNode,next` to point at the old node that `head` point to
    newNode.next = head;

    // Assign the attribute `head` to the new `newNode`
    head = newNode;
  }

  // Increment the value of `elementsCount` by one
  elementsCount++;

  return newNode.data;
}
```

- In this method, it will accept the `data` and point at the in a new object `newNode` with the type of `Node` and its `newNode.next` = `null`.

- We will first check if the linked list is empty `isEmpty`:

- If true then we will assign the attribute `head` to the new `newNode`, else if false then that means that the attribute `head` already has a value.

- Then we will change the `newNode.next` to point at the node _(old head)_ that the attribute `head` points to and then make the `head` attribute point at the new `newNode`.

- Finally, we will increment the value of `elementsCount` by one and return the `data`.

#### Example for inserting first if the Linked list is not empty

```bash
# (1)
#                      head
#                        \
#                         \
#                          \
#      --------------       --------------       --------------
#     | value | next |     | value | next-|---->| value | next-|----> null
#      ------------|-       --------------       --------------        ^
#          newNode |           oldNode             otherNode           |
#                   ---------------------------------------------------
#
# (2)
#                      head
#                         \
#                          \
#                           \
#      --------------       --------------       --------------
#     | value | next-|---->| value | next-|---->| value | next-|----> null
#      --------------       --------------       --------------
#          newNode              oldNode             otherNode
#
# (3)
#                      head
#                      /
#                     /
#                    /
#      --------------       --------------       --------------
#     | value | next-|---->| value | next-|---->| value | next-|----> null
#      --------------       --------------       --------------
#          newNode              oldNode             otherNode
```

### Insert at the end of the LinkedList

```java
int insertLast(int data) {
  // Store `data` in a new object `newNode` with type of `Node` and its `newNode.next` = `null`
  Node newNode = new Node(data);

  // Check if the linked list is empty
  if (isEmpty()) {
    // Assign the attribute `head` to the new `newNode`
    head = newNode;
  } else {
    // Store the current node which in this case we will be the attribute `head` in `tempNode`
    Node tempNode = head;

    // Keep looping and assigning `tempNode` to `tempNode.next` until we get to the last element where `tempNode.next` = `null`
    while (tempNode.next != null) {
      tempNode = tempNode.next;
    }

    // Assigning the `tempNode.next` to the `newNode` instead of null
    tempNode.next = newNode;
  }

  // Increment the value of `elementsCount` by one
  elementsCount++;
  return newNode.data;
}
```

- In this method, it will accept the `data` and use it to build a new object `newNode` with the type of `Node` and its `newNode.next` = `null`.

- We will first check if the linked list is empty `isEmpty`:

- If true then we will change the attribute `head` to the new `newNode`, else if false then that means that the attribute `head` already has a value.

- We will use the variable `tempNode` to point at the current node which in this case we will be the attribute `head`.

- Then we will need to go to the last `Node` we can achieve that by using a while loop through the linked list.

- _We will keep looping and assigning it to the next node until we hit the last element by checking if `tempNode.next` = `null`._

- And When we hit the last node we will change its next attribute `tempNode.next` to point at the new node `newNode`.

- Finally, we will increment the value of `elementsCount` by one and return the `data`.

#### Example for inserting at the end of the Linked list is not empty

```bash
# (1)
#       head
#        \                                                                                                    --------------
#         \                                                                                                 | value | next-|----> null
#          \                                                                                                 -------------         ^
#           \                                                                                                   newNode            |
#            \                                                                                                                     |
#             \                                                                                                                    |
#              \                                                                                                                   |
#      --------------       --------------       --------------       --------------       --------------                          |
#     | value | next-|---->| value | next-|---->| value | next-|---->| value | next-|---->| value | next-|-------------------------
#      --------------       --------------       --------------       --------------       --------------
#          Node 1               Node 2               Node 3               Node 4                Node 5
#                                                                                             currently
#                                                                                           (the last node)
# (2)
#       head
#        \                                                                                                    --------------
#         \                                                                                                 | value | next-|----> null
#          \                                                                                                 --------------
#           \                                                                                              /     newNode
#            \                                                                                            /     currently
#             \                                                                                          /  (the new last node)
#              \                                                                                        /
#      --------------       --------------       --------------       --------------       ------------/-
#     | value | next-|---->| value | next-|---->| value | next-|---->| value | next-|---->| value | next |
#      --------------       --------------       --------------       --------------       --------------
#          Node 1               Node 2               Node 3               Node 4                Node 5
```

### Remove from the first of the LinkedList

```java
int removeFirst() {
  // Check if linked list is empty
  if (isEmpty())  {
    // throw new Exception("LinkedList is empty!");
    System.err.println("LinkedList is empty!");
    System.exit(-1);
  }

  // Store the value of the deleted node
  int removedNodeValue;

  // Check if there is only node
  if (head.next == null) {
    // Assign `removedNodeValue` to `head.data` to return it
    removedNodeValue = head.data;
    // reset `head` and its attributes
    head.next = null;
    head.data = 0;
    head = null;
  } else {
    // Assign `tempRemovedNode` to point at `head` to remove it
    Node tempRemovedNode = head;
    // Assign `removedNodeValue` to `head.data` to return it
    removedNodeValue = head.data;
    // Assign head to point at the second node
    head = head.next;

    // Reset `tempRemovedNode` values
    tempRemovedNode.next = null;
    tempRemovedNode.data = 0;
    tempRemovedNode = null;
  }

  // Decrement the value of `elementsCount` by one
  elementsCount--;

  // Return `removedNodeValue
  return removedNodeValue;
}
```

- First, we will check if the linked list is empty.
- if true we will exist and we will print an error or we can throw an exception.
- Then we will point at the value of the deleted node.
- After that Check, if there is only one node.
- And assigning `removedNodeValue` to `head.data` to return it.
- And reset `head` and its attributes.
- Then assign `tempRemovedNode` to point at `head` to remove it.
- And assigning `removedNodeValue` to `head.data` to return it.
- And assigning head to point at the second node.
- Then Reset `tempRemovedNode` values.
- And then we decrement the value of `elementsCount` by one.
- Finally, we return `removedNodeValue.

#### Example for removing from the first of the linked list if the Linked list is not empty

```bash
# (1)
#                      head
#                      /
#                     /
#                    /
#      --------------       --------------       --------------
#     | value | next-|---->| value | next-|---->| value | next-|----> null
#      --------------       --------------       --------------
#          newNode              oldNode             otherNode
#
# (2)
#                      head
#                         \
#                          \
#                           \
#      --------------       --------------       --------------
#     | value | next-|---->| value | next-|---->| value | next-|----> null
#      ------------|-       --------------       --------------         ^
#          newNode |            oldNode             otherNode           |
#                  |                                                    |
#                    ---------------------------------------------------
#
# (3)
#                      head
#                        \
#                         \
#                          \
#      --------------       --------------       --------------
#     | value | next |     | value | next-|---->| value | next-|----> null
#      ------------|-       --------------       --------------         ^
#          newNode |            oldNode             otherNode           |
#                   ----------------------------------------------------
```

### Remove from the end of the LinkedList

```java
int removeLast() {
  // Check if linked list is empty
  if (isEmpty())  {
    // throw new Exception("LinkedList is empty!");
    System.err.println("LinkedList is empty!");
    System.exit(-1);
  }

  // Store the value of the deleted node
  int removedNodeValue;

  // Check if there is only node
  if (head.next == null) {
    // Assign `removedNodeValue` to `head.data` to return it
    removedNodeValue = head.data;
    // Assign `head` to point at `null`
    head = null;
  } else {
    // Initially we will point at the first node `head` in it
    Node tempNode = head;
    // Using `tempRemovedNode` to point at the node in the position before the desired index to reset it
    Node tempRemovedNode;

    // Keep looping `tempNode.next.next` not equal `null` (the node before the last one)
    while (tempNode.next.next != null) {
      // Assign the node before the last one `tempNode.next` to `tempNode` instead of pointing at the last node
      tempNode = tempNode.next;
    }

    // Assign `removedNodeValue` to `head.data` to return it
    removedNodeValue = tempNode.next.data;
    // Assign `tempRemovedNode` to point the node that will be removed to reset it
    tempRemovedNode = tempNode.next;
    // Assign `tempNode` to point at `null` instead of the removed node
    tempNode.next = null;

    // Reset the `tempNode` (old last node)
    tempRemovedNode.next = null;
    tempRemovedNode.data = 0;
    tempRemovedNode = null;
  }

  // Decrement the value of `elementsCount` by one
  elementsCount--;

  // Return `removedNodeValue
  return removedNodeValue;
}
```

- First, we will check if the linked list is empty.
- If true we will exist and we will print an error or we can throw an exception.
- Then we will point at the value of the deleted node.
- After that Check, if there is only one node.
- And assigning `removedNodeValue` to `head.data` to return it.
- And assigning `head` to point at `null`.
- We will use `tempNode` to point at the node before the last one when we find it, Initially, we will point at the first node `head` in it.
- And we will keep looping `tempNode.next.next` not equal `null` (the node before the last one).
- And assigning the node before the last one `tempNode.next` to `tempNode` instead of pointing at the last node.
- And assigning `removedNodeValue` to `head.data` to return it, and Assign `tempRemovedNode` to point to the node that will be removed to reset it.
- Then we will assign `tempNode` to point at `null` instead of the **removed node**.
- Then we will reset the `tempRemovedNode` (old last node).
- After that, we will decrement the value of `elementsCount` by one.
- And finally, we will return `removedNodeValue.

#### Example for removing from the end of the Linked list is not empty

```bash
# (1)
#       head
#        \
#         \
#          \
#           \
#            \
#             \
#              \
#      --------------       --------------       --------------       --------------       --------------
#     | value | next-|---->| value | next-|---->| value | next-|---->| value | next-|---->| value | next-|----> null
#      --------------       --------------       --------------       --------------       --------------
#          Node 1               Node 2               Node 3               Node 4                Node 5
#                                                                                             currently
#                                                                                          (the last node)
# (2)
#       head
#        \
#         \
#          \
#           \
#            \
#             \
#              \
#      --------------       --------------       --------------       --------------       --------------
#     | value | next-|---->| value | next-|---->| value | next-|---->| value | next-|---->| value | next-|----> null
#      --------------       --------------       --------------       --------------       --------------        ^
#          Node 1               Node 2               Node 3               Node 4    \           Node 5           |
#                                                                        currently   \                           |
#                                                                      (the last node) --------------------------
```

### Insert at a certain index of the linked list

```java
int insertAt(int index, int data) {
  // Store `data` in a new object `newNode` with type of `Node` and its `newNode.next` = `null`
  Node newNode = new Node(data);

  // Check if to insert at the index of 0
  if (index == 0) {
  // Check if the linked list is empty
    if (isEmpty()) {
      // Assign `head` to point at `newNode`
      head = newNode;
    } else {
      // Assign `newNode.next` to point at the old head
      newNode.next = head;
      // Assign `head` to point at `newNode`
      head = newNode;
    }
  } else {
    // Assign the current node which in this case we will be the attribute `head` in `tempNode`
    Node tempNode = head;

    // Keep looping until we hit the node in the position before the desired index
    int i;
    for (i = 0; i < index - 1; i++) {
      // Assign the node in the position before the desired index in `tempNode`
      tempNode = tempNode.next;
    }

    // Assign `newNode.next` to point at the `next` attribute of the node in the position before the desired index `tempNode`
    newNode.next = tempNode.next;

    // Assign the `next` attribute of the node in the position before the desired index `tempNode` to point at the `newNode`
    tempNode.next = newNode;
  }

  // Increment the value of `elementsCount` by one
  elementsCount++;
}

```

In this method it will accept `index` and `data` and use it to build a new object `newNode` with type of `Node` and its `newNode.next` = `null`.

- Check if the `index` is 0
- Check if the linked list is empty
- Assign `head` to point at `newNode`
- Assign `newNode.next` to point at the old head
- Assign `head` to point at `newNode`
- Assign the current node which in this case we will be the attribute `head` in `tempNode`
- Keep looping until we hit the node in the position before the desired index
- Assign the node in the position before the desired index in `tempNode`
- Assign `newNode.next` to point at the `next` attribute of the node in the position before the desired index `tempNode`
- Assign the `next` attribute of the node in the position before the desired index `tempNode` to point at the `newNode`
- Increment the value of `elementsCount` by one

#### Example for inserting at a certain index of the Linked List is not empty

```bash
# (1)
#       head
#        \                         --------------
#         \                       | value | next-|-----------------------------------------------------------------------------> null
#          \                       --------------                                                                                  ^
#           \                         newNode                                                                                      |
#            \                                                                                                                     |
#             \                                                                                                                    |
#              \                                                                                                                   |
#      --------------       --------------       --------------       --------------       --------------                          |
#     | value | next-|---->| value | next-|---->| value | next-|---->| value | next-|---->| value | next-|-------------------------
#      --------------       --------------       --------------       --------------       --------------
#          Node 1               Node 2               Node 3               Node 4                Node 5
# (2)
#       head
#        \                         --------------
#         \                       | value | next |                                                                               null
#          \                       ----------\--                                                                                   ^
#           \                         newNode \                                                                                    |
#            \                                 \                                                                                   |
#             \                                 \                                                                                  |
#              \                                 \                                                                                 |
#      --------------       --------------       --------------       --------------       --------------                          |
#     | value | next-|---->| value | next-|---->| value | next-|---->| value | next-|---->| value | next-|-------------------------
#      --------------       --------------       --------------       --------------       --------------
#          Node 1               Node 2               Node 3               Node 4                Node 5
# (3)
#       head
#        \                         --------------
#         \                       | value | next |                                                                               null
#          \                       ----------\--                                                                                   ^
#           \                       | newNode \                                                                                    |
#            \                      |          \                                                                                   |
#             \                     |           \                                                                                  |
#              \                    |            \                                                                                 |
#      --------------       --------|-----       --------------       --------------       --------------                          |
#     | value | next-|---->| value | next |     | value | next-|---->| value | next-|---->| value | next-|-------------------------
#      --------------       --------------       --------------       --------------       --------------
#          Node 1               Node 2               Node 3               Node 4                Node 5
```

### Remove at a certain index of the linked list

```java
int removeAt(int index) {
  // Check if linked list is empty
  if (isEmpty())  {
    // throw new Exception("LinkedList is empty!");
    System.err.println("LinkedList is empty!");
    System.exit(-1);
  }

  int removedNodeValue;

  // Check if to delete at the index of 0
  if (index == 0) {
    if (head.next == null) {
      // Assign `removedNodeValue` to `head.data` to return it
      removedNodeValue = head.data;
      // Assign `head` to point at `null`
      head = null;
    } else {
      // Using `tempRemovedNode` to point at the first node to reset it
      Node tempRemovedNode = head;
      // Assign `removedNodeValue` to `head.data` to return it
      removedNodeValue = head.data;
      head = head.next;

      // Reset the `tempRemovedNode` (the removed node)
      tempRemovedNode.next = null;
      tempRemovedNode.data = 0;
      tempRemovedNode = null;
    }
  } else {
    // Assign the current node which in this case we will be the attribute `head` in `tempNode`
    Node tempNode = head;
    // Using `tempRemovedNode` to point at the node in the position before the desired index to reset it
    Node tempRemovedNode;

    int i;
    for (i = 0; i < index - 1; i++) {
      tempNode = tempNode.next;
    }

    // Assign `removedNodeValue` to `head.data` to return it
    removedNodeValue = tempNode.next.data;
    tempRemovedNode = tempNode.next;
    tempNode.next = tempNode.next.next;

    // Reset the `tempRemovedNode` (the removed node)
    tempRemovedNode.next = null;
    tempRemovedNode.data = 0;
    tempRemovedNode = null;
  }

  // Decrement the value of `elementsCount` by one
  elementsCount--;

  // Return `removedNodeValue
  return removedNodeValue;
}
```

In this method, it will accept `index`.

- First, we will check if the linked list is empty.
- If true we will exist and we will print an error or we can throw an exception.
- Check if to delete at the index of 0.
- Assign `removedNodeValue` to `head.data` to return it.
- Assign `head` to point at `null`.
- Use `tempRemovedNode` to point at the first node to reset it.
- Assign `removedNodeValue` to `head.data` to return it.
- Reset the `tempRemovedNode` (the removed node).
- Assign the current node which in this case we will be the attribute `head` in `tempNode`.
- Use `tempRemovedNode` to point at the node in the position before the desired index to reset it.
- Assign `removedNodeValue` to `head.data` to return it.
- Reset the `tempRemovedNode` (the removed node).
- Decrement the value of `elementsCount` by one.
- Return `removedNodeValue.

### Reversing a linked list

**credit to [Reverse a linked list (geeksforgeeks.org)](https://www.geeksforgeeks.org/reverse-a-linked-list/)**

```java
/* Function to reverse the linked list */
Node reverse() {
  // Initialize three pointers
  // previous as NULL,
  Node previous = null;
  // current as head
  Node current = head;
  // next as NULL.
  Node next = null;

  // Iterate through the linked list. In loop, do following.
  while (current != null) {
    // Before changing next of current,
    // store next node
    // next = current->next
    next = current.next;
    // Now change next of current
    // This is where actual reversing happens
    // current->next = previous
    current.next = previous;
    // Move previous and current one step forward
    // previous = current
    // current = next
    previous = current;
    current = next;
  }

  head = previous;
  return head;
}
```

![geeksforgeeks example for reversing a linked list](https://media.geeksforgeeks.org/wp-content/cdn-uploads/RGIF2.gif)

### Prints the content of the linked list

```java
void printList() {
  Node node = head;

  while (node != null) {
    System.out.print(node.data + " ");
    node = node.next;
  }
}
```

## Finale code

```java
public class Node {
 int data;
 Node next;

 public Node(int data) {
  this.data = data;
  next = null;
 }
}
```

```java
public class MyLinkedList {
  Node head;
  private int elementsCount;

  public MyLinkedList() {
    head = null;
    elementsCount = 0;
  }

  boolean isEmpty() {
    return (elementsCount == 0);
  }

  int count() {
    return elementsCount;
  }

  int insertFirst(int data) {

    Node newNode = new Node(data);

    if (isEmpty()) {
      head = newNode;
    } else {
      newNode.next = head;

      head = newNode;
    }

    elementsCount++;
    return newNode.data;
  }

  int insertLast(int data) {
    Node newNode = new Node(data);

    if (isEmpty()) {
      head = newNode;
    } else {
      Node tempNode = head;

      while (tempNode.next != null) {
        tempNode = tempNode.next;
      }

      tempNode.next = newNode;
    }

    elementsCount++;
    return newNode.data;
  }

  int removeFirst() {
    if (isEmpty())  {
      // throw new Exception("LinkedList is empty!");
      System.err.println("LinkedList is empty!");
      System.exit(-1);
    }

    int removedNodeValue;

    if (head.next == null) {
      removedNodeValue = head.data;
      head.next = null;
      head.data = 0;
      head = null;
    } else {
      Node tempRemovedNode = head;
      removedNodeValue = head.data;
      head = head.next;

      tempRemovedNode.next = null;
      tempRemovedNode.data = 0;
      tempRemovedNode = null;
    }

    elementsCount--;

    return removedNodeValue;
  }

  int removeLast() {
    if (isEmpty())  {
      // throw new Exception("LinkedList is empty!");
      System.err.println("LinkedList is empty!");
      System.exit(-1);
    }

    int removedNodeValue;

    if (head.next == null) {
      removedNodeValue = head.data;
      head = null;
    } else {
      Node tempNode = head;
      Node tempRemovedNode;

      while (tempNode.next.next != null) {
        tempNode = tempNode.next;
      }

      removedNodeValue = tempNode.next.data;
      tempRemovedNode = tempNode.next;
      tempNode.next = null;

      tempRemovedNode.next = null;
      tempNode.data = 0;
      tempNode = null;
    }

    elementsCount--;

    return removedNodeValue;
  }

  int insertAt(int index, int data) {
    Node newNode = new Node(data);

    if (index == 0) {
      if (isEmpty()) {
        head = newNode;
      } else {
        newNode.next = head;
        head = newNode;
      }
    } else {
      Node tempNode = head;

      int i;
      for (i = 0; i < index - 1; i++) {
        tempNode = tempNode.next;
      }

      newNode.next = tempNode.next;

      tempNode.next = newNode;
    }

    elementsCount++;
    return newNode.data;
  }

  int removeAt(int index) {
    if (isEmpty())  {
      // throw new Exception("LinkedList is empty!");
      System.err.println("LinkedList is empty!");
      System.exit(-1);
    }

    int removedNodeValue;

    if (index == 0) {
      if (head.next == null) {
        removedNodeValue = head.data;
        head = null;
      } else {
        Node tempRemovedNode = head;
        removedNodeValue = head.data;
        head = head.next;

        tempRemovedNode.next = null;
        tempRemovedNode.data = 0;
        tempRemovedNode = null;
      }
    } else {
      Node tempNode = head;
      Node tempRemovedNode;

      int i;
      for (i = 0; i < index - 1; i++) {
        tempNode = tempNode.next;
      }

      removedNodeValue = tempNode.next.data;
      tempRemovedNode = tempNode.next;
      tempNode.next = tempNode.next.next;

      tempRemovedNode.next = null;
      tempRemovedNode.data = 0;
      tempRemovedNode = null;
    }

    elementsCount--;

    return removedNodeValue;
  }

  Node reverse() {
    Node previous = null;
    Node current = head;
    Node next = null;

    while (current != null) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    head = previous;
    return head;
  }

  void printList() {
    Node node = head;

    while (node != null) {
      System.out.print(node.data + " ");
      node = node.next;
    }
  }
}
```
