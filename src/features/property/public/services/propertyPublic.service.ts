import { errorHttp } from "@/src/utils/resolves/error"
import { SearchFilters } from "../interfaces/search.interface"
import { propertiesSearchSchema } from "../schemas/propertyPublic.schema"

const ROUTES = {
    SEARCH: `property-public/search`
}

const base = 'http://localhost:4000/api'

export class PropertyPublic {

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
}