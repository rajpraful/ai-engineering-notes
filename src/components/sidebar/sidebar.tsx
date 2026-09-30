'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type MouseEvent } from 'react';

import { ChevronRightIcon } from '@/components/icons/chevron-right-icon';
import { MenuIcon } from '@/components/icons/menu-icon';
import type { NavItem } from '@/components/sidebar/get-nav-tree';

type SidebarProps = {
  items: NavItem[];
};

const toListId = (href: string) => `sidebar${href.replaceAll('/', '-')}`;

export const Sidebar = ({ items }: SidebarProps) => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Only groups the user has explicitly opened/closed; the rest follow the current URL.
  const [toggledGroups, setToggledGroups] = useState<Record<string, boolean>>({});

  const isInActiveTrail = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const isGroupOpen = (href: string) => toggledGroups[href] ?? isInActiveTrail(href);

  const getLabelClassName = (item: NavItem) => {
    if (pathname === item.href) return 'text-foreground font-medium';
    if (item.children.length > 0 && isGroupOpen(item.href)) return 'text-accent';
    return 'text-muted-foreground hover:text-foreground';
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGroupToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const { href } = event.currentTarget.dataset;
    if (!href) return;
    setToggledGroups({ ...toggledGroups, [href]: !isGroupOpen(href) });
  };

  // Opening a group's own page also expands it, even if it was collapsed by hand.
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const { groupHref } = event.currentTarget.dataset;
    if (groupHref) setToggledGroups({ ...toggledGroups, [groupHref]: true });
    setIsMenuOpen(false);
  };

  const renderLink = (item: NavItem) => {
    const isGroup = item.children.length > 0;
    return (
      <Link
        href={item.href}
        aria-current={pathname === item.href ? 'page' : undefined}
        data-group-href={isGroup ? item.href : undefined}
        onClick={handleLinkClick}
        className={`flex-1 py-1.5 transition-colors ${getLabelClassName(item)}`}
      >
        {item.title}
      </Link>
    );
  };

  const renderGroupToggle = (item: NavItem) => {
    const isOpen = isGroupOpen(item.href);
    return (
      <button
        type="button"
        name="toggle-section"
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.title}`}
        aria-expanded={isOpen}
        aria-controls={toListId(item.href)}
        data-href={item.href}
        onClick={handleGroupToggle}
        className={`hover:text-foreground flex items-center gap-2 py-1.5 transition-colors ${
          item.hasPage ? 'text-muted-foreground' : `flex-1 text-left ${getLabelClassName(item)}`
        }`}
      >
        {!item.hasPage && <span className="flex-1">{item.title}</span>}
        <ChevronRightIcon
          className={`size-4 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
    );
  };

  const renderItem = (item: NavItem) => {
    const isGroup = item.children.length > 0;
    return (
      <li key={item.href}>
        <span className="flex items-center gap-2">
          {item.hasPage && renderLink(item)}
          {isGroup && renderGroupToggle(item)}
        </span>
        {isGroup && isGroupOpen(item.href) && renderItems(item.children, toListId(item.href))}
      </li>
    );
  };

  const renderItems = (navItems: NavItem[], listId?: string) => {
    return (
      <ul
        id={listId}
        className={listId ? 'border-border mt-1 mb-2 ml-1 space-y-0.5 border-l pl-5' : 'space-y-1'}
      >
        {navItems.map(renderItem)}
      </ul>
    );
  };

  return (
    <aside className="border-border lg:sticky lg:top-0 lg:h-dvh lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-r">
      <button
        type="button"
        name="toggle-sidebar"
        aria-label="Toggle notes navigation"
        aria-expanded={isMenuOpen}
        aria-controls="sidebar-nav"
        onClick={handleMenuToggle}
        className="border-border text-muted-foreground hover:text-foreground flex w-full items-center gap-2 border-b px-6 py-3 text-sm lg:hidden"
      >
        <MenuIcon className="size-4" />
        Menu
      </button>
      <nav
        id="sidebar-nav"
        aria-label="Notes"
        className={`${isMenuOpen ? 'block' : 'hidden'} border-border border-b px-6 py-6 text-[15px] lg:block lg:border-b-0`}
      >
        {renderItems(items)}
      </nav>
    </aside>
  );
};
