import type { MDXComponents } from 'mdx/types';
import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
import type { ComponentProps } from 'react';

import bffMicroservices from './bff-microservices.webp';
import buildPipeline from './build-pipeline.webp';
import imageOptimization from './image-optimization.webp';
import isr from './isr.webp';
import mvcFlow from './mvc-flow.webp';
import mvcScorecard from './mvc-scorecard.webp';
import Notes from './notes.md';
import ssg from './ssg.webp';
import ssr from './ssr.webp';

export const metadata: Metadata = {
  title: 'System Design | AI Engineering Notes',
};

// Relative image paths in notes.md resolve to these static imports.
const noteImages: Record<string, StaticImageData> = {
  './build-pipeline.webp': buildPipeline,
  './image-optimization.webp': imageOptimization,
  './mvc-flow.webp': mvcFlow,
  './mvc-scorecard.webp': mvcScorecard,
  './bff-microservices.webp': bffMicroservices,
  './ssg.webp': ssg,
  './isr.webp': isr,
  './ssr.webp': ssr,
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

const SystemDesignPage = () => {
  return <Notes components={components} />;
};

export default SystemDesignPage;
