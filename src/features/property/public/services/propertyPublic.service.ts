import { errorHttp } from "@/src/utils/resolves/error"
import { SearchFilters } from "../interfaces/search.interface"
import { propertiesSearchSchema } from "../schemas/propertyPublic.schema"

const ROUTES = {
    SEARCH: `property-public/search`
}

const base = 'http://localhost:4000/api'

export class PropertyPublic {

    static search = async (searchFilters: SearchFilters, key?: string) => {
        try {
            if (!searchFilters.hasFilters) return null
            console.log(searchFilters.filters)
            const url = searchFilters.hasFilters
                ? `${base}/${ROUTES.SEARCH}?${searchFilters.filters}`
                : `${base}/${ROUTES.SEARCH}`
            // const res = await fetch(url, { next: { revalidate: 3600 } })
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            const data = await res.json()
            const parsed = propertiesSearchSchema.safeParse(data)
            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }
}