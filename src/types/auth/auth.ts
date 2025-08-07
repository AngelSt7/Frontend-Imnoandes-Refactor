import { z } from "zod";
import { authCompleteAccountSchema, createAccountSchema, forgotPasswordSchema, loginSchema, authRequestTokenSchema, authUpdatePasswordSchema, checkEmailSchema, tokenSchema } from "@/src/schema/auth";

export type AuthCompleteAccount = z.infer<typeof authCompleteAccountSchema>
export type AuthRequestToken= z.infer<typeof authRequestTokenSchema>
export type AuthUpdatePassword= z.infer<typeof authUpdatePasswordSchema>


//ready
export type AuthLogin = z.infer<typeof loginSchema>
export type AuthCheckEmail = z.infer<typeof checkEmailSchema>
export type AuthToken = z.infer<typeof tokenSchema>
export type AuthCreateAccount = z.infer<typeof createAccountSchema>

export type AuthForgotPassword = z.infer<typeof forgotPasswordSchema>