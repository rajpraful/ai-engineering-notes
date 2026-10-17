import type { Dirent } from 'node:fs';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export type NavItem = {
  title: string;
  summary?: string;
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

// Drops inline markdown (emphasis, code, links) so the text reads as plain prose.
const toPlainText = (markdown: string) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_]/g, '')
    .trim();

// The note's first `# Heading` is its sidebar label; the folder name is the fallback.
// The paragraph right under it, when there is one, is the topic's one-line summary.
const readNoteMeta = async (dir: string, slug: string) => {
  try {
    const markdown = await readFile(path.join(dir, 'notes.md'), 'utf8');
    // Skips headings, lists, tables, images, quotes and code fences: those aren't a summary.
    const match = markdown.match(/^#\s+(.+)$\s*^((?!```)[^#\-|!>\s].*)?$/m);
    const heading = match?.[1];
    const paragraph = match?.[2];
    return {
      title: heading ? toPlainText(heading) : toTitleCase(slug),
      summary: paragraph ? toPlainText(paragraph) : undefined,
    };
  } catch {
    return { title: toTitleCase(slug), summary: undefined };
  }
};

const compareByTitle = (a: NavItem, b: NavItem) => a.title.localeCompare(b.title);

const isNavigable = (item: NavItem) => item.hasPage || item.children.length > 0;

const readNavItems = async (dir: string, baseHref: string): Promise<NavItem[]> => {
  const entries = await readdir(dir, { withFileTypes: true });

  const toNavItem = async (entry: Dirent): Promise<NavItem> => {
    const folderPath = path.join(dir, entry.name);
    const href = `${baseHref}/${entry.name}`;
    const [{ title, summary }, hasPage, children] = await Promise.all([
      readNoteMeta(folderPath, entry.name),
      hasPageFile(folderPath),
      readNavItems(folderPath, href),
    ]);
    return { title, summary, href, hasPage, children };
  };

  const items = await Promise.all(entries.filter(isTopicFolder).map(toNavItem));
  return items.filter(isNavigable).sort(compareByTitle);
};

export const getNavTree = () => readNavItems(NOTES_DIR, '');
