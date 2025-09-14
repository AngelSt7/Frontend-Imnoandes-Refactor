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

  const { data: response, isFetching: isLoading } = useQuery({
    queryKey,
    queryFn: () => functionService(debouncedSearch),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    search,
    setSearch,
    data: response ?? [],
    isLoading
  };
};
