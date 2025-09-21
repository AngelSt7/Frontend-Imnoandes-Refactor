'use client'

import { RiCloseLine } from "react-icons/ri";
import { MobileMenuHeaderProps } from "../interfaces/interface";
import { LogoImnoandes } from "./LogoImnoandes";

export function MobileMenuHeader({ closeMenu }: MobileMenuHeaderProps) {
  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-200">
      <LogoImnoandes />
      <button
        onClick={closeMenu}
        className="w-10 h-10 flex items-center justify-center text-zinc-900 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close menu"
      >
        <RiCloseLine className="w-6 h-6" />
      </button>
    </div>
  );
}