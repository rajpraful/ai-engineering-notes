import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Closures | JavaScript | AI Engineering Notes',
};

const ClosuresPage = () => {
  return <Notes />;
};

export default ClosuresPage;
