import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "@/src/utils/resolves/bases/enums";
import { z } from "zod";
import { MetaSchema } from "../../shared";

export const formDataPropertySchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.string(),
  phone: z.string(),
  propertyType: z.nativeEnum(PROPERTY_TYPE),
  propertyCategory: z.nativeEnum(PROPERTY_CATEGORY),
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
  phone: z.string(),
  propertyType: z.enum(["RENT", "SALE"]),
  propertyCategory: z.enum(["APARTMENT", "HOUSE", "OFFICE", "LAND", "COMMERCIAL", "WAREHOUSE"]),
  availability: z.boolean(),
  area: z.number(),
  yearBuilt: z.number().nullish(),
  bathrooms: z.number().nullish(),
  bedrooms: z.number().nullish(),
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
  id: z.string().uuid(),
  name: z.string(),

  currency: z.nativeEnum(CURRENCY),
  propertyType: z.nativeEnum(PROPERTY_TYPE),
  propertyCategory: z.nativeEnum(PROPERTY_CATEGORY),

  price: z.number(),
  phone: z.string(),

  yearBuilt: z.number().nullish(),

  latitude: z.number(),
  longitude: z.number(),

  hasTerrace: z.boolean(),
  location: z.string(),
  description: z.string(),
  //availability: z.boolean(),

  districtId: z.string().uuid(),
  departmentId: z.string().uuid(),
  provinceId: z.string().uuid(),

  floor: z.number().nullish(),
  hasParking: z.boolean(),
  parkingSpaces: z.number().nullish(),
  bedrooms: z.number().nullish(),
  bathrooms: z.number().nullish(),

  area: z.number(),
  furnished: z.boolean(),

  servicesId: z.array(z.string().uuid()).default([]),
})

export const propertiesListSchema = z.object({
  data: z.array(propertySchema),
  meta: MetaSchema
})