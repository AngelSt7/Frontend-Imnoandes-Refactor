import { Home, DollarSign, Key, TrendingUp } from "lucide-react";
import ClientNavigationButton from "./ClientNavigationButton";
import { Link } from "@heroui/react";

export default function NavigationCard() {

    const buttons = [
        { label: 'Departamentos recientes en venta', route: '/es/properties', icon: <Home className="w-6 h-6 text-blue-600" /> },
        { label: 'Inmuebles que bajaron de precio', route: '/es/properties', icon: <DollarSign className="w-6 h-6 text-green-600" /> },
        { label: 'Viviendas recientes en alquiler', route: '/es/properties', icon: <Key className="w-6 h-6 text-orange-600" /> },
        { label: 'Inmuebles recientes en venta', route: '/es/properties', icon: <TrendingUp className="w-6 h-6 text-purple-600" /> },
    ]

    return (
        <section className="mt-4 space-y-4">
            <h2 className="text-h2">Listados de inmuebles que te pueden interesar</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {buttons.map(button => (
                    <Link
                        key={button.label}
                        href={button.route}
                        target="_blank"
                        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm transition-all group hover:shadow-md flex items-center justify-between"
                        aria-label={button.label}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="bg-gray-50 p-2 rounded-lg transition-colors group-hover:bg-gray-100"
                                aria-hidden="true"
                            >
                                {button.icon}
                            </div>
                            <header>
                                <h3 className="text-gray-900 font-medium text-sm transition-colors group-hover:text-blue-600">
                                    {button.label}
                                </h3>
                            </header>
                        </div>

                        <div className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all inline-flex items-center">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
