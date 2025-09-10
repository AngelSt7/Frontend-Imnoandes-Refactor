import { buildMetadata } from "@/src/config/metadata/metadata";
import { QueryClient } from "@tanstack/react-query";

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
    const queryClient = new QueryClient();
    const params = await searchParams

    const searchFilters = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== undefined && searchFiltersArray.includes(key))
    );


    return  <>
    </>
}
