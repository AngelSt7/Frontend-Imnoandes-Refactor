// middlewares/params.ts
import { NextRequest, NextResponse } from "next/server";
import { validate as isUUID } from "uuid";
import { CURRENCY } from "../utils/resolves/bases/enums";
import { options } from "../myLib/components/Table/TableContent";
import { PROPERTY_CATEGORY, PROPERTY_TYPE } from "../components/dashboard/properties/details/Header";
import { VALID_PARAMS } from "@/src/features/property/admin/constants";

export function withParamValidation(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (!url.pathname.startsWith("/dashboard/properties")) {
    return null
  }

  let changed = false;

  for (const [key] of url.searchParams.entries()) {
    if (!VALID_PARAMS.includes(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  }
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
      changed = true;
    }

    if (departmentId && !isUUID(departmentId)) {
      url.searchParams.delete("departmentId");
      changed = true;
    }

    if (propertyCategory && !Object.keys(PROPERTY_CATEGORY).includes(propertyCategory)) {
      url.searchParams.delete("propertyCategory");
      changed = true;
    }

    if (propertyType && !Object.keys(PROPERTY_TYPE).includes(propertyType)) {
      url.searchParams.delete("propertyType");
      changed = true;
    }

    if (currency && !Object.keys(CURRENCY).includes(currency)) {
      url.searchParams.delete("currency");
      changed = true;
    }

    if (state && !options.some(op => op.key === state)) {
      url.searchParams.delete("state");
      changed = true;
    }

    if (!limit || !["5", "10", "15"].includes(limit) || isNaN(Number(limit))) {
      url.searchParams.set("limit", "10");
      changed = true;
    }
  }

  if (changed) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
