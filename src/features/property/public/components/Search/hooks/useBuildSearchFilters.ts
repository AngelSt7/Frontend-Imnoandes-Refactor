export function useBuildSearchFilters(searchParams: Record<string, string | undefined>, tipo?: string, categorias: string[] = [], ubicaciones: string[] = []) {
  const searchFilters = new URLSearchParams(
    Object.entries(searchParams).filter(([_, v]) => v !== undefined) as [string, string][]
  );

  if (tipo) searchFilters.set("propertyType", tipo);
  if (categorias.length > 0) searchFilters.set("propertyCategory", categorias.join(","));
  if (ubicaciones.length > 0) searchFilters.set("locationId", ubicaciones.join(","));

  return {
    filters: searchFilters.toString(),
    hasFilters: searchFilters.toString().length > 0,
  };
}
