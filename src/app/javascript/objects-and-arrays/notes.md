# Objects & Arrays

Working with object keys, array methods, classes and Proxy.

## Objects

To delete a key from an object:

```js
delete user.age;
```

Loop over the keys with `for...in`:

```js
for (key in object) {
  // executes the body for each key among object properties
}
```

A function that is a property of an object is called its **method**.

## Arrays

### `arr.at(i)`

- Is exactly the same as `arr[i]`, if `i >= 0`.
- For negative values of `i`, it steps back from the end of the array.

```js
const fruits = ['Apple', 'Orange', 'Plum'];
fruits.at(-1); // "Plum"
```

### Adding and removing at the ends

```text
             unshift ──▶ ┌───┬───┬───┬───┐ ◀── push
             shift   ◀── │ 0 │ 1 │ 2 │ 3 │ ──▶ pop
                         └───┴───┴───┴───┘
               start (slow)            end (fast)
```

| Method        | What it does                                              |
| ------------- | --------------------------------------------------------- |
| `arr.push`    | Adds an element at the end                                |
| `arr.pop`     | Removes the element at the end and returns it (stack)     |
| `arr.shift`   | Removes the element from the start and returns it (queue) |
| `arr.unshift` | Adds an element at the start                              |

Methods `push`/`pop` run fast, while `shift`/`unshift` are slow. For `shift`/`unshift`, it's not enough to take and add/remove the element with the index `0`. Other elements need to be renumbered as well.

### Looping with `for...of`

```js
for (let fruit of fruits) {
  alert(fruit);
}
```

### The `length` property

- `length` automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the **greatest numeric index plus one**.
- `length` is writable. If we increase it manually, nothing interesting happens. But if we decrease it, the array is truncated. The process is irreversible.

```js
const arr = [1, 2, 3, 4, 5];
arr.length = 2; // truncate to 2 elements
arr; // [1, 2]
arr.length = 5; // return length back
arr[3]; // undefined: the values do not return
```

### Array methods

Reference: [javascript.info/array-methods](https://javascript.info/array-methods)

| #   | Method                                               | Returns                                                          | Modifies original? |
| --- | ---------------------------------------------------- | ---------------------------------------------------------------- | ------------------ |
| 1   | `arr.splice(0, 3, "Let's", "dance")`                 | Array of removed items                                           | Yes                |
| 2   | `arr.slice(start, end)`                              | Array of items from index `start` to `end` (not including `end`) | No                 |
| 3   | `arr.concat([3, 4], 5, 6)`                           | New array with the values added                                  | No                 |
| 4   | `arr.indexOf(item, fromIndex)`                       | Index of `item`, or `-1`                                         | No                 |
| 5   | `arr.includes(item, fromIndex)`                      | `true` / `false`                                                 | No                 |
| 6   | `arr.lastIndexOf(item)`                              | Last index of `item`, or `-1`                                    | No                 |
| 7   | `arr.find((item, index, arr) => condition)`          | The first matched element (whereas `arr.some` returns a boolean) | No                 |
| 8   | `arr.findIndex((item, index, arr) => condition)`     | Index of the first match, or `-1`                                | No                 |
| 9   | `arr.findLastIndex((item, index, arr) => condition)` | Index of the last match, or `-1`                                 | No                 |
| 10  | `arr.filter((item, index, arr) => condition)`        | New array of all matching items                                  | No                 |
| 11  | `arr.sort((a, b) => a - b)`                          | The sorted array                                                 | **Yes**            |
| 12  | `arr.reverse()`                                      | The reversed array                                               | **Yes**            |
| 13  | `str.split(separator)`                               | Array (a string method that turns a string into an array)        | No                 |
| 14  | `arr.join(joiner)`                                   | String                                                           | No                 |
| 15  | `arr.reduce(fn, initial)`                            | A single accumulated value                                       | No                 |

```js
let value = arr.reduce(
  function (accumulator, item, index, array) {
    // ...
  },
  [initial],
);
```

### Checking for an array

`typeof` an array returns `"object"`, so use `Array.isArray`:

```js
typeof []; // "object"
Array.isArray([]); // true
Array.isArray({}); // false
```

## Immutability

In JavaScript, **immutability** means that once a value or object is created, it cannot be changed. Instead of changing it, you create a new copy with the change.

```js
const user = { name: 'John' };
const updatedUser = { ...user, age: 30 }; // new object, `user` is untouched
```

## Classes and private fields

For class-based code, plain JavaScript uses `#` to declare private fields. TypeScript also has the `private` keyword:

```ts
class SimpleCounterExample {
  private counter = 0; // in plain JS: #counter = 0;

  constructor(initialValue: number = 0) {
    this.counter = initialValue;
  }

  public getCounter() {
    return this.counter;
  }

  public increseCounter(value: number = 1) {
    this.counter = this.counter + value;
    return this.getCounter();
  }

  public decreseCounter(value: number = 1) {
    this.counter = this.counter - value;
    return this.getCounter();
  }
}
```

## Proxy

A JavaScript **Proxy** object is a built-in wrapper that allows you to intercept and redefine fundamental operations on another object.

```js
const user = { name: 'John' };

const loggedUser = new Proxy(user, {
  get(target, key) {
    console.log(`Reading ${key}`);
    return target[key];
  },
});

loggedUser.name; // Logs "Reading name", returns "John"
```
