import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

// Plugins are referenced by name (not imported) so Turbopack can pass them to its Rust side.
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-pretty-code',
        { theme: { light: 'github-light', dark: 'github-dark' }, keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
