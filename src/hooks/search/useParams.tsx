import { useRouter, useSearchParams } from "next/navigation"

export const useParams = () => {
    const searchParmas = useSearchParams()
    const router = useRouter()

    const getParam = (key: string) => searchParmas.get(key)

    const setParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParmas.toString())
        params.set(key, value)
        console.log("agregando", key, value)
        router.replace(`?${params.toString()}`)
    }

    const deleteParam = (key: string) => {
        const params = new URLSearchParams(searchParmas.toString())
        params.delete(key)
        router.replace(`?${params.toString()}`)
    }

    const clearParams = () => {
        const params = new URLSearchParams(searchParmas.toString())
        const exclude = ["page", "limit"]

        Array.from(params.keys()).forEach(k => {
            if(!exclude.includes(k)){
                params.delete(k)
            }
        })

        router.replace(`?${params.toString()}`)
    }

    return {
        setParam,
        deleteParam,
        getParam,
        clearParams
    }
}