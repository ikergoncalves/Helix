export interface NavItem {
  href: string;
  label: string;
}

/** Primary navigation, shared by the desktop sidebar and the mobile header. */
export const NAV_ITEMS: NavItem[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/settings', label: 'Settings' },
];
