import type { MDXComponents } from 'mdx/types';
import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
import type { ComponentProps } from 'react';

import llmOs from './llm-os.webp';
import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'How LLMs Work | AI Engineering Notes',
};

// Relative image paths in notes.md resolve to these static imports.
const noteImages: Record<string, StaticImageData> = {
  './llm-os.webp': llmOs,
};

const NoteImage = ({ src, alt = '' }: ComponentProps<'img'>) => {
  const image = typeof src === 'string' ? noteImages[src] : undefined;

  if (!image) {
    return null;
  }

  return (
    <Image
      src={image}
      alt={alt}
      sizes="(min-width: 1024px) 768px, 100vw"
      className="h-auto w-full"
    />
  );
};

const components: MDXComponents = {
  img: NoteImage,
};

const HowLLMsWorkPage = () => {
  return <Notes components={components} />;
};

export default HowLLMsWorkPage;
