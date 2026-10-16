# JavaScript

How JavaScript runs, and the tooling that gets modern code into every browser.

## Topics

- [Basics](/javascript/basics): variables, data types, conversions, operators and numbers
- [Objects & Arrays](/javascript/objects-and-arrays): object keys, array methods, classes and Proxy
- [Functions](/javascript/functions): recursion, `call`/`apply`/`bind`, currying, pure functions, memoization, debounce, throttle and generators
- [Closures](/javascript/closures): lexical environment, scope, hoisting, the Temporal Dead Zone and stale closures
- [Async JavaScript](/javascript/async): timers, promises, callback hell and the event loop
- [Browser & Web APIs](/javascript/browser): rendering, DOM events, observers, storage, workers and HTTP

## JavaScript engines

JavaScript virtual machines (**V8**, **SpiderMonkey**, **Chakra**) run the code. V8 is also what exists inside Node.js.

A JavaScript engine executes code through three primary phases:

```text
Source code ──▶ Parsing ──▶ Compilation (JIT) ──▶ Execution
```

## The runtime

A standard JavaScript runtime (like a web browser or Node.js) consists of several moving parts:

- **The Engine:** Compiles and executes the source code. Examples include Google's V8 (used in Chrome and Node.js) and Apple's JavaScriptCore (used in Safari).
- **Memory Heap:** An unstructured memory pool used for allocating memory to objects and variables.
- **Call Stack:** Tracks the execution of functions line-by-line using a single thread.
- **Environment APIs:** Extra capabilities provided by the host environment. Browsers offer Web APIs (like the DOM and `fetch`), while Node.js offers server-side file management systems.
- **Event Loop and Callback Queue:** Handles asynchronous tasks (like API requests) so the single-threaded language doesn't freeze up while waiting for data. See [the event loop](/javascript/async#the-event-loop--task-queues).

```text
┌──────────────── JavaScript runtime ────────────────┐
│  ┌─────────── Engine (V8) ───────────┐             │
│  │  Memory Heap        Call Stack    │  Web APIs / │
│  │  (objects, vars)    (one thread)  │  Node APIs  │
│  └───────────────────────────────────┘      │      │
│           ▲                                 ▼      │
│           └──── Event Loop ◀── Callback Queue      │
└────────────────────────────────────────────────────┘
```

## Transpilers

A **transpiler** is a special piece of software that translates source code to another source code. It can parse ("read and understand") modern code and rewrite it using older syntax constructs, so that it'll also work in outdated engines.

- **Babel** is one of the most prominent transpilers out there.
- Modern project build systems, such as **webpack**, provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.
- **Vite** is a new and popular builder which handles Babel and webpack tasks.

## Polyfills

A **polyfill** is a piece of code (usually JavaScript) used to provide modern functionality on older browsers or environments that do not natively support those features.

Polyfills like `Array.prototype.map` are written in function style (not arrow functions) so they can access the `this` keyword, which points to the array the method was called on.

```js
if (!Array.prototype.map) {
  Array.prototype.map = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };
}
```

## Further reading

- [How a JavaScript engine works (Google AI mode)](https://share.google/aimode/nGidxj4RkoXyfbI6C)
- [javascript.info](https://javascript.info)
