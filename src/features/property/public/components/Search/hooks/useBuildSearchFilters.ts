export const searchFiltersArray = [
  'page',
  'search',
  'bedrooms',
  'bathrooms',
  'propertyType',
  'propertyCategory',
  'area',
  'minBedrooms',
  'maxBedrooms',
  'minBathrooms',
  'minParkingSpaces',
  'published',
];

export function useBuildSearchFilters(searchParams: Record<string, string | undefined>, type?: string, categories: string[] = [], locations: string[] = []) {

  const searchFilters = new URLSearchParams(
    Object.entries(searchParams).filter(([_, v]) => v !== undefined) as [string, string][]
  );

  if (type) searchFilters.set("propertyType", type);
  if (categories.length > 0) searchFilters.set("propertyCategory", categories.join(","));
  if (locations.length > 0) searchFilters.set("locationId", locations.join(","));

  const sorterFilters = new URLSearchParams(
   Array.from(searchFilters)
      .filter(([k, _]) => searchFiltersArray.includes(k)) as [string, string][]
  )

  return {
    filters: sorterFilters.toString(),
    hasFilters: sorterFilters.toString().length > 0,
    tag: sorterFilters.toString()
  };
}
