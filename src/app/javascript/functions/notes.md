# Functions

Recursion, `this` binding, error handling and the functional patterns that show up everywhere: currying, pure functions, higher-order functions, memoization, debounce, throttle and generators.

## Recursion

```js
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

alert(pow(2, 3)); // 8
```

Recursion always follows **stack** flow (last in, first out), not queue flow:

```text
pow(2, 3)                      ▲ returns 2 * 4 = 8
 └─ pow(2, 2)                  │ returns 2 * 2 = 4
     └─ pow(2, 1)  ── base ──▶ │ returns 2
```

## call, apply, bind

```js
functionName.call(thisArg, arg1, arg2, ...);
```

`thisArg` is the object you want to be treated as `this`.

| Method  | Invokes immediately?       | How arguments are passed                               |
| ------- | -------------------------- | ------------------------------------------------------ |
| `call`  | Yes                        | One by one: `.call(thisObj, 'arg1', 'arg2')`           |
| `apply` | Yes                        | As a single array: `.apply(thisObj, ['arg1', 'arg2'])` |
| `bind`  | No, returns a new function | Same as `call`                                         |

## try...catch...finally

```js
try {
  // ... try to execute the code ...
} catch (err) {
  // ... handle errors ...
} finally {
  // ... execute always ...
}
```

## Currying

**Currying** is a functional programming technique where a function that takes multiple arguments is transformed into a series of nested functions, each taking a single argument.

```text
f(a, b, c)  ──▶  f(a)(b)(c)
```

```js
// Curried function to create an authorized fetcher
const createAuthFetch =
  (token) =>
  (url) =>
  (options = {}) => {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    return fetch(url, options);
  };

// Step 1: Lock in the token (e.g., after user logs in)
const authFetch = createAuthFetch('MY_SECRET_TOKEN');

// Step 2: Use the pre-loaded fetcher across the app
authFetch('/api/user-profile');
authFetch('/api/orders');
```

## Pure functions

A **pure function** is a block of code that consistently produces the same result when given the same arguments and has no observable side effects on the rest of the application.

**No side effects:** the function must not modify any data or state outside its own scope. Common side effects to avoid include:

- Mutating (changing) input parameters or external variables.
- Performing I/O operations like `console.log()`.
- Making API or HTTP calls (AJAX/`fetch`).
- Manipulating the DOM.

```js
// Pure
const add = (a, b) => a + b;

// Impure: mutates something outside its scope
let total = 0;
const addToTotal = (value) => (total += value);
```

## Higher-order functions

A **higher-order function (HOF)** is a function that either takes one or more functions as arguments or returns a function as its result.

`map`, `filter`, `reduce`, and the `debounce`/`throttle`/`memoize` helpers below are all higher-order functions.

## Memoization

**Memoization** is an optimization technique used to speed up computer programs by caching the results of expensive function calls and returning the cached result when the same inputs occur again.

```js
const memoize = (fun) => {
  const cache = {};

  return (arg) => {
    if (arg in cache) {
      return cache[arg];
    }

    const result = fun(arg);
    cache[arg] = result;
    return result;
  };
};
```

## Debouncing vs throttling

```text
Events:    ▮ ▮▮ ▮ ▮▮▮ ▮      ▮▮ ▮ ▮▮      (user keeps firing events)

Debounce:                 ●            ●   runs once, after the events pause
Throttle:  ●     ●     ●     ●     ●       runs at a steady rate while events fire
```

### Debouncing

**Debouncing** groups multiple sequential calls into a single execution after a specified pause. Every new event trigger cancels the previous scheduled timer and starts a fresh one.

Use cases:

- **Search input field:** Waiting for a user to pause typing before making an API call.
- **Form validation:** Checking username availability after typing finishes.

```js
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear the previous timer if the event fires again before the delay ends
    clearTimeout(timeoutId);

    // Start a new timer for the function execution
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example usage:
const handleSearch = debounce((query) => {
  console.log('Fetching search results for:', query);
}, 300);
```

### Throttling

**Throttling** forces a function to run at a consistent rate. If an event triggers 50 times in 100 milliseconds, a throttled implementation will block intermediate calls and only allow execution at regular, predefined intervals.

Use cases:

- **Scroll tracking:** Triggering infinite scroll or calculating animation states as the user moves down a page.
- **Game loop actions:** Limiting how fast a player can click a button to fire a weapon.
- **Mouse movements:** Tracking dragging coordinates without overwhelming the thread.

```js
function throttle(func, interval) {
  let shouldWait = false;

  return function (...args) {
    // If the timeout is currently active, ignore the function call
    if (shouldWait) return;

    // Execute the function immediately
    func.apply(this, args);
    shouldWait = true;

    // Reset the flag after the specified interval has passed
    setTimeout(() => {
      shouldWait = false;
    }, interval);
  };
}

// Example usage:
const handleScroll = throttle(() => {
  console.log('Updating scroll position coordinates...');
}, 200);
```

## Generators

A generator function (declared with `function*`) can pause with `yield` and resume later with `next()`.

```js
// 1. Define the generator using the asterisk (*)
function* numberGenerator() {
  console.log('Start');
  yield 10; // Pauses here on the 1st next()

  console.log('Resume');
  yield 20; // Pauses here on the 2nd next()

  return 30; // Finalizes execution
}

// 2. Call the function to get the Generator Object
const gen = numberGenerator();

// 3. Step through the execution
console.log(gen.next()); // Logs: "Start" then { value: 10, done: false }
console.log(gen.next()); // Logs: "Resume" then { value: 20, done: false }
console.log(gen.next()); // Logs: { value: 30, done: true }
```
