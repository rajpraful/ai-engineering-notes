import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Jest | AI Engineering Notes',
};

const JestPage = () => {
  return <Notes />;
};

export default JestPage;
