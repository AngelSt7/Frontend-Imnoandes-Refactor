import { z } from "zod";

export type LocationSearch = z.infer<typeof locationSearchSchema>
export type LocationsSearch = z.infer<typeof locationsSearchSchema>


export const locationSearchSchema = z.object({
  slug: z.string(),
  label: z.string()
})

export const locationsSearchSchema = z.array(locationSearchSchema)
