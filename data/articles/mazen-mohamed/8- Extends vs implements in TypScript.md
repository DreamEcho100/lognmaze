---
title: Extends vs implements in TypScript
tags: typScript extends vs implements
image_alt: typScript advance concepts extends vs implements
image_src: https://www.educative.io/v2api/editorpage/6232248928960512/image/6474120549105664
description: Extends vs implements. extends means it gets all from its parent. implements in this case is almost like implementing an interface. Child object can pretend that it is parent, but it doesn't get any implementation.
---

## Extends VS implements

- `extends`: **The new class is a child** which **will inherit** all the properties and methods of the class it extends from (the parent class), in simpler terms it well take **all the properties and methods** from it's parent class so you don't have to implement this yourself, It can override some or all of them and implement new ones, but the parent stuff is already included.

- `implements`: **The new class** can be treated as **the same "shape"**, not as a child, **so it will not inherit** any of the properties or methods of the class which it implements from, but still you **need to implement them**, _regardless of having different parent than the one it implements from_.

> This is just an example for all of you who are a game developer criticize me to you heart content in the comment section :)

```ts
class Character {
	name: string;
	type: string;

	constructor(name: string, type: string) {
		this.name = name;
		this.type = type;
	}

	walk = (): void => {
		console.log(`${this.name} walking...`);
	};
}

// NPC will inherit all the properties
// and methods of the Character class
class NPC extends Character {
	constructor(
		name: string,
		type = 'NPC' // Making the default 'NPC'
	) {
		super(name, type);
	}
}

type PlayerOccupation =
	| 'archer'
	| 'knight'
	| 'beast_tamer'
	| 'wizard'
	| 'assassin';
type PlayerType = 'noob' | 'experienced' | 'veteran' | 'legendry';
// Player has to implements at least all the properties
// and methods of the Character class
class Player implements Character {
	name: string;
	type: PlayerType;
	mainOccupation: PlayerOccupation; // extra property that's not in the Character class
	secondaryOccupation: PlayerOccupation; // extra property that's not in the Character class

	constructor(
		name: string,
		type: PlayerType,
		mainOccupation: PlayerOccupation,
		secondaryOccupation: PlayerOccupation
	) {
		this.name = name;
		this.type = type;
		this.mainOccupation = mainOccupation;
		this.secondaryOccupation = secondaryOccupation;
	}

	walk = (): void => {
		console.log(`${this.name} walking...`);
	};
}

const npc1 = new NPC('farmer');

const player = new Player('Adam', 'noob', 'archer', 'wizard');
```

`extends` to profit from inheritance (see [wiki](<https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)>)):

> ... Inheritance in most class-based object-oriented languages is a mechanism in which one object acquires all the properties and behaviours of the parent object. Inheritance allows programmers to: create classes that are built upon existing classes ...

`implements` will be more for polymorphism (see [wiki](<https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>)):

> ... polymorphism is the provision of a single interface to entities of different types...

So, while

- `extends` means it gets all from its parent.

- `implements` in this case is almost like implementing an interface. Child object can pretend that it is parent, but it doesn't get any implementation.

## Resources and further reading

- [What's the difference between 'extends' and 'implements' in TypeScript (newbedev.com)](https://newbedev.com/what-s-the-difference-between-extends-and-implements-in-typescript)

- [What's the difference between 'extends' and 'implements' in TypeScript (stackoverflow.com)](https://stackoverflow.com/questions/38834625/whats-the-difference-between-extends-and-implements-in-typescript)
