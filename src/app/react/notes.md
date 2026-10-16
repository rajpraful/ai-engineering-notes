# React

How React updates the UI (reconciliation, diffing and Fiber), what changed in React 19, and hydration.

## Topics

- [Hooks](/react/hooks): `useEffect` vs `useLayoutEffect`, `useRef`, `useReducer`, `useMemo`, `useCallback`, Context, `createPortal` and custom hooks
- [Patterns & UI Libraries](/react/patterns): pure components, HOCs, smart/dumb and controlled/uncontrolled components, UI library architecture and ARIA

## Reconciliation

In **reconciliation**, the old tree is compared to the newest version to determine the number of changes needed for updating.

```text
 Old virtual DOM          New virtual DOM            Real DOM
    <div>                    <div>
    ├─ <h1>                  ├─ <h1>
    └─ <p> "Hi"     diff     └─ <p> "Hello"  ──▶  only the <p> text
                   ─────▶                         is updated
```

### The diffing algorithm

React uses a heuristic algorithm called the **Diffing algorithm** for reconciliation, based on these assumptions:

- Elements of different types will produce different trees.
- We can set which elements are static and do not need to be checked (using the `key` prop on list items).

Reference: [Explain how diffing works (Google search)](https://www.google.com/search?q=Explain+how+diffing+works)

## React Fiber

**React Fiber** is the core reconciliation engine introduced in React 16 that completely rewrote how React updates the user interface.

Its primary purpose is to enable **incremental rendering**, allowing React to:

- Split rendering work into smaller chunks.
- Pause or resume tasks.
- Prioritize urgent updates over non-urgent ones.

This keeps modern web applications fluid, responsive, and free of UI freezing during heavy calculations.

## React 19

The recent version, React 19, has a major shift in automating performance and in client and server architectures.

- **React Compiler:** kind of a replacement for `useMemo` and `useCallback`. It memoizes automatically at build time.
- **`use()` hook:** lets you read the value of a resource (specifically Promises or Context) directly during a component's rendering loop.
- **Server Components:** work and are helpful only with frameworks like Next.js. `'use client'` is needed for client-side components.

## Hydration

**Hydration** is the process where client-side JavaScript transforms static, server-rendered HTML into a fully interactive web application by attaching event listeners and establishing state.

```text
Server: renders HTML ──▶ Browser: shows static HTML ──▶ JS loads ──▶ Hydration ──▶ Interactive app
                                (visible, not clickable)              (attach events, state)
```

See also: [What causes a hydration error in Next.js?](/nextjs#questions-to-explore)

## Questions to explore

- How does React decide what to re-render?
- What happens internally when you call `setState`?
- Lazy loading with Suspense
