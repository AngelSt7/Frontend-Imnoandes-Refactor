import { z } from "zod";

export const FormDataImageMainSchema = z.object({
    id: z.string(),
    url: z.string(),
    propertyId: z.string(),
    publicId: z.string()
})

export const FormDataImagesGallerySchema = z.object({
    propertyId: z.string(),
    images: z.array(z.object({
        url: z.string(),
        publicId: z.string()
    })),
})