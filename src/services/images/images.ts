import nest from "@/src/axios/nest";
import { FormDataImage, FormDataImageMain } from "@/src/types/image/image";
import { errorHttp } from "@/src/utils/resolves/error";

const ROUTES = {
    CREATE: `/images/create`,
}

export class Image {

    static async create({ formData, type }: FormDataImage) {
        try {
            const url = `${ROUTES.CREATE}/${type}`
            const { data } = await nest.post(url, formData)
            return data
        } catch (error) { errorHttp(error) }
    }


}