import { useQuery, keepPreviousData } from "@tanstack/react-query"

interface GetProps {
    functionService: () => Promise<any>,
    queryKey: string[]
}

export const useGetAllData = ({
    functionService,
    queryKey
}: GetProps) => {

    return useQuery({
        queryKey: queryKey,
        queryFn: () => functionService(),
        refetchOnWindowFocus: false,
        retry: false,
        placeholderData: keepPreviousData
    })
}