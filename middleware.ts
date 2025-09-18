import { NextRequest, NextResponse } from "next/server";
import { withAuth, withParamValidation } from "./src/middlewares";
import { withPublicParams } from "./src/middlewares/publicParams";

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*", "/es/search/:path*"], // ajusta según tus rutas
};

export async function middleware(req: NextRequest) {

    // 1) Auth primero(puede redirigir a login / complete - profile / dashboard)
    const authRes = await withAuth(req);
    if (authRes) return authRes;

    // 2) Validación de params(puede redirigir a 404 o normalizar)
    const paramRes = withParamValidation(req);
    if (paramRes) return paramRes;

    // const 
    const publicParam = withPublicParams(req);
    if (publicParam) return publicParam;

    // 3) Todo OK
    return NextResponse.next();
}
