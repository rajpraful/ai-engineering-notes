# Closures

Variable scope, the lexical environment, hoisting and closures.

## Lexical Environment

In JavaScript, every running function, code block `{...}`, and the script as a whole have an internal (hidden) associated object known as the **Lexical Environment**.

The Lexical Environment object consists of two parts:

1. **Environment Record:** an object that stores all local variables as its properties (and some other information like the value of `this`).
2. **A reference to the outer lexical environment**, the one associated with the outer code.

```text
┌─ Global Lexical Environment ─────────┐
│  createCounter: function             │
│  next: function                      │◀── outer: null
└──────────────────────────────────────┘
               ▲ outer
┌─ createCounter() Lexical Environment ┐
│  count: 2                            │
└──────────────────────────────────────┘
               ▲ outer
┌─ inner () => ++count ────────────────┐
│  (no locals)  looks up `count` ──────┼──▶ found one level up
└──────────────────────────────────────┘
```

When code looks for a variable, it searches the inner environment first, then the outer one, and so on until the global one. That chain is the **variable scope**.

## Closures

A **closure** is a function bundled together with references to its surrounding scope. The inner function keeps access to the outer function's variables even after the outer function has returned.

```js
const createCounter = () => {
  let count = 0;
  return () => ++count;
};

const next = createCounter();
next(); // 1
next(); // 2
```

### Why it matters

- Private state without classes
- Memoization and caching helpers
- Event handlers and callbacks that remember context

## Hoisting and the Temporal Dead Zone

Declarations are "**hoisted**" (raised) to the top of their scope before the code runs.

- **`var`** is hoisted to the top of the function and gets initialized with `undefined`.
- **`let` and `const`** are hoisted to the top of their block scope but remain uninitialized. They enter a state called the **Temporal Dead Zone (TDZ)** until the line that declares them runs.

```js
console.log(a); // undefined: var is hoisted and initialized
var a = 1;

console.log(b); // ReferenceError: b is in the Temporal Dead Zone
let b = 2;
```

## Stale closures

**What is a stale closure and why does it break logic?**

A stale closure occurs in JavaScript when an inner function "remembers" outdated variables from its outer scope because the function was created using an older snapshot of that scope.

Example: a `useEffect` uses a variable inside, and that variable is not in the dependency array. The same happens with `useCallback` and `useMemo`.

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    console.log(count); // always logs 0: the closure captured the first render's `count`
  }, 1000);
  return () => clearInterval(id);
}, []); // `count` is missing from the dependency array
```

Back to [JavaScript](/javascript).
