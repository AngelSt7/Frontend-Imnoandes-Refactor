import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "@/src/utils/resolves/bases/enums";
import { z } from "zod";
import { MetaSchema } from "../../shared";

export const formDataPropertySchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.string(),
  phone: z.string(),
  property_type: z.nativeEnum(PROPERTY_TYPE),
  property_category: z.nativeEnum(PROPERTY_CATEGORY),
  currency: z.nativeEnum(CURRENCY),
  price: z.number().positive(),
  location: z.string(),
  description: z.string(),
  departmentId: z.string().uuid(),
  provinceId: z.string().uuid(),
  districtId: z.string().uuid(),
  bedrooms: z.number().positive().nullish(),
  bathrooms: z.number().positive().nullish(),
  area: z.number().positive(),
  furnished: z.boolean().nullish(),
  hasTerrace: z.boolean().nullish(),
  yearBuilt: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  floor: z.number().positive().nullish(),
  hasParking: z.boolean().nullish(),
  parkingSpaces: z.boolean().nullish(),
  extraInfo: z.string(),
  servicesId: z.array(z.string().uuid()).nullish()
});

export const propertySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  currency: z.enum(["PEN", "USD"]),
  property_type: z.enum(["RENT", "SALE"]),
  property_category: z.enum(["APARTMENT", "HOUSE", "OFFICE", "LAND", "COMMERCIAL", "WAREHOUSE"]),
  availability: z.boolean(),
  area: z.number(),
  yearBuilt: z.number().nullable(),
  bathrooms: z.number().nullable(),
  bedrooms: z.number().nullable(),
  location: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const detailsPropertySchema = z.object({
  id: z.number(),
  location: z.string(),
  price: z.number(),
  imageMain: z.string(),
  availability: z.boolean(),
  type: z.object({ type: z.string() }),
  bedrooms: z.number(),
  bathrooms: z.number(),
  area: z.number(),
  yearBuilt: z.number(),
  publishedAt: z.string(),
  district: z.object({ district: z.string() }),
  departament: z.object({ departament: z.string() }),
  currency: z.object({ currency: z.string() }),
  serviceToProperty: z.array(z.object({ service: z.string() }))
})

export const findPropertySchema = z.object({
  id: z.number().int().positive(),
  location: z.string().min(5).max(255),
  description: z.string().min(15).max(500),
  imageMain: z.string().url(),
  area: z.number().int().positive(),
  price: z.number().int().positive(),
  terrace: z.boolean(),
  elevator: z.boolean(),
  furnished: z.boolean(),
  parkingSpaces: z.boolean(),
  currencyId: z.number().int().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().int().positive(),
  yearBuilt: z.number().int().min(1900).max(new Date().getFullYear()),
  districtId: z.number().int().positive(),
  typeId: z.number().int().positive(),
  userId: z.number().int().positive(),
  departmentId: z.number().int().positive(),
  publishedAt: z.string(),
  availability: z.boolean(),
  services: z.array(z.string()),
  imagesGallery: z.array(z.string())
})

export const propertiesListSchema = z.object({
  data: z.array(propertySchema),
  meta: MetaSchema
})