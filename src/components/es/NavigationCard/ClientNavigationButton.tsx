'use client'

import Link from "next/link";

interface ClientNavigationButtonProps {
    route: string;
}

export default function ClientNavigationButton({ route }: ClientNavigationButtonProps) {
    return (
        <Link
            href={route}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-all group-hover:text-blue-600 group-hover:translate-x-1 inline-flex items-center"
            aria-label="Ir al enlace"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    )
}
