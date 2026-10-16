# Browser & Web APIs

How the browser renders a page, how DOM events travel, and the browser APIs for observers, messaging, storage, background threads and HTTP.

## Critical rendering path

The steps the browser takes to turn HTML, CSS and JS into pixels on the screen:

1. **DOM creation:** The browser reads incoming HTML bytes and builds a tree of nodes.
2. **CSSOM creation:** The browser parses style sheets to create the CSS object model, which blocks rendering until ready.
3. **Render tree:** The DOM and CSSOM join together to map out only the visible elements.
4. **Layout and paint:** The browser calculates element sizes and positions, then fills in the pixels.

```text
HTML ──▶ DOM ────┐
                 ├──▶ Render Tree ──▶ Layout ──▶ Paint
CSS ───▶ CSSOM ──┘                    (reflow)   (repaint)
```

## Reflow vs repaint

- **Reflow** is the process where the browser calculates the geometric positions and dimensions of elements on a page.
- **Repaint** is the subsequent process of drawing the actual pixels to the screen.

Changing `width` or `top` causes a reflow (and then a repaint). Changing only `color` or `background` causes just a repaint, which is cheaper.

## Event bubbling and capturing

According to the standard W3C architecture, every DOM event travels in a specific lifecycle:

1. **Capturing phase (trickling):** The event starts at the top of the DOM tree (the `window` and `document` object) and travels downward through ancestor elements until it reaches the specific element that triggered the action. To listen in this phase, pass `true` as the third argument of `addEventListener`.
2. **Target phase:** The event reaches the actual innermost target element that you interacted with.
3. **Bubbling phase:** The event reverses direction, traveling back upward from the target element through all its ancestor layers until it reaches the root again.

```text
            window
              │  ▲
   1. Capture │  │ 3. Bubble
              ▼  │
           document
              │  ▲
              ▼  │
            <ul>
              │  ▲
              ▼  │
            <li>  ◀── 2. Target (the element that was clicked)
```

```js
// Capturing: third argument is true
parent.addEventListener('click', handler, true);
```

## Event delegation

**Event delegation** is a JavaScript design pattern where you attach a single event listener to a parent element to manage events for multiple child elements.

This technique relies on event bubbling, meaning an event triggered on an inner element automatically propagates up the DOM tree to its ancestors. Instead of writing dozens of event listeners, you let the parent catch the bubbled event and inspect `event.target` to pinpoint exactly which child was interacted with.

```js
document.querySelector('#todo-list').addEventListener('click', (event) => {
  if (event.target.matches('li')) {
    event.target.classList.toggle('done');
  }
});
```

## Observers

| API                    | Watches for                                                      | Typical use                                |
| ---------------------- | ---------------------------------------------------------------- | ------------------------------------------ |
| `IntersectionObserver` | An element entering or leaving the viewport (or another element) | Lazy loading images, infinite scroll       |
| `MutationObserver`     | Changes to the DOM tree (added/removed nodes, attribute changes) | Reacting to DOM changes made by other code |

## BroadcastChannel

The **BroadcastChannel** API allows tabs, window popups, and iframes from the **same origin** to send messages directly to each other using `postMessage` and `onmessage`.

```js
const channel = new BroadcastChannel('auth');

// Tab A
channel.postMessage({ type: 'logout' });

// Tab B
channel.onmessage = (event) => {
  if (event.data.type === 'logout') logOut();
};
```

## Storage

| Storage          | Lifetime                                     | Sent to server?         | Notes                                            |
| ---------------- | -------------------------------------------- | ----------------------- | ------------------------------------------------ |
| `localStorage`   | Until cleared                                | No                      | Synchronous key/value strings                    |
| `sessionStorage` | Until the tab is closed                      | No                      | Scoped to one tab                                |
| Cookies          | Set with `Max-Age`/`Expires`, or the session | Yes, with every request | `HttpOnly` cookies can't be read from JS         |
| IndexedDB        | Until cleared                                | No                      | Asynchronous database for large, structured data |

Cookie attributes to remember:

- **`Max-Age`:** how many seconds the cookie lives.
- **`HttpOnly`:** JavaScript can't read the cookie (`document.cookie`), which protects it from XSS.

## Web Workers

**Web Workers** are a browser API that allows you to run JavaScript code in background threads. By moving heavy computations off the single-threaded main execution thread, Web Workers keep the user interface completely responsive and fluid.

## Service Workers

A **Service Worker** is a specialized type of web worker that acts as a programmable proxy server sitting between your web application, the browser, and the network. It is essential for PWAs (Progressive Web Apps).

```text
Web App ◀──▶ Service Worker ◀──▶ Network
                   │
                   ▼
                 Cache   (offline support)
```

## Virtualization

**Virtualization** (or windowing) in React is a performance optimization technique that renders only the items currently visible in the user's viewport.

```text
 10,000 items in the list
┌──────────────────────┐
│ item 1  … item 4,999 │  not rendered
├──────────────────────┤
│ item 5,000           │ ┐
│ item 5,001           │ │ viewport: only these
│ item 5,002           │ │ are in the DOM
│ item 5,003           │ ┘
├──────────────────────┤
│ item 5,004 … 10,000  │  not rendered
└──────────────────────┘
```

## HTTP

- **HTTP** = HyperText Transfer Protocol
- **HTTPS** = HyperText Transfer Protocol Secure
- **SSL** = Secure Sockets Layer
- **TLS** = Transport Layer Security

HTTPS is HTTP encrypted with TLS (the successor of SSL).

### Client error status codes

| Code | Name         | Meaning                                                                                                                                       |
| ---- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request  | The server cannot process the request because it is malformed (e.g., broken JSON syntax or missing required structural fields).               |
| 401  | Unauthorized | Semantically means **unauthenticated**. The client must provide valid authentication credentials (like a token or API key) to get a response. |
| 403  | Forbidden    | The client's identity is known, but they do not have the required permissions or scopes to access the resource.                               |
| 404  | Not Found    | The requested resource or endpoint does not exist on the server.                                                                              |

To cancel an HTTP call, use [`AbortController`](/javascript/async#abortcontroller).
