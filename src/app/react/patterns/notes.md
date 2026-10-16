# Patterns & UI Libraries

Component patterns, how UI libraries are built, and accessible markup with ARIA.

## Component patterns

### Pure components

**Pure Components** are a type of React component that uses the `React.memo` higher-order component.

If the props and state of a Pure Component have not changed, React skips the re-rendering process, improving performance.

```jsx
const UserCard = React.memo(({ name }) => <p>{name}</p>);
```

### Higher-Order Components

A **Higher-Order Component (HOC)** is a function that takes a component as an argument and returns a new, enhanced component.

```jsx
const withLoader =
  (Component) =>
  ({ isLoading, ...props }) =>
    isLoading ? <Spinner /> : <Component {...props} />;

const UserListWithLoader = withLoader(UserList);
```

### Smart vs dumb components

| Smart (container)         | Dumb (presentational)   |
| ------------------------- | ----------------------- |
| Data & logic              | UI only                 |
| Fetches data, holds state | Receives data via props |

### Controlled vs uncontrolled components

- In a **controlled** component, React state acts as the single source of truth for the input's value.
- In an **uncontrolled** component, the DOM itself maintains and handles the input data.

```jsx
// Controlled
<input value={name} onChange={handleNameChange} />

// Uncontrolled
<input ref={nameRef} defaultValue="John" />
```

## UI libraries

### Styled vs headless

- **Styled** UI libraries provide pre-designed visual components with built-in CSS.
- **Headless** UI libraries give you only the functional logic and accessibility, without any visual styles.

### Core architecture

- **Component-based composition:** Built on atomic design principles, where small elements (buttons, inputs) combine into complex patterns (modals, data grids).
- **Headless logic & hooks:** Decouples behavior, state management, and accessibility (ARIA) from the visual layer, offering utility hooks for features like forms and dark mode.
- **Design tokens:** Centralized configuration objects for spacing, typography, colors, and shadows that maintain global theme consistency.

```text
┌──────────────────────────────────────────┐
│ Complex patterns   Modal · DataGrid      │
├──────────────────────────────────────────┤
│ Components         Button · Input        │
├──────────────────────────────────────────┤
│ Headless logic     hooks · state · ARIA  │
├──────────────────────────────────────────┤
│ Design tokens      spacing · type · color│
└──────────────────────────────────────────┘
```

### Configuration-driven design

**Configuration-Driven Design pattern** (or Configurable Component Design): UI libraries like MUI and Mantine have components that handle lots of props to maintain flexibility.

```jsx
<Button variant="outlined" size="small" color="secondary" startIcon={<SaveIcon />}>
  Save
</Button>
```

## ARIA examples

An input with an error message:

```html
<label for="username">Username</label>
<input id="username" type="text" aria-invalid="true" aria-describedby="username-error" />
<span id="username-error">Username must be at least 3 characters.</span>
```

A search form with live results:

```html
<form role="search">
  <label for="search-input">Search products</label>
  <input id="search-input" type="search" name="query" />

  <button type="submit" aria-controls="search-results-container">Search</button>
</form>

<div id="search-results-container" aria-live="polite">
  <!-- Dynamic search results load here -->
</div>
```
