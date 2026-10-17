import type { MDXComponents } from 'mdx/types';
import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
import type { ComponentProps } from 'react';

import fineWebPipeline from './fineweb-pipeline.webp';
import inference from './inference.webp';
import neuralNetworkInternals from './neural-network-internals.webp';
import neuralNetworkTraining from './neural-network-training.webp';
import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Pre-training & Tokens | How LLMs Work | AI Engineering Notes',
};

// Relative image paths in notes.md resolve to these static imports.
const noteImages: Record<string, StaticImageData> = {
  './fineweb-pipeline.webp': fineWebPipeline,
  './neural-network-training.webp': neuralNetworkTraining,
  './neural-network-internals.webp': neuralNetworkInternals,
  './inference.webp': inference,
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
      className="h-auto w-full rounded-lg"
    />
  );
};

const components: MDXComponents = {
  img: NoteImage,
};

const PretrainingTokensPage = () => {
  return <Notes components={components} />;
};

export default PretrainingTokensPage;
