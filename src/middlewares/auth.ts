import { NextRequest, NextResponse } from "next/server";
import { User } from "../services";


// Rutas públicas de /auth permitidas sin sesión
const PUBLIC_AUTH = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
]);

// Rutas de /auth permitidas cuando hay TEMP (perfil incompleto)
const TEMP_ONLY = new Set(["/auth/complete-profile"]);

// Rutas de /auth permitidas aun con sesión (opcional)
const ALLOW_WHEN_AUTHED = new Set(["/auth/logout"]);

export async function withAuth(req: NextRequest): Promise<NextResponse | null> {
  const url = req.nextUrl;
  const pathname = url.pathname;

  const SESSION = req.cookies.get("SESSION")?.value ?? null;
  const TEMP = req.cookies.get("TEMP")?.value ?? null;

  if (!SESSION && !TEMP) {
    // Si ya está en una auth pública, dejar pasar (evita loop)
    if (pathname.startsWith("/auth") && PUBLIC_AUTH.has(pathname)) {
      return null;
    }
    // En cualquier otra ruta, enviarlo a login
    const to = new URL("/auth/login", req.url);
    to.search = ""; // limpia query params
    return NextResponse.redirect(to);
  }

  // ⚠️ Con TEMP pero sin SESSION: sólo permitir /auth/complete-profile
  if (TEMP && !SESSION) {
    if (pathname !== "/auth/complete-profile") {
      const to = new URL("/auth/complete-profile", req.url);
      to.search = "";
      return NextResponse.redirect(to);
    }
    return null;
  }

  // ✅ Con SESSION
  if (SESSION) {
    // Bloquear /auth/* si ya estás logueado (excepto los permitidos)
    if (pathname.startsWith("/auth") && !ALLOW_WHEN_AUTHED.has(pathname)) {
      const to = new URL("/dashboard/properties?page=1&limit=10", req.url);
      to.search = "";
      return NextResponse.redirect(to);
    }

    // Valida la sesión sólo cuando entras al dashboard (optimiza)
    if (pathname.startsWith("/dashboard")) {
      try {
        const ok = await User.validate(SESSION);
        if (!ok) {
          const to = new URL("/auth/login", req.url);
          to.search = "";
          return NextResponse.redirect(to);
        }
      } catch {
        const to = new URL("/404", req.url);
        to.search = "";
        return NextResponse.redirect(to);
      }
    }

    return null; // sesión válida → continuar
  }

  // Fallback (no debería alcanzarse)
  const to = new URL("/auth/login", req.url);
  to.search = "";
  return NextResponse.redirect(to);
}
