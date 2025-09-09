'use client'

import { useRouter, useSearchParams } from "next/navigation"

const listParams = [
    "id",
    "country",
    "hola",
    "mundo",
    "avion"
]

export default function ButtonParam() {
    const params = useSearchParams()
    const router = useRouter()

    const handleParams = () => {
        const newParams = new URLSearchParams(params)
        const clearParams = Array.from(newParams)
            .filter(([k, __])=> listParams.includes(k))
            .sort(([k], [y]) => k.localeCompare(y))
        const format = Object.fromEntries(clearParams)
    }

    const addParam =  () => {
        const paramsUrl = new URLSearchParams(params.toString())
        paramsUrl.set("zola", "zolaaaaa")
        const clearParams = Array.from(paramsUrl)
            .filter(([k, __])=> listParams.includes(k))
            .sort(([k], [y]) => k.localeCompare(y))
        const format = Object.fromEntries(clearParams)
        
        const newPrams = new URLSearchParams(format)

        router.replace(`?${newPrams.toString()}`)
    }

    const styles = 'bg-zinc-700 p-2 w-fit text-white rounded-full select-none cursor-pointer'

    return (
        <>
            <button 
                onClick={addParam}
                className={styles}
            >
                ViewParams
            </button>

            <button
                onClick={handleParams}
                className={styles}
            >
                HandleParams
            </button>
        </>
    )
}
