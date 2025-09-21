'use client'

import Link from "next/link";
import { DesktopNavigationProps } from "../interfaces/interface";
import { ButtonsNav } from "./ButtonsNav";

const transforms = `hover:scale-110 active:hover:scale-125 transition-transform`;

export function DesktopNavigation({ navLinks, user, routeLogin }: DesktopNavigationProps) {
  return (
    <div className="hidden md:flex md:gap-4 md:items-center">
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
      <ButtonsNav user={user} routeLogin={routeLogin} styles="w-fit" />
    </div>
  );
}