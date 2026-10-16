# TypeScript

TypeScript makes JavaScript **statically typed**.

## Type inference

**Type inference** allows the TypeScript compiler to automatically deduce a variable's data type based on its initial value assignment.

```ts
let count = 5; // inferred as number
count = 'five'; // Error: Type 'string' is not assignable to type 'number'
```

## Extra data types from TypeScript

- `any`
- `unknown`
- `never`
- `enum`
- `tuple`

### any vs unknown vs never

**What is the difference between `any`, `unknown`, and `never`?**

| Type      | What it means                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `any`     | Turns off all type checks, allowing any operation on the variable.                                                                               |
| `unknown` | A safer alternative to `any` that accepts any value but blocks any property access or execution until you narrow its type down via a type guard. |
| `never`   | Represents values that can never occur, such as the return type of a function that always throws an error or runs an infinite loop.              |

```ts
let a: any = 'hi';
a.toFixed(); // no error at compile time, crashes at runtime

let u: unknown = 'hi';
u.toUpperCase(); // Error: 'u' is of type 'unknown'
if (typeof u === 'string') u.toUpperCase(); // OK after narrowing

const fail = (message: string): never => {
  throw new Error(message);
};
```

## readonly

We can also use the `readonly` keyword, which prevents the array from being changed.

```ts
let ourTuple: readonly [number, boolean, string];
let array: readonly string[];
```

## enum

An **enum** is a type of variable whose values are constants. You have to use the values within it only.

```ts
enum allDirections {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
}

let currentDirection = allDirections.North;
console.log(currentDirection);
// logs "North"
```

## type

A `type` alias lets you define a type with a custom name. It can be used for all primitive types like `string` and `number`, and also complex types like objects and arrays.

```ts
type Year = number;
type Type = string;
type Model = string;
type Car = {
  year: Year;
  type: Type;
  model: Model;
};

const carYear: Year = 2005;
const carType: Type = 'Tata';
const carModel: Model = 'Tiago';
const car: Car = {
  year: carYear,
  type: carType,
  model: carModel,
};
```

## interface

**Interfaces** are like `type`, but can be used only for objects.

```ts
interface Square {
  length: number;
}

const square: Square = {
  length: 20,
};
```

## Union types

**Union types** are used when a property can be more than one type, like `string` or `number`. For this reason, they are also called **OR** types, and are written using the `|` symbol.

```ts
function printSucessCode(code: string | number) {
  console.log(`My success code is ${code}.`);
}

printSucessCode(200);
printSucessCode('200');
```

## as const

`as const` freezes the variable and doesn't allow modifying it.

```ts
const strictUser = {
  role: 'admin',
} as const; // Inferred Type: { readonly role: "admin" }

strictUser.role = 'guest'; // Error: Cannot assign to 'role' because it is a read-only property
```

## Private class members

In TypeScript, you can make class properties and methods private using the `private` keyword. See the [class example](/javascript/objects-and-arrays#classes-and-private-fields).

## Type guards

TypeScript **type guards** are powerful constructs that allow you to narrow down the type of a variable within a specific scope.

E.g. `typeof`, the `in` operator.

```ts
const format = (value: string | number) => {
  if (typeof value === 'string') {
    return value.toUpperCase(); // value is string here
  }
  return value.toFixed(2); // value is number here
};

const move = (animal: Fish | Bird) => {
  if ('swim' in animal) {
    return animal.swim(); // animal is Fish here
  }
  return animal.fly(); // animal is Bird here
};
```
