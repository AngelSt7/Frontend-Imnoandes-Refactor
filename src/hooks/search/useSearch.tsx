'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UseGetFilters, useGetFilters } from "./useGetFilters";
import { Meta } from "@/src/schema/shared";
import { useDebounce } from "../debounce/useDebounce";

interface ApiResponse<T> {
  data: T[];
  meta: Meta;
}

interface UseSearchProps<T> {
  baseKey: string;
  functionService: (filters: UseGetFilters) => Promise<ApiResponse<T> | undefined>;
}

export const useSearch = <T,>({
  baseKey,
  functionService
}: UseSearchProps<T>) => {

  const segment = baseKey ?? "key";
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getParams } = useGetFilters()

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const filters = useMemo(() => getParams(searchParams), [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [debouncedSearch]);

  const queryKey = useMemo(() => [baseKey, filters.query], [segment, filters]);

  const { data: response, isFetching: isLoading } = useQuery({
    queryKey,
    queryFn: () => functionService(filters),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    search,
    setSearch,
    page: filters,
    router,
    data: response?.data ?? [],
    meta: response?.meta,
    isLoading,
    filters,
  };
};
