import { FormDataImageMainSchema, FormDataImagesGallerySchema } from "@/src/schema/images/images"
import { z } from "zod"

export type ImageMain = File | string | null
export type ImageGallery = File[] | string | string[] | (File | string)[]
export type ImageType = 'main' | 'gallery'

export type FormDataImage = {
    formData: FormData
    type: ImageType
}

//**Send to server */
export type FormDataImageMain = z.infer<typeof FormDataImageMainSchema>
export type FormDataImagesGallery = z.infer<typeof FormDataImagesGallerySchema>
