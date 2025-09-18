import { redirect } from "next/navigation";
import { buildMetadata } from "@/src/config/metadata/metadata";
import { PropertyPublic, Location } from "@/src/features/property/public";

import { Search } from "@/src/features/property/public/components";
import { useBuildSearchFilters, useParseSearchSlug } from "@/src/features/property/public/components/Search/hooks";


export const metadata = buildMetadata({
  title: "Buscar propiedades en venta y alquiler",
  description: "Explora miles de propiedades en venta y alquiler. Filtra por ubicación, precio y características para encontrar el hogar perfecto según tus necesidades.",
  url: "https://mi-sitio.com/es/search",
  image: "https://mi-sitio.com/preview-search.jpg",
});


export default async function Page({ searchParams, params }: { searchParams: Record<string, string | undefined>, params: any }) {
  const awaitedParams = await params
  const awaitedSearchParams = await searchParams

  const { type, categories, locations } = useParseSearchSlug(awaitedParams.search);
  const filters = useBuildSearchFilters(awaitedSearchParams, type, categories, locations);

  const promises: Promise<any>[] = [PropertyPublic.search(filters)];
  if (locations.length > 0) promises.push(Location.list(locations));

  try {
    const [propertiesData, localesData] = await Promise.all(promises);

    const properties = propertiesData;
    const locales = localesData || [];

    if (!properties) return null;

    return <Search data={properties} locales={locales} />;
  } catch (error) {
    redirect('http://localhost:3000/es/search/venta-de-departamentos');
  }
}
