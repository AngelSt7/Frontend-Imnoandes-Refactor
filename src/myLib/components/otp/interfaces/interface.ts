import { AuthToken } from "@/src/features/auth/schemas"

export interface InputOtpProps {
  serviceFunction: (data: any) => Promise<any>,
  onSuccessCallback?: (data: any) => any,
  token?: AuthToken['token']
}

export interface Payload {
  otp: string,
  token?: AuthToken['token']
}

export interface UseInputOTP {
    serviceFunction: (data: any) => Promise<any>
    onSuccessCallback: ((data: any) => any) | undefined
    token: string | undefined
}