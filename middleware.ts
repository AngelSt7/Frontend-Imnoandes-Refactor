import { NextRequest, NextResponse } from "next/server";
import { withAuth, withParamValidation } from "./src/middlewares";

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"], // ajusta según tus rutas
};

export async function middleware(req: NextRequest) {
    // 1) Auth primero(puede redirigir a login / complete - profile / dashboard)
    const authRes = await withAuth(req);
    if (authRes) return authRes;

    // 2) Validación de params(puede redirigir a 404 o normalizar)
    // const paramRes = withParamValidation(req);
    // if (paramRes) return paramRes;

    // 3) Todo OK
    return NextResponse.next();
}
