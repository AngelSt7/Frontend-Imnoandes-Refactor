import { z } from "zod";
import { MetaSchema } from "../schemas";

export type Meta = z.infer<typeof MetaSchema>;
