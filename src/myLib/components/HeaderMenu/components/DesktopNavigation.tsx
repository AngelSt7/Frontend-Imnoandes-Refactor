'use client'

import Link from "next/link";
import { DesktopNavigationProps } from "../interfaces/interface";

const transforms = `hover:scale-110 active:hover:scale-125 transition-transform`;

export function DesktopNavigation({ navLinks }: DesktopNavigationProps) {
  return (
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
  );
}