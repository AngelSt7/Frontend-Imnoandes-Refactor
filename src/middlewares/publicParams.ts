import { NextRequest, NextResponse } from "next/server";
import { searchFiltersArray as ValidFilters } from "../features/property/public/components/Search/hooks/useBuildSearchFilters";
import { CURRENCY } from "../utils/resolves/bases/enums";
import { PropertyCategoryEnum, PropertyTypeEnum } from "../utils/url/enum";

export function withPublicParams(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (!url.pathname.startsWith("/es/search")) {
    return null;
  }

  let changed = false;

  const pathWithoutPrefix = url.pathname.replace(/^\/es\/search\//, "");
  const regex = /^(.*?)-de-(.*?)(?:-en-(.*))?$/;
  const match = pathWithoutPrefix.match(regex);

  if (!match) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/es/search/venta-de-departamentos`);
  }

  for (const [key] of url.searchParams.entries()) {
    if (!ValidFilters.includes(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  }

  const getParam = (key: string) => url.searchParams.get(key);

  const page = getParam("page");
  const currency = getParam("currency");
  const minBathrooms = getParam("minBathrooms");
  const minParkingSpaces = getParam("minParkingSpaces");
  const minBedrooms = getParam("minBedrooms");
  const maxBedrooms = getParam("maxBedrooms");
  const published = getParam("published");
  const minArea = getParam("minArea");
  const maxArea = getParam("maxArea");
  const propertyType = match[1];
  const categoryType = match[2].split("-o-");

  // page
  if (page && isNaN(Number(page)) || Number(page) < 1) {
    url.searchParams.set("page", "1");
    changed = true;
  }

  // propertyType
  if (propertyType && !Object.keys(PropertyTypeEnum).includes(propertyType)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/es/search/venta-de-departamentos`);
  }

  // categoryType
  for (const category of categoryType) {
    if (!Object.keys(PropertyCategoryEnum).includes(category)) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/es/search/venta-de-departamentos`);
    }
  }

  // currency
  if (currency && !Object.keys(CURRENCY).includes(currency)) {
    url.searchParams.delete("currency");
    changed = true;
  }

  // Bathrooms
  const validBathrooms = ["1", "2", "3", "4", "5"];
  if (minBathrooms && !validBathrooms.includes(minBathrooms)) {
    url.searchParams.delete("minBathrooms");
    changed = true;
  }

  // Bedrooms
  if (minBedrooms && Number(minBedrooms) < 1) {
    url.searchParams.delete("minBedrooms");
    changed = true;
  }
  if (maxBedrooms && (Number(maxBedrooms) > 10 || Number(maxBedrooms) < Number(minBedrooms))) {
    url.searchParams.delete("maxBedrooms");
    changed = true;
  }

  // Area
  if (minArea && (isNaN(Number(minArea)) || Number(minArea) < 50)) {
    url.searchParams.delete("minArea");
    changed = true;
  }
  if (maxArea && (isNaN(Number(maxArea)) || Number(maxArea) > 3000)) {
    url.searchParams.delete("maxArea");
    changed = true;
  }

  // Parking
  if (minParkingSpaces && !validBathrooms.includes(minParkingSpaces)) {
    url.searchParams.delete("minParkingSpaces");
    changed = true;
  }

  // Published
  const validPublished = ["0", "5", "7"];
  if (published && !validPublished.includes(published)) {
    url.searchParams.delete("published");
    changed = true;
  }

  if (changed) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
