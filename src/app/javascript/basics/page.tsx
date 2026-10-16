import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Basics | JavaScript | AI Engineering Notes',
};

const BasicsPage = () => {
  return <Notes />;
};

export default BasicsPage;
