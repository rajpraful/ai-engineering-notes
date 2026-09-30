'use client';

import { MoonIcon } from '@/components/icons/moon-icon';
import { SunIcon } from '@/components/icons/sun-icon';

type Theme = 'light' | 'dark';

const applyTheme = (theme: Theme) => {
  try {
    localStorage.setItem('theme', theme);
  } catch {}
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

const toggleTheme = () => {
  applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
};

export const ThemeToggle = () => {
  // Both icons are rendered and CSS picks one, so server and client markup always match.
  return (
    <button
      type="button"
      name="theme-toggle"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={toggleTheme}
      className="border-border bg-background text-foreground hover:bg-muted inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors"
    >
      {/* Moon: shown in light mode */}
      <MoonIcon className="size-4 dark:hidden" />
      {/* Sun: shown in dark mode */}
      <SunIcon className="hidden size-4 dark:block" />
    </button>
  );
};
