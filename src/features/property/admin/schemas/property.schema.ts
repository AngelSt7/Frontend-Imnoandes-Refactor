import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "@/src/utils/resolves/bases/enums";
import { z } from "zod";
import { MetaSchema } from "../../../../schema/shared";

export const formDataPropertySchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.string(),
  phone: z.string(),
  propertyType: z.nativeEnum(PROPERTY_TYPE),
  propertyCategory: z.nativeEnum(PROPERTY_CATEGORY),
  currency: z.nativeEnum(CURRENCY),
  price: z.number().positive(),
  address: z.string(),
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
  phone: z.string(),
  propertyType: z.nativeEnum(PROPERTY_TYPE),
  propertyCategory: z.nativeEnum(PROPERTY_CATEGORY),
  currency: z.nativeEnum(CURRENCY),
  availability: z.boolean(),
  area: z.number(),
  yearBuilt: z.number().nullish(),
  bathrooms: z.number().nullish(),
  bedrooms: z.number().nullish(),
  address: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const propertyImagesSchema = z.array(z.object({
  id: z.string().nullish(),
  url: z.string().nullish(),
  type: z.enum(["MAIN", "GALLERY"]).nullish()
}))

export const propertyDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  propertyType: z.nativeEnum(PROPERTY_TYPE),
  propertyCategory: z.nativeEnum(PROPERTY_CATEGORY),
  currency: z.nativeEnum(CURRENCY),

  price: z.number(),
  yearBuilt: z.number().nullish(),

  hasTerrace: z.boolean(),
  address: z.string(),
  description: z.string(),
  availability: z.boolean(),

  floor: z.number().nullish(),
  hasParking: z.boolean(),
  parkingSpaces: z.number().nullish(),

  bedrooms: z.number().nullish(),
  bathrooms: z.number().nullish(),
  area: z.number(),

  furnished: z.boolean(),
  services: z.array(z.string()).nullish(),
  province: z.string(),
  district: z.string(),
  departament: z.string(),

  imageMain: z.string().nullish(),
  
});

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
  address: z.string(),
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