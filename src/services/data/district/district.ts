import nest from "@/src/axios/nest";
import { errorHttp } from "@/src/utils/resolves/error";
import { mapToSelectData } from "@/src/utils/resolves/format/mapToSelect";

const ROUTES = {
    LIST_TO_ID: `/district`
}

export class District {
    static async list(id: string) {
        try {
            const url = `${ROUTES.LIST_TO_ID}/${id}`
            const { data } = await nest.get(url)
            const prepared = mapToSelectData('district').safeParse(data)
            if (prepared.success) return prepared.data
        } catch (error) { errorHttp(error); }
    }
}