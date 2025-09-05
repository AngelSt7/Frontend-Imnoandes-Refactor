// middlewares/params.ts
import { NextRequest, NextResponse } from "next/server";
import { validate as isUUID } from "uuid";
import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "../utils/resolves/bases/enums";
import { options } from "../components/dashboard/ui/table/TableContent";

export function withParamValidation(req: NextRequest) {
  const url = req.nextUrl.clone();

  const getParam = (key: string) => url.searchParams.get(key);

  if (url.pathname.startsWith("/dashboard/properties")) {

    const page = getParam("page");
    const departmentId = getParam("departmentId");
    const propertyCategory = getParam("propertyCategory");
    const propertyType = getParam("propertyType");
    const currency = getParam("currency");
    const state = getParam("state");
    const limit = getParam("limit");

    if (!page || isNaN(Number(page)) || Number(page) < 1) {
      url.searchParams.set("page", "1");
      return NextResponse.redirect(url);
    }

    if (departmentId && !isUUID(departmentId)) {
      url.searchParams.delete("departmentId");
      return NextResponse.redirect(url);
    }

    if (propertyCategory && !Object.keys(PROPERTY_CATEGORY).includes(propertyCategory)) {
      url.searchParams.delete("propertyCategory");
      return NextResponse.redirect(url);
    }

    if (propertyType && !Object.keys(PROPERTY_TYPE).includes(propertyType)) {
      url.searchParams.delete("propertyType");
      return NextResponse.redirect(url);
    }

    if (currency && !Object.keys(CURRENCY).includes(currency)) {
      url.searchParams.delete("currency");
      return NextResponse.redirect(url);
    }

    if (state && !options.some(op => op.key === state)) {
      url.searchParams.delete("state");
      return NextResponse.redirect(url);
    }

    if (limit && !["5", "10", "15"].includes(limit)) {
      url.searchParams.delete("limit");
      return NextResponse.redirect(url);
    }

  }

  return NextResponse.next();
}
