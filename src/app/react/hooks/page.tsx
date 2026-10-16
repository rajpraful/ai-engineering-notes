import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Hooks | React | AI Engineering Notes',
};

const HooksPage = () => {
  return <Notes />;
};

export default HooksPage;
