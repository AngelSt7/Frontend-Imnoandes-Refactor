// components/MobileMenuPanel.tsx
'use client'

import { MobileMenuPanelProps } from "../interfaces/interface";
import { MobileMenuHeader } from "./MobileMenuHeader";
import { MobileNavigation } from "./MobileNavigation";

export function MobileMenuPanel({ 
  isMenuOpen, 
  menuWidth, 
  fadeOnClose, 
  navLinks, 
  closeMenu,
  user,
  routeLogin
}: MobileMenuPanelProps) {
  const getMenuWidth = () => {
    if (menuWidth === 'auto') return 'w-full sm:w-80';
    return 'w-full';
  };

  const getMenuStyle = () => {
    if (menuWidth === 'auto') return {};
    return { width: menuWidth };
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full z-[70] ${getMenuWidth()} flex flex-col bg-white shadow-2xl transform transition-all duration-500 ease-in-out
        ${isMenuOpen
          ? "translate-x-0 opacity-100"
          : fadeOnClose
            ? "translate-x-full opacity-0"
            : "translate-x-full opacity-100"
        }`}
      style={getMenuStyle()}
    >
      <MobileMenuHeader closeMenu={closeMenu} />
      <MobileNavigation 
        navLinks={navLinks} 
        isMenuOpen={isMenuOpen} 
        closeMenu={closeMenu}
        user={user}
        routeLogin={routeLogin}
      />
    </div>
  );
}