import { carrouselItemSchema, carrouselSchema, contactInfoSchema, publicContactFormSchema, publicFilterAreaSchema, publicFilterBedroomsSchema, publicFilterPricesSchema } from "@/src/schema/public/property";
import { z } from "zod";

export type Carrousel = z.infer<typeof carrouselSchema>
export type CarrouselItem = z.infer<typeof carrouselItemSchema>

export type PublicContactForm = z.infer<typeof publicContactFormSchema>
export type ContactInfoForm = z.infer<typeof contactInfoSchema>

export type FilterPrices = z.infer<typeof publicFilterPricesSchema>
export type FilterArea = z.infer<typeof publicFilterAreaSchema>
export type FilterBedrooms = z.infer<typeof publicFilterBedroomsSchema>