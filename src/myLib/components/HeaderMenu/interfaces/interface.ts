import { User } from "@/src/types";

export interface NavLink {
  name: string;
  href: string;
}

export interface HeaderMenuProps {
  routeLogin: string;
  user: User
  bgColor?: string;
  navLinks?: NavLink[];
  menuWidth?: string;
  fadeOnClose?: boolean;
}

export interface DesktopNavigationProps {
  navLinks: NavLink[];
  user?: User
  routeLogin: string
}

export interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export interface MobileMenuOverlayProps {
  showOverlay: boolean;
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export interface MobileMenuPanelProps {
  isMenuOpen: boolean;
  menuWidth: string;
  fadeOnClose: boolean;
  navLinks: NavLink[];
  closeMenu: () => void;
  user?: User
  routeLogin: string
}

export interface MobileMenuHeaderProps {
  closeMenu: () => void;
}

export interface MobileNavigationProps {
  navLinks: NavLink[];
  isMenuOpen: boolean;
  closeMenu: () => void;
  user?: User
  routeLogin: string
}