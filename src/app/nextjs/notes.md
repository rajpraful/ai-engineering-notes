# Next.js

Fonts, images, and the App Router file conventions.

## Fonts

When using Next.js fonts (`next/font`), Next.js downloads font files at **build time** and hosts them with your other static assets. No requests are sent to Google by the browser.

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

## The `<Image>` component

The `<Image>` component is an extension of the HTML `<img>` tag, and comes with automatic image optimization, such as:

- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like WebP and AVIF, when the browser supports it.

See also: [ways to optimize images in an app](/system-design#ways-to-optimize-images-in-an-app).

## App Router vs Pages Router

| Pages Router                   | App Router                                                          |
| ------------------------------ | ------------------------------------------------------------------- |
| `pages/about/index.tsx`        | `app/about/page.tsx` and `layout.tsx` instead of `index.tsx`        |
| `_document.tsx` and `_app.tsx` | No `_document.ts` and `_app.ts` (replaced by the root `layout.tsx`) |
| Custom handling                | `loading.tsx`, `error.tsx` and `not-found.tsx`                      |

```text
app/
├── layout.tsx       shared UI (replaces _app and _document)
├── page.tsx         the route's UI (replaces index.tsx)
├── loading.tsx      shown while the page loads
├── error.tsx        shown when the page throws
├── not-found.tsx    shown for 404s
└── about/
    └── page.tsx     /about
```

## Authentication

- `next-auth`

## Questions to explore

- What exactly causes a hydration error in Next.js? (see [hydration](/react#hydration))
