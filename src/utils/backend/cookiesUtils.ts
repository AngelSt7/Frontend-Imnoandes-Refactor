import { cookies } from "next/headers"

export const serverGetCookie = async () => {
    const cookie = (await cookies()).get('next-auth.session-token')?.value
    return cookie as string
}