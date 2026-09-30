# Closures

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

## Why it matters

- Private state without classes
- Memoization and caching helpers
- Event handlers and callbacks that remember context

Back to [JavaScript](/javascript).
