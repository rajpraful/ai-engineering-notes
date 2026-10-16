# Basics

Variables, data types, type conversions, operators, loops and numbers.

## var, let, const

|            | `var`                                  | `let`                           | `const`                         |
| ---------- | -------------------------------------- | ------------------------------- | ------------------------------- |
| Scope      | Function                               | Block                           | Block                           |
| Hoisting   | Hoisted and initialized as `undefined` | Hoisted but uninitialized (TDZ) | Hoisted but uninitialized (TDZ) |
| Re-assign  | Yes                                    | Yes                             | No                              |
| Re-declare | Yes                                    | No                              | No                              |

More on hoisting and the Temporal Dead Zone in [Closures](/javascript/closures#hoisting-and-the-temporal-dead-zone).

## Data types

Seven **primitive** data types:

| Type        | Used for                                                                                      | Example        | `typeof`      |
| ----------- | --------------------------------------------------------------------------------------------- | -------------- | ------------- |
| `number`    | Numbers of any kind: integer or floating-point. Integers are limited by ±(2^53 - 1)           | `42`, `3.14`   | `'number'`    |
| `bigint`    | Integer numbers of arbitrary length                                                           | `42n`          | `'bigint'`    |
| `string`    | Strings. A string may have zero or more characters; there's no separate single-character type | `'hello'`      | `'string'`    |
| `boolean`   | `true` / `false`                                                                              | `true`         | `'boolean'`   |
| `null`      | Unknown values: a standalone type that has a single value `null`                              | `null`         | `'object'`    |
| `undefined` | Unassigned values: a standalone type that has a single value `undefined`                      | `undefined`    | `'undefined'` |
| `symbol`    | Unique identifiers                                                                            | `Symbol('id')` | `'symbol'`    |

And one **non-primitive** data type:

- `object` for more complex data structures.

## alert, prompt, confirm

| Function  | What it does                                                     | Returns                                         |
| --------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| `alert`   | Shows a message                                                  | Nothing                                         |
| `prompt`  | Shows a message asking the user to input text                    | The text, or `null` if Cancel or Esc is clicked |
| `confirm` | Shows a message and waits for the user to press "OK" or "Cancel" | `true` for OK, `false` for Cancel/Esc           |

## Type conversions

### Number conversion: `Number(x)`

| Value              | Becomes                                                       |
| ------------------ | ------------------------------------------------------------- |
| `undefined`        | `NaN`                                                         |
| `null`             | `0`                                                           |
| `true` and `false` | `1` and `0`                                                   |
| `string`           | Accordingly: the number it contains, `0` if empty, else `NaN` |

`Number(x)` is the same as `+x`: the `+` operator used as a **unary** operator converts to a number.

### Boolean conversion: `Boolean(x)`

- Values that are intuitively "empty", like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.

## The `+` operator with strings

```js
alert('1' + 2); // "12"
alert(2 + '1'); // "21"
alert(2 + 2 + '1'); // "41" and not "221"
alert('1' + 2 + 2); // "122" and not "14"
```

The binary `+` is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

## Nullish coalescing `??`

`??` returns the first argument if it's not `null`/`undefined`.

```js
const name = user.name ?? 'Anonymous';
```

## Loops

`break` and `continue` work in all loops: `while`, `do...while` and `for`.

- `break` exits the loop.
- `continue` skips to the next iteration.

## Functions, expressions and statements

- A **function declaration** is promoted (hoisted) to the top automatically while running the script, so it can be called before it's defined.
- An **expression** produces a value, whereas a **statement** performs an action.

## Numbers

### Readable numbers

```js
let billion = 1000000000;
let billion = 1_000_000_000; // same value: `_` is just syntactic sugar for readability
```

### Exponent notation

```js
1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000

// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123
```

### Rounding

| Value  | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
| ------ | ------------ | ----------- | ------------ | ------------ |
| `3.1`  | 3            | 4           | 3            | 3            |
| `3.5`  | 3            | 4           | 4            | 3            |
| `3.6`  | 3            | 4           | 4            | 3            |
| `-1.1` | -2           | -1          | -1           | -1           |
| `-1.5` | -2           | -1          | -1           | -1           |
| `-1.6` | -2           | -1          | -2           | -1           |

- `floor` always rounds down, `ceil` always rounds up.
- `round` goes to the nearest integer (`.5` rounds up, towards +∞).
- `trunc` just removes everything after the decimal point.

### Number methods

- `toString(base)`
- `toFixed(digits)`
- `toLocaleString()`

## String methods

- `slice(start, end)`
- `toUpperCase()`
- `toLowerCase()`
- `trim()`
- `split(separator)`
- `indexOf(str)`
- `includes(str)`
