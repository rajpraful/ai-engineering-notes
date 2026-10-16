import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'React | AI Engineering Notes',
};

const ReactPage = () => {
  return <Notes />;
};

export default ReactPage;
