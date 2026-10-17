import Link from 'next/link';

import { getNavTree, type NavItem } from '@/components/sidebar/get-nav-tree';

type Track = {
  id: string;
  title: string;
  description: string;
  topics: NavItem[];
};

// Top-level topics that belong to the AI track; every other topic is a frontend foundation.
const aiTopicHrefs = new Set(['/how-llms-work']);

// Update this when you move on to a new note.
const currentlyLearningHref = '/how-llms-work/pre-training-tokens';

const isAiTopic = (item: NavItem) => aiTopicHrefs.has(item.href);

const isFrontendTopic = (item: NavItem) => !isAiTopic(item);

const findNavItem = (items: NavItem[], href: string): NavItem | undefined => {
  for (const item of items) {
    if (item.href === href) return item;
    const match = findNavItem(item.children, href);
    if (match) return match;
  }
  return undefined;
};

const hasTopics = (track: Track) => track.topics.length > 0;

export const Welcome = async () => {
  const navItems = await getNavTree();

  const currentlyLearning = findNavItem(navItems, currentlyLearningHref);

  const tracks: Track[] = [
    {
      id: 'frontend-track',
      title: 'Frontend Foundations',
      description: "Where I've spent the last 8 years: JavaScript, React and the web platform.",
      topics: navItems.filter(isFrontendTopic),
    },
    {
      id: 'ai-track',
      title: 'AI Engineering',
      description: "Where I'm heading: how LLMs work and how to build with them.",
      topics: navItems.filter(isAiTopic),
    },
  ].filter(hasTopics);

  const renderSubtopic = (item: NavItem) => {
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 inline-block rounded-full border px-3 py-1 text-xs transition-colors"
        >
          {item.title}
        </Link>
      </li>
    );
  };

  const renderTopicTitle = (item: NavItem) => {
    if (!item.hasPage) return item.title;
    return (
      <Link href={item.href} className="hover:text-accent transition-colors">
        {item.title}
      </Link>
    );
  };

  const renderTopic = (item: NavItem) => {
    return (
      <li key={item.href} className="border-border flex flex-col gap-3 rounded-xl border p-5">
        <h3 className="text-foreground text-base font-semibold">{renderTopicTitle(item)}</h3>
        {item.summary && (
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {item.summary}
          </p>
        )}
        {item.children.length > 0 && (
          <ul aria-label={`${item.title} subtopics`} className="mt-auto flex flex-wrap gap-2">
            {item.children.map(renderSubtopic)}
          </ul>
        )}
      </li>
    );
  };

  const renderTrack = (track: Track) => {
    return (
      <section key={track.id} aria-labelledby={track.id}>
        <h2 id={track.id}>{track.title}</h2>
        <p>{track.description}</p>
        <ul className="not-prose grid gap-4 sm:grid-cols-2">{track.topics.map(renderTopic)}</ul>
      </section>
    );
  };

  const renderCurrentlyLearning = () => {
    if (!currentlyLearning) return null;
    return (
      <p className="not-prose border-border bg-muted my-8 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-lg border px-4 py-3 text-sm">
        <strong className="text-muted-foreground font-medium">Currently learning:</strong>
        <Link
          href={currentlyLearning.href}
          className="text-accent font-medium underline-offset-4 hover:underline"
        >
          {currentlyLearning.title}
        </Link>
      </p>
    );
  };

  return (
    <section aria-labelledby="welcome-heading">
      <h1 id="welcome-heading">
        AI Engineering Notes <br />{' '}
        <span className="text-muted-foreground text-[16px]">
          Learn. Document. Revise. Build. Repeat.
        </span>
      </h1>
      <p className="lead">
        Welcome to my personal engineering knowledge base — a space where I document what I’ve
        learned, strengthen my fundamentals, and prepare for the challenges ahead.
      </p>
      <p>
        I’m a Frontend Engineer with 8 years of experience, specializing in JavaScript, TypeScript,
        React, and modern frontend development. Over the years, I’ve also gained experience in
        building products, solving real-world problems, and working with teams.
      </p>
      <p>
        This space started as a way to organize my frontend knowledge and prepare for technical
        interviews. It’s now evolving into something bigger.
      </p>
      <p>
        My goal is to expand beyond frontend development and become a{' '}
        <strong>Full-Stack AI Engineer</strong>. As I progress, I’m documenting concepts across
        backend development, databases, system design, AI engineering, and everything else I learn
        along the way.
      </p>
      <p>
        Think of this as my second brain for engineering — a practical, continuously evolving
        resource for revisiting concepts, connecting ideas, preparing for interviews, and turning
        knowledge into real-world skills.
      </p>
      {renderCurrentlyLearning()}
      {tracks.map(renderTrack)}
      <section aria-labelledby="how-to-use-heading">
        <h2 id="how-to-use-heading">How to use these notes</h2>
        <p>
          I write these for myself first, but they’re open to anyone. If you’re preparing for a
          frontend interview or making a similar move into AI engineering, feel free to use them.
        </p>
        <ul>
          <li>
            Press <kbd>/</kbd> anywhere to search all notes.
          </li>
          <li>
            Browse topics from the sidebar, or the <strong>Menu</strong> button on smaller screens.
          </li>
          <li>
            Notes are short and built for revision: diagrams, comparison tables, code snippets and
            “keywords to remember” lists.
          </li>
          <li>They’re a work in progress, so some are unfinished and some may have mistakes.</li>
        </ul>
      </section>
    </section>
  );
};
