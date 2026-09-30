import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/logo.webp';
import { SearchBar } from '@/components/search-bar';
import { ThemeToggle } from '@/components/theme-toggle';

export const Header = () => {
  return (
    <header className="bg-muted flex w-full items-center gap-4 px-6 py-4">
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
