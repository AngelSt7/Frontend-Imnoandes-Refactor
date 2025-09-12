'use client'

import { useState } from "react";
import Link from "next/link";
import { RiAppleLine, RiMenuLine, RiCloseLine } from "react-icons/ri";

interface HeaderMenuProps {
  bgColor?: string
  navLinks?: { name: string, href: string }[]
  menuWidth?: string
  fadeOnClose?: boolean
}

const LinksDefault = [
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setShowOverlay(true);
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
      setTimeout(() => setShowOverlay(false), 500);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setShowOverlay(false), 500);
  };

  const styles_header = `sticky top-0 left-0 right-0 z-50 p-5 border border-zinc-600 backdrop-blur-md backdrop-saturate-150 bg-[${bgColor}]/10 shadow-md border-b border-[${bgColor}]/20`;
  const transforms = `hover:scale-110 active:hover:scale-125 transition-transform`;

  const getMenuWidth = () => {
    if (menuWidth === 'auto') return 'w-full sm:w-80';
    return 'w-full';
  };

  const getMenuStyle = () => {
    if (menuWidth === 'auto') return {};
    return { width: menuWidth };
  };

  return (
    <>
      <header className={`${styles_header} flex justify-between items-center`}>
        <RiAppleLine className={`${transforms} w-10 h-10`} />

        <div className="hidden md:block">
          <ul className="flex gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className={`${transforms} text-zinc-900 font-medium hover:underline`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
      </header>

      {showOverlay && (
        <div
          className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMenu}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      <div
        className={`fixed top-0 right-0 h-full z-[70] ${getMenuWidth()} bg-white shadow-2xl transform transition-all duration-500 ease-in-out
          ${isMenuOpen
            ? "translate-x-0 opacity-100"
            : fadeOnClose
              ? "translate-x-full opacity-0"
              : "translate-x-full opacity-100"
          }`}
        style={getMenuStyle()}
      >

        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <RiAppleLine className="w-8 h-8 text-zinc-900" />
          <button
            onClick={closeMenu}
            className="w-10 h-10 flex items-center justify-center text-zinc-900 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

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
      </div>
    </>
  );
}
