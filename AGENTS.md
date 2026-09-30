<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Code Rules

## Images and icons

1. Never use inline SVG in components or anywhere else in the codebase. The only exception is icon components (see rule 2), which exist to wrap SVG markup.
2. For images in any format:
   - Interactive or themeable icons should be components. Put them in a shared `src/components/icons/` folder, or colocate them with the component if only one component uses them.
   - Illustrations belong to a feature. Use a static import colocated with that feature.
   - Shared images used across features (e.g. the logo) go in `src/assets/` and are used via static import (`import logo from '@/assets/logo.webp'`), for hashed-filename caching, automatic width/height and build-time checks.
   - Only files that must be served at a fixed, unhashed URL (e.g. `robots.txt`, files linked from outside the app) go in `public/`, referenced by path.

## Functions

3. Always use arrow functions.
4. Don't write inline functions (e.g. in JSX props). Declare a named function and pass it by reference.
5. Put a helper function in the `utils` folder only if it is generic, i.e. other components could reasonably reuse it (e.g. date formatting, calculations, DOM checks). If a helper is specific to one component and will only ever be used there, keep it in that component file, even if it doesn't use any component variables.

## Naming

6. Use camelCase for variable and function names.
7. Use PascalCase for React components and TypeScript types/interfaces.

## Component structure

8. Always order code inside a component as follows:
   1. Hooks
   2. `useState`
   3. `useRef`
   4. `useEffect`
   5. Helper functions
   6. Event handlers
   7. Early returns (empty state, loading state, etc.)
   8. Render functions
   9. Main render (return)

## Markup

9. Use semantic HTML tags wherever possible.
10. Avoid unnecessary `div`s.
11. Every form control (`input`, `textarea`, `select`, `button`) must have:
    - a `name` attribute (kebab-case, describing the value, e.g. `name="search-query"`).
    - an accessible name via ARIA: `aria-label`, or `aria-labelledby` when a visible label element exists. Add state attributes where relevant, e.g. `aria-describedby` for help/error text, `aria-invalid`, `aria-required`, `aria-pressed`/`aria-expanded` for toggles.

## Responsiveness

12. The app must be responsive on every device, from mobile to 4K desktops. Make sure all components and pages stay responsive in all states (e.g. open/closed menus, expanded/collapsed sections, empty, loading and error states, long content).
