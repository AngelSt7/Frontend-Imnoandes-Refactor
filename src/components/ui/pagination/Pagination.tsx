"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Pagination as PaginationHero } from "@heroui/pagination";

type PaginationProps = {
    total: number,
    page: number,
    take: number
}

export default function Pagination({ total }: Pick<PaginationProps, 'total'>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: PaginationProps['page']) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <PaginationHero
            size="sm"
            isCompact
            color="warning"
            loop
            showControls
            total={total}
            page={currentPage}
            onChange={handlePageChange}
        />
    );
}
