import { z } from "zod";
import { detailsPropertySchema, findPropertySchema, formDataPropertySchema, propertiesListSchema, propertySchema } from "@/src/schema/admin";

export type FormDataProperty = z.infer<typeof formDataPropertySchema>

export type AdminProperties = z.infer<typeof propertiesListSchema>
export type AdminProperty = z.infer<typeof propertySchema>

export type AdminDetailsProperty = z.infer<typeof detailsPropertySchema>
export type AdminPropertyById = z.infer<typeof findPropertySchema>

export type PaginationType = { page: number, take: number }
export type SessionNextAuth = { email: string }