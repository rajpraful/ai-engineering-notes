import type { Metadata } from 'next';

import Notes from './notes.md';

export const metadata: Metadata = {
  title: 'Objects & Arrays | JavaScript | AI Engineering Notes',
};

const ObjectsAndArraysPage = () => {
  return <Notes />;
};

export default ObjectsAndArraysPage;
