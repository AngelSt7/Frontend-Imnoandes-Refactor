'use client'

import { useMemo, useState } from "react";
import { useDebounce } from "@/src/hooks/debounce/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UseSearchProps<T> {
  baseKey: string[];
  functionService: (search: any) => Promise<T[] | undefined>
}

export const useSearchLocation = <T,>({
  baseKey,
  functionService
}: UseSearchProps<T>) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const queryKey = useMemo(() => [...baseKey, debouncedSearch], [baseKey, debouncedSearch]);

  const { data: response, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn: () => functionService(debouncedSearch),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
enabled: (debouncedSearch ?? "").length > 0
  });

  const data = response ?? [];

  const showNoResults = debouncedSearch.length > 0 && !isFetching && data.length === 0;

  return {
    search,
    setSearch,
    data,
    isLoading,
    isFetching,
    showNoResults
  };
};
