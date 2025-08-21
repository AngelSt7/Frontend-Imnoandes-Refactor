import { ReadonlyURLSearchParams } from "next/navigation";

export interface UseGetFilters {
    query: string,
    hasParams: boolean
}

const validParams = [
    "page",
    "search",
    "currency",
    "property_type",
    "departmentId",
    "provinceId",
    "districtId",
    "availability"
]

export const useGetFilters = () => {

    const getParams = (searchParams: ReadonlyURLSearchParams): UseGetFilters => {
        const filters = Array.from(searchParams)
            .filter(([k, _v]) => validParams.includes(k))
            .sort(([k], [y]) => k.localeCompare(y))
        const query = new URLSearchParams(filters).toString()
        return {
            query,
            hasParams: query.length > 0
        }
    }

    return {
        getParams
    }
}