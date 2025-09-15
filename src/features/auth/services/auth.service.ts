import nest from "@/src/axios/nest";
import { AuthCheckEmail, AuthCompleteAccount, AuthConfirmAccess, AuthCreateAccount, AuthLogin, AuthOtp, AuthRequestToken, AuthToken, RecoverPassword } from "@/src/types";
import { errorHttp } from "@/src/utils/resolves/error";

const ROUTES = {
    CHECK_EMAIL: `/auth/check-email`,
    LOGIN: `/auth/login`,
    CONFIRM_ACCESS: `/auth/confirm-access`,
    CREATE_ACCOUNT: `/auth/create-account`,
    FORGOT_PASSWORD: `/auth/forgot-password`,
    VALIDATE_TOKEN: `/auth/validate-token`,
    RECOVER_PASSWORD: `/auth/recover-password`,
    CONFIRM_ACCOUNT: `/auth/confirm-account`,
    CHECK_TOKEN: `/auth/check-token`,
    REQUEST_TOKEN: `/auth/request-token`,
    COMPLETE_ACCOUNT: `/auth/complete-account`
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
            return data
        } catch (error) { errorHttp(error) }
    }


    // revisar
    static async confirmAccess(FormData: AuthConfirmAccess) {
        try {
            const url = `${ROUTES.CONFIRM_ACCESS}`
            const { data } = await nest.post(url, FormData)
            return data
        } catch (error) { errorHttp(error) }
    }

    static async createAccount(FormData: AuthCreateAccount) {
        try {
            const { repeatPassword: __, ...rest } = FormData
            const url = ROUTES.CREATE_ACCOUNT
            const { data } = await nest.post(url, rest)
            return data;
        } catch (error) { errorHttp(error) }
    }

    static async forgotPassword(FormData: AuthRequestToken) {
        try {
            const url = ROUTES.FORGOT_PASSWORD
            const { data } = await nest.post(url, FormData)
            return data
        } catch (error) { errorHttp(error) }
    };

        static async requestToken(FormData: AuthRequestToken) {
        try {
            const url = ROUTES.REQUEST_TOKEN
            const { data } = await nest.post(url, FormData)
            return data
        } catch (error) { errorHttp(error) }
    };

    static async validateToken(FormData: AuthOtp) {
        try {
            const url = `${ROUTES.VALIDATE_TOKEN}`
            const payload = { otp: FormData.otp }
            const { data } = await nest.post(url, payload, {
                headers: {
                    'x-token': FormData.token
                }
            })
            return data;
        } catch (error) { errorHttp(error) }
    };

    static async recoverPassword(FormData: RecoverPassword) {
        try {
            const { tokenId, ...rest } = FormData
            const url = `${ROUTES.RECOVER_PASSWORD}`
            const { data } = await nest.post(url, rest, {
                headers: {
                    'x-token': tokenId
                }
            })
            return data;
        } catch (error) { errorHttp(error) }
    }

    static async checkToken(FormData: AuthToken) {
        try {
            const url = `${ROUTES.CHECK_TOKEN}`
            const { data } = await nest.post(url, {}, {
                headers: {
                    'x-token': FormData.token
                }
            })
            return data;
        } catch (error) { errorHttp(error) }
    }

    static async confirmAccount(FormData: AuthOtp) {
        try {
            const url = `${ROUTES.CONFIRM_ACCOUNT}`
            const payload = { otp: FormData.otp }
            const { data } = await nest.post(url, payload, {
                headers: {
                    'x-token': FormData.token
                }
            })
            return data;
        } catch (error) { errorHttp(error) }
    }

    static async completeAccount (FormData: AuthCompleteAccount){
        try {
            const url = `${ROUTES.COMPLETE_ACCOUNT}`
            const { data } = await nest.post(url, FormData)
            return data
        }  catch (error) { errorHttp(error) }
    }

}