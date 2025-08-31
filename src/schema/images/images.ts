import { z } from "zod";

export const FormDataImageMainSchema = z.object({
    url: z.string(),
    id: z.string(),
})

export const FormDataImagesGallerySchema = z.object({
    url: z.array(z.string()),
    id: z.string(),
})