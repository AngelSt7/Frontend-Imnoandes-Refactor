'use client'

import { RiAppleLine } from "react-icons/ri";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { MobileMenuOverlay } from "./components/MobileMenuOverlay";
import { MobileMenuPanel } from "./components/MobileMenuPanel";
import { HeaderMenuProps, NavLink } from "./interfaces/interface";
import { useHeaderMenu } from "./hooks/useHeaderMenu";
import { useHideOnScroll } from "../../hooks/content-header/useHideOnScroll";
import { usePathname } from "next/navigation";

const LinksDefault: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export function HeaderMenu({
  bgColor = '#e2ded2',
  navLinks = LinksDefault,
  menuWidth = 'auto',
  fadeOnClose = true
}: HeaderMenuProps) {

  const { isMenuOpen, showOverlay, toggleMenu, closeMenu } = useHeaderMenu();
  const path = usePathname();

  const activeHideOnScroll = path.startsWith('/es/search')

  const color = 'bg-[#f5f5f5]/90'
  const transparent = 'bg-transparent'


  const show = useHideOnScroll();
  const styles_header = `
    sticky top-0 left-0 right-0 p-5
    border border-zinc-600
    backdrop-blur-md backdrop-saturate-150
    ${color} shadow-md  border-b
    ${activeHideOnScroll ? 'border-zinc-300' : 'border-[#333030]/40'}
    transition-all duration-500 ease-in-out z-50
    ${activeHideOnScroll && !show ? '-translate-y-full' : 'translate-y-0'}
  `;

  const transforms = `hover:scale-110 active:hover:scale-125 transition-transform`;

  return (
    <>
      <header className={`${styles_header} flex justify-between items-center`}>
        <RiAppleLine className={`${transforms} w-10 h-10`} />

        <DesktopNavigation navLinks={navLinks} />

        <MobileMenuButton
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </header>

      <MobileMenuOverlay
        showOverlay={showOverlay}
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
      />

      <MobileMenuPanel
        isMenuOpen={isMenuOpen}
        menuWidth={menuWidth}
        fadeOnClose={fadeOnClose}
        navLinks={navLinks}
        closeMenu={closeMenu}
      />
    </>
  );
}