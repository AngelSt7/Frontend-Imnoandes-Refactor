import z from 'zod'

export const authCreateAccountSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  password: z.string(),
  repeatPassword: z.string(),
  birthDate: z.string(),
  phone: z.string(),
})

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

export const authCompleteAccountSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  phone: z.string().nullable(),
  birthDate: z.string(),
})

export const authForgotPasswordSchema = z.object({
  email: z.string(),
})

export const authConfirmAccountSchema = z.object({
  token: z.string(),
})

export const authRequestTokenSchema = z.object({
  email: z.string(),
})

export const authUpdatePasswordSchema = z.object({
  password: z.string(),
  repeatPassword: z.string(),
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