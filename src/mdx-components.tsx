import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentProps } from 'react';

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const MarkdownLink = ({ href = '', children, ...props }: ComponentProps<'a'>) => {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

const components: MDXComponents = {
  a: MarkdownLink,
};

// Required by @next/mdx: supplies the components every .md/.mdx file renders with.
export const useMDXComponents = (): MDXComponents => {
  return components;
};
