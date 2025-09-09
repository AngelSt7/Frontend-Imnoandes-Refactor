import { z } from "zod";
import { propertyDetailsSchema, findPropertySchema, formDataPropertySchema, propertiesListSchema, propertySchema, propertyImagesSchema } from "@/src/schema/admin";

export type FormDataProperty = z.infer<typeof formDataPropertySchema>

export type AdminProperties = z.infer<typeof propertiesListSchema>
export type AdminProperty = z.infer<typeof propertySchema>

export type AdminDetailsProperty = z.infer<typeof propertyDetailsSchema>
export type AdminPropertyById = z.infer<typeof findPropertySchema>

export type AdminPropertyImages = z.infer<typeof propertyImagesSchema>



export type PaginationType = { page: number, take: number }
export type SessionNextAuth = { email: string }