import { buildMetadata } from "@/src/config/metadata/metadata";
import { LocationService, LocationsSearch, Search } from "@/src/features/property";

import { PropertyPublic } from "@/src/features/property/public/services/propertyPublic.service";
import { PropertyCategoryEnum, PropertyTypeEnum } from "@/src/utils/url/enum";

export const metadata = buildMetadata({
  title: "Buscar propiedades en venta y alquiler",
  description: "Explora miles de propiedades en venta y alquiler. Filtra por ubicación, precio y características para encontrar el hogar perfecto según tus necesidades.",
  url: "https://mi-sitio.com/es/search",
  image: "https://mi-sitio.com/preview-search.jpg",
});


export const searchFiltersArray = [
  "currency",
  "minBathrooms",
];

type SearchParams = Record<string, string | undefined>;

export default async function Page({ searchParams, params }: { searchParams: SearchParams, params: any }) {
  const listSearchParams = await searchParams;
  const { search } = await params;

  const regex = /^(.*?)-de-(.*?)(?:-en-(.*))?$/;

  const match = search.toString().match(regex);

  let tipo: string | undefined;
  let categorias: string[] = [];
  let ubicaciones: string[] = [];

  if (match) {
    tipo = PropertyTypeEnum[match[1]];
    categorias = match[2]
      .split("-o-")
      .map((item: string) => PropertyCategoryEnum[item.trim()])
    ubicaciones = match[3] ? match[3].split("-o-") : [];
  }

  // Construir searchFilters con query params
  const searchFilters = new URLSearchParams(
    Object.entries(listSearchParams).filter(([_, v]) => v !== undefined) as [string, string][]
  );

  // Agregar los filtros del slug
  if (tipo) searchFilters.set("propertyType", tipo);
  if (categorias.length > 0) searchFilters.set("propertyCategory", categorias.join(","));
  if (ubicaciones.length > 0) searchFilters.set("locationId", ubicaciones.join(","));

  // Resultado final
  const filters = {
    filters: searchFilters.toString(),
    hasFilters: searchFilters.toString().length > 0,
  };

  const properties = await PropertyPublic.search(filters);
  let locales : LocationsSearch | undefined = []
  try {
    locales = await LocationService.list(ubicaciones.join(",") ?? []);
  } catch (error) {
    console.log(error);
  }

  if (properties) {
    return <Search
      data={properties}
      locales={locales}
    />;
  }

  return null;
}
