import { buildMetadata } from "@/src/config/metadata/metadata";
import { Search } from "@/src/features/property";
import { PropertyPublic } from "@/src/features/property/public/services/propertyPublic.service";

export const metadata = buildMetadata({
    title: "Buscar propiedades en venta y alquiler",
    description: "Explora miles de propiedades en venta y alquiler. Filtra por ubicación, precio y características para encontrar el hogar perfecto según tus necesidades.",
    url: "https://mi-sitio.com/es/search",
    image: "https://mi-sitio.com/preview-search.jpg",
});


export const searchFiltersArray = [
    "currency"
];

type SearchParams = Record<string, string | undefined>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const searchFilters = new URLSearchParams(
    Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
  );

  const filters = {
    filters: searchFilters.toString(),
    hasFilters: searchFilters.toString().length > 0,
  };

  const properties = await PropertyPublic.search(filters);

  if (properties) {
    return <Search data={properties} />;
  }

  return null;
}
