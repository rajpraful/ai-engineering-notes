# Async JavaScript

Timers, promises, callback hell, the event loop and cancelling requests.

## Timers

| Function        | What it does                                     |
| --------------- | ------------------------------------------------ |
| `setTimeout`    | Runs a function once after a delay               |
| `clearTimeout`  | Cancels a scheduled `setTimeout`                 |
| `setInterval`   | Runs a function repeatedly, every given interval |
| `clearInterval` | Stops a running `setInterval`                    |

## Promises

Reference: [javascript.info/promise-basics](https://javascript.info/promise-basics#loadscript)

A promise is always in one of three states:

```text
                ┌──▶ Fulfilled  (resolve(value))  ──▶ .then()
  Pending ──────┤
                └──▶ Rejected   (reject(error))   ──▶ .catch()

                        both run ──▶ .finally()
```

### Promise combinators

| Method               | Resolves when                                  | Rejects when                        |
| -------------------- | ---------------------------------------------- | ----------------------------------- |
| `Promise.all`        | All promises fulfill                           | Any one promise rejects             |
| `Promise.allSettled` | All promises settle (fulfilled or rejected)    | Never                               |
| `Promise.any`        | The first promise **fulfills**                 | All promises reject                 |
| `Promise.race`       | The first promise **settles**, with its result | The first promise to settle rejects |

The core difference is that `Promise.any()` looks for the first **successful** (fulfilled) promise, while `Promise.race()` looks for the first **completed** (settled) promise, regardless of whether it succeeded or failed.

## Callback hell

**Callback hell**, also known as the "**Pyramid of Doom**", is a situation in JavaScript where multiple callbacks are nested within one another to handle sequential asynchronous operations.

```js
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getOrderDetails(orders[0], (details) => {
      getInvoice(details, (invoice) => {
        // ...and deeper
      });
    });
  });
});
```

Promises and `async`/`await` flatten this into a readable sequence.

## The Event Loop & Task Queues

Macrotasks ▶ microtasks. Each turn of the event loop runs in this order:

1. **Synchronous code (Call Stack)**
2. **Microtasks:** Once the stack is completely empty, the event loop instantly processes the microtask queue. It will completely drain this entire queue, including any new microtasks that get added during this step, before moving forward.
   - e.g. `Promise.then()`, `catch()`, `finally()`, `MutationObserver`, `queueMicrotask()`
3. **DOM Rendering**
4. **Macrotasks:** The event loop picks exactly **one** task from the macrotask queue and pushes it to the call stack to run. After that single task completes, the loop immediately goes back to check the Microtask Queue again.
   - e.g. `setTimeout()`, `setInterval()`, I/O operations, DOM events (clicks/scrolls)

```text
          ┌──────────────────────────────┐
          │ 1. Call Stack (sync code)    │
          └──────────────┬───────────────┘
                         ▼  stack empty
          ┌──────────────────────────────┐
          │ 2. Microtask Queue           │  ◀─ drain ALL
          │    Promise.then, queueMicro… │
          └──────────────┬───────────────┘
                         ▼
          ┌──────────────────────────────┐
          │ 3. DOM Rendering             │
          └──────────────┬───────────────┘
                         ▼
          ┌──────────────────────────────┐
          │ 4. Macrotask Queue           │  ◀─ take ONE
          │    setTimeout, events, I/O   │
          └──────────────┬───────────────┘
                         └──────▶ back to step 2
```

```js
console.log('1');
setTimeout(() => console.log('4'), 0); // macrotask
Promise.resolve().then(() => console.log('3')); // microtask
console.log('2');

// Logs: 1, 2, 3, 4
```

## AbortController

`AbortController` is used for cancelling an HTTP call.

```js
const controller = new AbortController();

fetch('/api/search?q=react', { signal: controller.signal });

controller.abort(); // cancels the request
```
