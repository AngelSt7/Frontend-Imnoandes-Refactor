import { errorHttp } from "@/src/utils/resolves/error"
import { SearchFilters } from "../interfaces/search.interface"
import { propertiesSearchSchema, propertySchema } from "../schemas/propertyPublic.schema"
import { carrouselSchema } from "@/src/schema/public"

const ROUTES = {
    CARROUSEL: `property-public/carrousel`,
    SEARCH: `property-public/search`
}

const base = 'http://localhost:4000/api'

export class PropertyPublic {


    static carrousel = async (type: string = 'SALE', quantity: number = 3) => {
        try {
            const url = `${base}/${ROUTES.CARROUSEL}?propertyType=${type}&quantity=${quantity}`
            // const res = await fetch(url, { next: { revalidate: 3600 } })
            const res = await fetch(url)
            console.log(url)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            const data = await res.json()
            const parsed = carrouselSchema.safeParse(data)
            console.log(parsed.error)
            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }

    static search = async (searchFilters: SearchFilters) => {
        try {
            if (!searchFilters.hasFilters) return null
            const url = searchFilters.hasFilters
                ? `${base}/${ROUTES.SEARCH}?${searchFilters.filters}`
                : `${base}/${ROUTES.SEARCH}`
            // const res = await fetch(url, { next: { tags: ["properties", searchFilters.tag] , revalidate: 300 } })
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            const data = await res.json()
            const parsed = propertiesSearchSchema.safeParse(data)
            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }

    static find = async (id: string) => {
        try {
            const url = `${base}/property-public/${id}`
            const res = await fetch(url, { next: { tags: [id], revalidate: 3600 } })
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            const data = await res.json()
            const parsed = propertySchema.safeParse(data)
            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }
}