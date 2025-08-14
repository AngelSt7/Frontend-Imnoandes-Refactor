import { z } from "zod";

export function mapToSelectData<T extends string>(key: T) {
  return z
    .array(
      z.object({
        id: z.string(),
        [key]: z.string(),
        activo: z
          .union([z.boolean(), z.number()])
          .optional()
          .transform((val) => {
            if (typeof val === "boolean") return val;
            if (typeof val === "number") return val === 1;
            return true;
          })
          .default(true),
      })
    )
    .transform((items) =>
      items.map((item) => ({
        key: item.id,
        label: item[key],
        activo: item.activo,
      }))
    );
}
