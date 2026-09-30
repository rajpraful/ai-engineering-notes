// `.md` notes are compiled by @next/mdx, so they import exactly like `.mdx` files.
declare module '*.md' {
  export { default } from '*.mdx';
}
