import { User } from "@/src/types";
import Link from "next/link";

interface ButtonsNavProps {
    user?: User;
    routeLogin: string;
    styles: string;
}

export function ButtonsNav({ user, routeLogin, styles }: ButtonsNavProps) {
    const logout = `${styles} block text-center bg-[#fce5eb] border border-[#ac7685] text-[#b23068] px-4 py-2 rounded-md hover:bg-red-200 transition-colors font-medium`
    const login = `${styles} block text-center bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 hover:border-gray-300 transition-colors font-medium shadow-sm bg-gray-100`
    if (!user) {
        return (
            <button
                onClick={() => {

                }}
                className={logout}
            >
                Cerrar sesión
            </button>
        );
    } else {
        return (
            <Link
                href={routeLogin || "/auth/login"}
                className={login}
            >
                Iniciar sesión
            </Link>
        );
    }
}