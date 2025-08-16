import nest from "@/src/axios/nest"
import { errorHttp } from "@/src/utils/resolves/error"
import { cookies } from 'next/headers';

const ROUTES = {
    INFO: `/auth`,
}

export class User {

    static async validate(jwt: string) {
        try {
            const url = ROUTES.INFO;
            const { data } = await nest.get(url, {
                headers: {
                    Cookie: `TEMP=${jwt}`
                }
            });
            return data;
        } catch (error) { errorHttp(error); }
    }
}