import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'TypeScript | AI Engineering Notes',
};

const TypescriptPage = () => {
  return <Notes />;
};

export default TypescriptPage;
