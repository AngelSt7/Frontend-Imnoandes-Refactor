'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useGetFilters } from "./useGetFilters";
import { Meta } from "@/src/schema/shared";
import { useDebounce } from "../debounce/useDebounce";
import { useParams } from "./useParams";

interface ApiResponse<T> {
  data: T[];
  meta: Meta;
}

interface UseSearchProps<T> {
  baseKey: String[];
  functionService: (filters: any) => Promise<ApiResponse<T> | undefined>
}

export const useSearch = <T,>({
  baseKey,
  functionService
}: UseSearchProps<T>) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const { getParam } = useParams()
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

  const queryKey = useMemo(
    () => [...baseKey, filters.query],
    [baseKey, filters]
  );

  const { data: response, isFetching: isLoading } = useQuery({
    queryKey,
    queryFn: () => functionService(filters),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (response?.meta && Number(getParam("page")) > response.meta.totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }
  }, [response?.meta, searchParams, getParam, router]);

  return {
    search,
    setSearch,
    data: response?.data ?? [],
    meta: response?.meta,
    isLoading
  };
};