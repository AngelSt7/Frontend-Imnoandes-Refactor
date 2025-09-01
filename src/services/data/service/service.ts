import nest from "@/src/axios/nest"
import { errorHttp } from "@/src/utils/resolves/error"
import { mapToSelectData } from "@/src/utils/resolves/format/mapToSelect"

const ROUTES = {
    LIST: `/service`
}

export class Service {
    static async list() {
        try {
            console.log('Listando servicios')
            const url = `${ROUTES.LIST}`
            const { data } = await nest.get(url)
            console.log(data)
            const service = mapToSelectData('service').safeParse(data)
            if(service.success) return service.data
        } catch (error) { errorHttp(error) }
    }
}