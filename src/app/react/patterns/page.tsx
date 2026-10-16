import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Patterns & UI Libraries | React | AI Engineering Notes',
};

const PatternsPage = () => {
  return <Notes />;
};

export default PatternsPage;
