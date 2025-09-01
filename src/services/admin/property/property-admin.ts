import api from "@/src/axios/axios"
import nest from "@/src/axios/nest"
import { ApiResponse } from "@/src/components/dashboard/ui/table/TableContent";
import { UseGetFilters } from "@/src/hooks/search/useGetFilters"
import { detailsPropertySchema, findPropertySchema, propertiesListSchema } from "@/src/schema/admin/property/property"
import { FormDataProperty, AdminProperty } from '@/src/types/adminTypes';
import { FormDataImageMain, FormDataImagesGallery } from "@/src/types/image/image";
import { errorHttp } from "@/src/utils/resolves/error"


// corregir rutas
const ROUTES = {
    CHANGE_STATUS: `/property-me/status`,
    CREATE: `/property-me`,
    EDIT: `/property-me/edit`,
    FIND: `/property-me`,
    LIST: `/property-me`,
    DETAILS: `/property-me/me/details`,
    IMAGE_MAIN: `/property-me/image-main`,
    IMAGES_GALLERY: `/property-me/images-gallery`
}

export class PropertyAdmin {

    static create = async (formData: FormDataProperty) => {
        try {
            const url = ROUTES.CREATE
            const { data } = await nest.post(url, formData)
            return data.message;
        } catch (error) { errorHttp(error) }
    }
    
    static async createImageMain(formData: FormDataImageMain) {
        try {
            const url = `${ROUTES.IMAGE_MAIN}`
            const { data } = await nest.post(url, formData)
            return data
        } catch (error) { errorHttp(error) }
    }

    static async createImagesGallery(formData: FormDataImagesGallery) {
        try {
            const url = `${ROUTES.IMAGES_GALLERY}`
            const { data } = await nest.post(url, formData)
            return data
        } catch (error) { errorHttp(error) }
    }

    static list = async (filters: UseGetFilters) : Promise<ApiResponse<AdminProperty> | undefined> => {
        try {
            const url = filters.hasParams 
                ? `${ROUTES.LIST}?${filters.query}` 
                : `${ROUTES.LIST}`
            const { data } = await nest(url)
            const response = propertiesListSchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { errorHttp(error) }
    };

    static find = async (id: AdminProperty['id']) => {
        try {
            const url = `${ROUTES.FIND}/${id}`
            const { data } = await nest(url)
            const response = findPropertySchema.safeParse(data)
            if (response.success) return response.data
        } catch (error) { errorHttp(error) }
    }

    static edit = async (formData: FormDataProperty) => {
        try {
            const { id, ...rest } = formData
            const url = `${ROUTES.EDIT}/${id}`
            const { data } = await api.put(url, rest)
            return data.message;
        } catch (error) { errorHttp(error) }
    }

    static details = async (id: AdminProperty['id']) => {
        try {
            const url = `${ROUTES.DETAILS}/${id}`
            const { data } = await api(url)
            const response = detailsPropertySchema.safeParse(data)
            if (response.success) {
                return response.data
            }
        } catch (error) { errorHttp(error) }
    };

    static changeStatus = async (id: AdminProperty['id']) => {
        try {
            const url = `${ROUTES.CHANGE_STATUS}/${id}`
            const { data } = await api.put(url)
            return data.message;
        } catch (error) { errorHttp(error) }
    }

}