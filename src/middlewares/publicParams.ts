import { NextRequest, NextResponse } from "next/server";
import { searchFiltersArray as ValidFilters } from "../features/property/public/components/Search/hooks/useBuildSearchFilters";
import { CURRENCY } from "../utils/resolves/bases/enums";
import { PropertyCategoryEnum, PropertyTypeEnum } from "../utils/url/enum";

export function withPublicParams(req: NextRequest) {
  const url = req.nextUrl.clone();
  console.log("ESTAMOS EN PUBLIC PARAMS");

  if (!url.pathname.startsWith("/es/search")) {
    console.log("NO ES /ES/SEARCH");
    return null;
  }


  console.log("ES /ES/SEARCH");
  let changed = false;

    const pathWithoutPrefix = url.pathname.replace(/^\/es\/search\//, "");
    const regex = /^(.*?)-de-(.*?)(?:-en-(.*))?$/;
    const match = pathWithoutPrefix.match(regex);

  if (!match) {
    return NextResponse.redirect("http://localhost:3000/es/search/venta-de-departamentos");
  }


  console.log("MATCH:", match);

  console.log("SI HIZO MATCH");

for (const [key] of url.searchParams.entries()) {
  if (!ValidFilters.includes(key)) {
    console.log("Eliminando param inválido:", key);
    url.searchParams.delete(key);
    changed = true;
  }
}
  console.log("seguimos vivos");

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
  
  console.log("PROPERTY TYPE:", propertyType);
  console.log(propertyType);
  const categoryType = match[2].split("-o-");

  // page
if (page && isNaN(Number(page)) || Number(page) < 1) {
  console.log("page inválido:", page);
  url.searchParams.set("page", "1");
  changed = true;
}

  // propertyType
if (propertyType && !Object.keys(PropertyTypeEnum).includes(propertyType)) {
  console.log("propertyType inválido:", propertyType);
  return NextResponse.redirect("http://localhost:3000/es/search/venta-de-departamentos");
}

  // categoryType
for (const category of categoryType) {
  if (!Object.keys(PropertyCategoryEnum).includes(category)) {
    console.log("categoryType inválido:", category);
    return NextResponse.redirect("http://localhost:3000/es/search/venta-de-departamentos");
  }
}

  // currency
if (currency && !Object.keys(CURRENCY).includes(currency)) {
  console.log("currency inválido:", currency);
  url.searchParams.delete("currency");
  changed = true;
}


  // Bathrooms
  const validBathrooms = ["1", "2", "3", "4", "5"];
if (minBathrooms && !validBathrooms.includes(minBathrooms)) {
  console.log("minBathrooms inválido:", minBathrooms);
  url.searchParams.delete("minBathrooms");
  changed = true;
}

  // Bedrooms
if (minBedrooms && Number(minBedrooms) < 1) {
  console.log("minBedrooms inválido:", minBedrooms);
  url.searchParams.delete("minBedrooms");
  changed = true;
}
if (maxBedrooms && (Number(maxBedrooms) > 10 || Number(maxBedrooms) < Number(minBedrooms))) {
  console.log("maxBedrooms inválido:", maxBedrooms);
  url.searchParams.delete("maxBedrooms");
  changed = true;
}


  // Area
if (minArea && (isNaN(Number(minArea)) || Number(minArea) < 50)) {
  console.log("minArea inválido:", minArea);
  url.searchParams.delete("minArea");
  changed = true;
}
if (maxArea && (isNaN(Number(maxArea)) || Number(maxArea) > 3000)) {
  console.log("maxArea inválido:", maxArea);
  url.searchParams.delete("maxArea");
  changed = true;
}

  // Parking
if (minParkingSpaces && !validBathrooms.includes(minParkingSpaces)) {
  console.log("minParkingSpaces inválido:", minParkingSpaces);
  url.searchParams.delete("minParkingSpaces");
  changed = true;
}


  // Published
  const validPublished = ["0", "5", "7"];
if (published && !validPublished.includes(published)) {
  console.log("published inválido:", published);
  url.searchParams.delete("published");
  changed = true;
}

  if (changed) {
    console.log("REDIRECT debido a params inválidos:", url.toString());
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
