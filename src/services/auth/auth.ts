import nest from "@/src/axios/nest";
import { AuthCheckEmail, AuthLogin, AuthToken } from "@/src/types";
import { errorHttp } from "@/src/utils/resolves/error";

const ROUTES = {
    CHECK_EMAIL: `/auth/check-email`,
    LOGIN: `/auth/login`,
    CONFIRM_ACCESS: `/auth/confirm-access`
}

export class Auth {


    static async checkEmail(FormData: AuthCheckEmail) {
        try {
            const url = ROUTES.CHECK_EMAIL
            const { data } = await nest.post(url, FormData)
            return data
        } catch (error) { errorHttp(error) }
    }

    static async login(FormData: AuthLogin) {
        try {
            const url = ROUTES.LOGIN
            const { data } = await nest.post(url, FormData)
            console.log(data)
            return data
        } catch (error) { errorHttp(error) }
    }

    static async confirmAccess(FormData: AuthToken) {
        try {
            const url = `${ROUTES.CONFIRM_ACCESS}/${FormData.token}`
            const { data } = await nest.post(url)
            return data
        } catch (error) { errorHttp(error) }
    }

}