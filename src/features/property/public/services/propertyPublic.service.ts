import { errorHttp } from "@/src/utils/resolves/error"
import { SearchFilters } from "../interfaces/search.interface"
import { propertiesSearchSchema, propertySearchSchema } from "../schemas/propertyPublic.schema"

const ROUTES = {
    CARROUSEL: `property-public/carrousel`,
    CARD: `/property/card`,
    LIST: `/property/public`,
    FIND: `/property/public`,
    SEARCH: `property-public/search`
}

const base = 'http://localhost:4000/api'

export class PropertyPublic {

    static search = async (searchFilters: SearchFilters, key?: string) => {
        try {
            const url = searchFilters.hasFilters
                ? `${base}/${ROUTES.SEARCH}?${searchFilters.filters}`
                : `${base}/${ROUTES.SEARCH}`
            // const res = await fetch(url, { next: { revalidate: 3600 } })
            const res = await fetch(url)
            console.log(url)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
                const data = await res.json()
            const parsed = propertiesSearchSchema.safeParse(data)
            console.log(parsed.data)

            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }
}