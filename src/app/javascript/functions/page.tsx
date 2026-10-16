import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Functions | JavaScript | AI Engineering Notes',
};

const FunctionsPage = () => {
  return <Notes />;
};

export default FunctionsPage;
