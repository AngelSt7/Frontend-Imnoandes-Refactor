import { useQuery, keepPreviousData } from "@tanstack/react-query";

interface GetProps<T extends (id?: any) => Promise<any>> {
  functionService: T;
  queryKey: string[];
  id?: Parameters<T>[0];
}

export const useGetData = <T extends (id?: any) => Promise<any>>({
  functionService,
  queryKey,
  id,
}: GetProps<T>) => {
  return useQuery({
    queryKey: id ? [...queryKey, id] : queryKey,
    queryFn: () => (id ? functionService(id) : functionService()),
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
    enabled: id !== undefined ? !!id : true,
  });
};
