'use client'

import { MobileMenuOverlayProps } from "../interfaces/headerMenu.interface";

export function MobileMenuOverlay({ showOverlay, isMenuOpen, closeMenu }: MobileMenuOverlayProps) {
  if (!showOverlay) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={closeMenu}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
    </div>
  );
}