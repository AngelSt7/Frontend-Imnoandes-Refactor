import { PropertyTypeEnum, PropertyCategoryEnum } from "@/src/utils/url/enum";

export function useParseSearchSlug(slug: string) {
  const regex = /^(.*?)-de-(.*?)(?:-en-(.*))?$/;
  const match = slug.match(regex);

  let tipo: string | undefined;
  let categorias: string[] = [];
  let ubicaciones: string[] = [];

  if (match) {
    tipo = PropertyTypeEnum[match[1]];
    categorias = match[2].split("-o-").map((item) => PropertyCategoryEnum[item.trim()]);
    ubicaciones = match[3] ? match[3].split("-o-") : [];
  }

  return { tipo, categorias, ubicaciones };
}
