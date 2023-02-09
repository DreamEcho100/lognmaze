---
title: What is the difference between the dot operator . operator and arrow operator -> in C++
tags: cpp c arrow-operator dot-operator
image_alt: c++
thumbnailUrl: https://miro.medium.com/max/1400/1*oFfl-1UKLtd8XOswpwgriA.png
description: The arrow operator is syntactic sugar. `foo->member` is the same as `(*foo).member`, The `.` operator is for direct member access and The `->` operator is for indirect member access.
---

Because you can't determine what was meant from the context.

That's why there are two different operators.

And because it wasn't always unambiguous.

The arrow operator is syntactic sugar. `foo->member` is the same as `(*foo).member` _Except when it isn't, such as when `->` is overloaded, When you overload `->` you should also overload `*` such that this relationship holds. To do otherwise will introduce all sorts of confusion_. One reason for the difference is maintainability. With the arrow operator distinct from the dot operator, it becomes much easier to keep track of which variables are pointers and which are not.

- The Dot `.` operator is used to normally access members of a structure or union.
- The Arrow `->` operator exists to access the members of the structure or the unions using pointers.
- The Dot `.` operator can't be overloaded, arrow `->` operator can be overloaded.
- The Dot `.` operator can't be applied to pointers.
- The `.` operator is for direct member access `foo.member`.
- The arrow dereferences a pointer so you can access the object/memory it is pointing to `foo->member`

In very early versions of the C language, the `.` and `->` operators both assumed that the prefix refers to an object of the appropriate structure or pointer type, respectively. Member names were not tightly associated with the structure type in which they were defined.

So if you had a pointer object `foo`, you could legally write `foo.member`, and the compiler would simply treat `foo` as an object of structure type and access the appropriate member at the right offset.

When the language rules were later tightened up so that `prefix.member` is valid only if the prefix is of a structure or union type that has a _member_ named mem, the meaning of the `.` **operator wasn't changed**.

It can also be argued that `.` and `->` specify different operations, and using distinct operator symbols for them makes code easier to read. In languages that combine them, if you see foo.bar you can't tell whether `foo` is a structure or a pointer without seeing its declaration.

`foo.member` is the member of `foo`, `foo->member` is the member of the anonymous object pointed by `foo`.
So we can say The `->` operator is used when we are working with a pointer and the dot is used otherwise. So if we have a struct class like:

```cpp
class student { int name; int class; };
```

and we have an instance of a `student* john` (class pointer), then to get access to the name of the student we would do

```cpp
cout << john->name << endl;
```

In case we had a simple class object, say `student jane`, we would do

```cpp
cout << class_2016.num_students << endl;
```
