import { carrouselItemSchema, carrouselSchema, publicContactFormSchema, publicFilterBedroomsSchema, publicFilterPricesSchema } from "@/src/schema/public/property";
import { z } from "zod";


carrouselSchema
carrouselItemSchema

export type Carrousel = z.infer<typeof carrouselSchema>
export type CarrouselItem = z.infer<typeof carrouselItemSchema>


export type PublicContactForm = z.infer<typeof publicContactFormSchema>

export type FilterPrices = z.infer<typeof publicFilterPricesSchema>
export type FilterBedrooms = z.infer<typeof publicFilterBedroomsSchema>