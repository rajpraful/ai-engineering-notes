'use client';

import { useEffect, useRef, type SubmitEvent, type KeyboardEvent } from 'react';

import { SearchIcon } from '@/components/icons/search-icon';
import { isTypingTarget } from '@/utils/is-typing-target';

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // `/` focuses the search from anywhere, unless the user is already typing in a field.
  useEffect(() => {
    const handleDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    const removeListener = () => document.removeEventListener('keydown', handleDocumentKeyDown);

    document.addEventListener('keydown', handleDocumentKeyDown);
    return removeListener;
  }, []);

  // TODO: wire up search once notes are indexed.
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') event.currentTarget.blur();
  };

  return (
    <form
      role="search"
      aria-label="Search notes"
      onSubmit={handleSubmit}
      className="relative w-full"
    >
      <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <input
        ref={inputRef}
        type="search"
        name="search-query"
        placeholder="Search notes..."
        aria-label="Search notes"
        aria-keyshortcuts="/"
        onKeyDown={handleInputKeyDown}
        className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-foreground/20 h-10 w-full rounded-full border pr-10 pl-9 text-sm outline-none focus:ring-2"
      />
      <kbd className="border-border text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border px-1.5 font-mono text-xs">
        /
      </kbd>
    </form>
  );
};
