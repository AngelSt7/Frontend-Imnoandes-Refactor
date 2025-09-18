import { errorHttp } from "@/src/utils/resolves/error"
import { LocationSearch, locationSearchSchema, LocationsSearch, locationsSearchSchema } from "../schemas"

const ROUTES = {
    SEARCH: `location/search`
}

const base = 'http://localhost:4000/api'

export class Location {

    static search = async (search: string): Promise<LocationsSearch | undefined> => {
        try {

            const url = `${base}/${ROUTES.SEARCH}?search=${search}`
            // const res = await fetch(url, { next: { revalidate: 3600 } })
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            const data = await res.json()
            const parsed = locationsSearchSchema.safeParse(data)
            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }

    static list = async (slugs: LocationSearch['slug'][]): Promise<LocationsSearch | undefined> => {
        try {
            if (!slugs || slugs.length === 0) return undefined;
            const url = `${base}/location?slugs=${slugs.join(",")}`;
            // const res = await fetch(url, { next: { revalidate: 3600 } })
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            const data = await res.json()
            const parsed = locationsSearchSchema.safeParse(data)
            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }

}