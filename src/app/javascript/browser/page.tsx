import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Browser & Web APIs | JavaScript | AI Engineering Notes',
};

const BrowserPage = () => {
  return <Notes />;
};

export default BrowserPage;
