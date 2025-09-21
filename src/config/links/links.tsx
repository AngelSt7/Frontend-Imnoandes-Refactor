import { LinkOption } from "@/src/myLib";
import { UserCog, Users, BarChart3, LogOut, House } from "lucide-react";

export const LinksMenu: LinkOption[] = [
  {
    href: "/es",
    label: "Pagina Principal",
    key: "home",
    icon: <UserCog className="w-4 h-4" />,
  },
  {
    href: "/dashboard/properties?page=1",
    label: "Mis Propiedades",
    key: "properties",
    icon: <House className="w-4 h-4" />,
  },
  {
    href: "/dashboard/profile",
    label: "Configuraciones",
    key: "settings",
    icon: <Users className="w-4 h-4" />,
  },
  {
    href: "/dashboard/favorites",
    label: "Favoritos",
    key: "favorites",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    label: "Logout",
    key: "logout",
    color: "danger",
    callback: () => {},
    icon: <LogOut className="w-4 h-4" />,
  },
];