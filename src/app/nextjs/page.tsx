import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Next.js | AI Engineering Notes',
};

const NextjsPage = () => {
  return <Notes />;
};

export default NextjsPage;
