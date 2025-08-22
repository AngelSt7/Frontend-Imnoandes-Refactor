import { useRouter, useSearchParams } from "next/navigation"

export const useParams = () => {
    const searchParmas = useSearchParams()
    const router = useRouter()

    const getParam = (key: string) => searchParmas.get(key)

    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParmas.toString())
        params.set(key, value)
        router.replace(`?${params.toString()}`)
    }

    const deleteParam = (key: string) => {
        const params = new URLSearchParams(searchParmas.toString())
        params.delete(key)
        router.replace(`?${params.toString()}`)
    }

    return {
        setParam,
        deleteParam,
        getParam
    }
}