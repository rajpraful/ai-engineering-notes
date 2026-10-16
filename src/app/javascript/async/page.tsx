import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Async JavaScript | JavaScript | AI Engineering Notes',
};

const AsyncPage = () => {
  return <Notes />;
};

export default AsyncPage;
