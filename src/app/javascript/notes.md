# JavaScript

Notes on the JavaScript fundamentals that matter most when building AI-powered apps.

## Topics

- [Closures](/javascript/closures)

## Primitive types

| Type        | Example        | `typeof`      |
| ----------- | -------------- | ------------- |
| `string`    | `'hello'`      | `'string'`    |
| `number`    | `42`           | `'number'`    |
| `bigint`    | `42n`          | `'bigint'`    |
| `boolean`   | `true`         | `'boolean'`   |
| `undefined` | `undefined`    | `'undefined'` |
| `symbol`    | `Symbol('id')` | `'symbol'`    |
| `null`      | `null`         | `'object'`    |

## Example

```js
const greet = (name) => `Hello, ${name}!`;

console.log(greet('world')); // Hello, world!
```
