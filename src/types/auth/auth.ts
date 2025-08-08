import { z } from "zod";
import { completeAccountSchema, createAccountSchema, forgotPasswordSchema, loginSchema, checkEmailSchema, tokenSchema, recoverPasswordSchema, otpSchema, requestTokenSchema, confirmAccessSchema } from "@/src/schema/auth";

export type AuthLogin = z.infer<typeof loginSchema>
export type AuthCheckEmail = z.infer<typeof checkEmailSchema>
export type AuthToken = z.infer<typeof tokenSchema>
export type AuthConfirmAccess = z.infer<typeof confirmAccessSchema>
export type AuthOtp = z.infer<typeof otpSchema>
export type AuthCreateAccount = z.infer<typeof createAccountSchema>
export type AuthForgotPassword = z.infer<typeof forgotPasswordSchema>
export type RecoverPassword = z.infer<typeof recoverPasswordSchema>
export type AuthRequestToken= z.infer<typeof requestTokenSchema>
export type AuthCompleteAccount = z.infer<typeof completeAccountSchema>