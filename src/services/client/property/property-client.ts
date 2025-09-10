import api from "@/src/axios/axios";
import { cardsSchema, carrouselSchema, findPropertySchema } from "@/src/schema/public";
import { errorHttp } from "@/src/utils/resolves/error";
import nest from "@/src/axios/nest";

const ROUTES = {
    CARROUSEL: `property-public/carrousel`,
    CARD: `/property/card`,
    LIST: `/property/public`,
    FIND: `/property/public`,
    DETAILS: `/property/me/details`
}

const base = 'http://localhost:4000/api'


export class PropertyClient {

    static carrousel = async (type: string = 'SALE') => {
        try {
            const url = `${base}/${ROUTES.CARROUSEL}?propertyType=${type}`
            // const res = await fetch(url, { next: { revalidate: 3600 } })
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
            const data = await res.json()
            const parsed = carrouselSchema.safeParse(data)
            if (parsed.success) { return parsed.data }
        } catch (error) { errorHttp(error) }
    }

    static list = async (extra?: string) => {
        try {
            const url = `${ROUTES.CARD}/3/0?init=true&${extra}`
            const { data } = await api(url)
            const response = cardsSchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { errorHttp(error) }
    }

    static find = async (id: PublicPropertyById['id']) => {
        try {
            const url = `${ROUTES.FIND}/${id}`
            const { data } = await api(url)
            const response = findPropertySchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { errorHttp(error) }
    }

}