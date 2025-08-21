"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Pagination as PaginationHero } from "@heroui/pagination";
import { PaginationType } from "@/src/types/adminTypes/property";
import { Meta } from "@/src/schema/shared";

type PaginationProps = {
  meta: Meta | undefined,
}

export default function Pagination({ meta }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: PaginationType['page']) => {
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
      total={meta?.totalPages || 1}
      page={currentPage}
      onChange={handlePageChange}
    />
  );
}
