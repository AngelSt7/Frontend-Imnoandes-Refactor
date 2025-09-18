'use client'

import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { MobileMenuButtonProps } from "../interfaces/interface";

const transforms = `hover:scale-110 active:hover:scale-125 transition-transform`;

export function MobileMenuButton({ isMenuOpen, toggleMenu }: MobileMenuButtonProps) {
  return (
    <button
      onClick={toggleMenu}
      className={`${transforms} md:hidden w-10 h-10 flex items-center justify-center text-zinc-900`}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? (
        <RiCloseLine className="w-6 h-6" />
      ) : (
        <RiMenuLine className="w-6 h-6" />
      )}
    </button>
  );
}