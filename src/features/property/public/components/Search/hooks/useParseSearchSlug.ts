import { PropertyTypeEnum, PropertyCategoryEnum } from "@/src/utils/url/enum";

export function useParseSearchSlug(slug: string) {
  const regex = /^(.*?)-de-(.*?)(?:-en-(.*))?$/;
  const match = slug.match(regex);

  let type: string | undefined;
  let categories: string[] = [];
  let locations: string[] = [];

  if (match) {
    type = PropertyTypeEnum[match[1]];
    categories = match[2].split("-o-").map((item) => PropertyCategoryEnum[item.trim()]);
    locations = match[3] ? match[3].split("-o-") : [];
  }

  return { type, categories, locations };
}
