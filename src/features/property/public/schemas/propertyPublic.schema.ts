import { z } from "zod";
import { MetaSchema } from '../../../../schema/shared/meta';

export type PropertySearch = z.infer<typeof propertySearchSchema>;
export type PropertiesSearch = z.infer<typeof propertiesSearchSchema>;

export const propertySearchSchema = z.object({
  id: z.string(),
  slug: z.string(),
  price: z.number(),
  currency: z.string(),
  propertyType: z.string(),
  description: z.string(),
  propertyCategory: z.string(),
  location: z.string(),
  hasParking: z.boolean().nullish(),
  parkingSpaces: z.number().nullish(),
  createdAt: z.string().or(z.date()),
  bedrooms: z.number().nullish(),
  bathrooms: z.number().nullish(),
  services: z.array(z.string()),
  area: z.number().nullish(),
  images: z
  .array(
      z.object({
          url: z.string().url(),
          type: z.string()
        })
    )
    .nullish(),
  department: z.string().nullish(),
  district: z.string().nullish(),
  url: z.string()
});


export const propertiesSearchSchema = z.object({
    data: z.array(propertySearchSchema),
    meta: MetaSchema
})

