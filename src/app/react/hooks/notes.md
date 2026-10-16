# Hooks

`useEffect` vs `useLayoutEffect`, `useRef`, `useReducer`, `useMemo`, `useCallback`, Context, `createPortal` and custom hooks.

## useEffect vs useLayoutEffect

|              | `useEffect`                                                        | `useLayoutEffect`                                                                          |
| ------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Runs         | **Asynchronously**, after the browser paints changes to the screen | **Synchronously**, after DOM mutations but before the browser paints                       |
| Blocks paint | No, it prevents blocking the page's visual loading                 | Yes                                                                                        |
| Use for      | Almost everything: data fetching, subscriptions, timers            | Only when calculating physical DOM dimensions or positions, to avoid visible UI flickering |

```text
render ──▶ DOM updated ──▶ useLayoutEffect ──▶ browser paints ──▶ useEffect
```

## useRef

`useRef` is just like `useState`, but updating it **doesn't trigger a re-render**.

```jsx
const renderCount = useRef(0);
renderCount.current += 1; // no re-render
```

## useReducer

`useReducer` manages more complex state with a reducer function: you `dispatch` an action, and the reducer returns the next state.

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```

## useMemo

- The syntax is just like `useEffect`.
- It should always **return a value**.
- Used for memoization of complex computing functions.
- It only recalculates when values in the dependency array change.

```jsx
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.price - b.price);
}, [items]);
```

## useCallback

Use it when passing callback functions to optimized child components.

Without it, a parent re-render recreates the function, giving it a new memory address. This tricks child components (wrapped in `React.memo`) into thinking their props changed, forcing a re-render.

```jsx
const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);

return <MemoizedList onSelect={handleSelect} />;
```

> Watch out for [stale closures](/javascript/closures#stale-closures) when a value used inside `useEffect`, `useMemo` or `useCallback` is missing from the dependency array.

## Context

```jsx
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ auth: false, name: null });

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};
```

## createPortal

`createPortal` is a way to render JSX directly into another part of the DOM (outside the component's parent, e.g. `document.body`) from any React component. It's useful for creating a modal/overlay from any point.

```jsx
return createPortal(<Modal />, document.body);
```

## Custom hooks

```jsx
import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 500) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up function: clears the timer if the value or delay changes before the timeout completes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run the effect if value or delay changes

  return debouncedValue;
}
```

See [debouncing in plain JavaScript](/javascript/functions#debouncing).
