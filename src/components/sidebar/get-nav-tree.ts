import type { Dirent } from 'node:fs';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export type NavItem = {
  title: string;
  href: string;
  hasPage: boolean;
  children: NavItem[];
};

// Every folder under app/ is a topic; its URL mirrors the folder path.
const NOTES_DIR = path.join(process.cwd(), 'src/app');

const toTitleCase = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

// Skips private (_x), route group ((x)), dynamic ([x]), parallel (@x) and hidden (.x) folders.
const isTopicFolder = (entry: Dirent) => entry.isDirectory() && !/^[_([@.]/.test(entry.name);

const hasPageFile = async (dir: string) => {
  try {
    await access(path.join(dir, 'page.tsx'));
    return true;
  } catch {
    return false;
  }
};

// The note's first `# Heading` is its sidebar label; the folder name is the fallback.
const readTitle = async (dir: string, slug: string) => {
  try {
    const markdown = await readFile(path.join(dir, 'notes.md'), 'utf8');
    const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
    return heading ? heading.replace(/[`*_]/g, '').trim() : toTitleCase(slug);
  } catch {
    return toTitleCase(slug);
  }
};

const compareByTitle = (a: NavItem, b: NavItem) => a.title.localeCompare(b.title);

const isNavigable = (item: NavItem) => item.hasPage || item.children.length > 0;

const readNavItems = async (dir: string, baseHref: string): Promise<NavItem[]> => {
  const entries = await readdir(dir, { withFileTypes: true });

  const toNavItem = async (entry: Dirent): Promise<NavItem> => {
    const folderPath = path.join(dir, entry.name);
    const href = `${baseHref}/${entry.name}`;
    const [title, hasPage, children] = await Promise.all([
      readTitle(folderPath, entry.name),
      hasPageFile(folderPath),
      readNavItems(folderPath, href),
    ]);
    return { title, href, hasPage, children };
  };

  const items = await Promise.all(entries.filter(isTopicFolder).map(toNavItem));
  return items.filter(isNavigable).sort(compareByTitle);
};

export const getNavTree = () => readNavItems(NOTES_DIR, '');
