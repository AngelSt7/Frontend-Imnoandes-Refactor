import { useQuery, keepPreviousData } from "@tanstack/react-query"

interface GetProps {
    functionService: (id: string) => Promise<any>,
    id: string,
    queryKey: string[]
}

export const useGetData = ({
    functionService,
    id,
    queryKey
}: GetProps) => {

    return useQuery({
        queryKey: queryKey,
        queryFn: () => functionService(id.toString()),
        refetchOnWindowFocus: false,
        retry: false,
        placeholderData: keepPreviousData,
        enabled: !!id
    })
}