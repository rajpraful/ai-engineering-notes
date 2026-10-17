import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.webp';
import { SearchBar } from '@/components/search-bar';
import { ThemeToggle } from '@/components/theme-toggle';

export const Header = () => {
  return (
    <header className="bg-muted border-border sticky top-0 z-20 flex h-(--header-height) w-full shrink-0 items-center gap-4 border-b px-6">
      <Link href="/" aria-label="AI Engineering Notes home" className="shrink-0">
        <Image src={logo} alt="" width={40} height={40} loading="eager" className="rounded-xl" />
      </Link>
      {/* Auto margins center the search in the space left between the logo and the toggle. */}
      <div className="mx-auto w-full max-w-2xl flex-1">
        <SearchBar />
      </div>
      <ThemeToggle />
    </header>
  );
};
