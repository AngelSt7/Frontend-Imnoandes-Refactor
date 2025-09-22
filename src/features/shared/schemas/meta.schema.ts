import { z } from "zod";

export const MetaSchema = z.object({
    totalItems: z.number(),
    itemCount: z.number(),
    itemsPerPage: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
});
