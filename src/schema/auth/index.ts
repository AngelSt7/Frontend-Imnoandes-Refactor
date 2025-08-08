import z from 'zod'

export const authCreateAccountGoogleSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  authProvider: z.enum(["google"]),
  confirmed: z.boolean(),
  birthDate: z.date(),
  password: z.null(),
  phone: z.number().nullable(),
  createdAt: z.date(),
})



export const authConfirmAccountSchema = z.object({
  token: z.string(),
})





// READY
export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
})


export const checkEmailSchema = z.object({
  email: z.string(),
})

export const tokenSchema = z.object({
  token: z.string(),
})

export const forgotPasswordSchema = z.object({
  email: z.string(),
})

export const createAccountSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
  birthDate: z.string(),
  phone: z.string(),
})

export const recoverPasswordSchema = z.object({
  tokenId: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
})

export const otpSchema = z.object({
  token: z.string(),
  otp: z.string(),
})

export const confirmAccessSchema = z.object({
  otp: z.string(),
})

export const requestTokenSchema = z.object({
  email: z.string(),
})


export const completeAccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastname: z.string(),
  phone: z.string(),
  birthDate: z.string(),
})
