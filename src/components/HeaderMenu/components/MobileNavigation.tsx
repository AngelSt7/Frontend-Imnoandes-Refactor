// components/MobileNavigation.tsx
'use client'

import Link from "next/link";
import { MobileNavigationProps } from "../interfaces/headerMenu.interface";

export function MobileNavigation({ navLinks, isMenuOpen, closeMenu }: MobileNavigationProps) {
  return (
    <nav className="p-6">
      <ul className="space-y-6">
        {navLinks.map((link, index) => (
          <li
            key={link.href}
            className={`transform transition-all duration-300 ${
              isMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
            style={{
              transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
            }}
          >
            <Link
              href={link.href}
              onClick={closeMenu}
              className="block text-2xl font-medium text-zinc-900 hover:text-blue-600 transition-colors py-2 border-b border-transparent hover:border-blue-600"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}