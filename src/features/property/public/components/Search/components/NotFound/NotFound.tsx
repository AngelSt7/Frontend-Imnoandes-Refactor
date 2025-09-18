import { useRouter } from "next/navigation"

export function NotFound() {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-6">
                    <svg
                        className="w-20 h-20 mx-auto text-zinc-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                </div>

                <h3 className="text-xl font-semibold text-zinc-800 mb-2">
                    No se encontraron propiedades
                </h3>

                <p className="text-zinc-600 mb-6 leading-relaxed">
                    No hay propiedades que coincidan con tus criterios de búsqueda.
                    Intenta ajustar los filtros o realizar una nueva búsqueda.
                </p>

                <button
                    onClick={() => router.push('/es/search/venta-de-departamentos')}
                    className="inline-flex items-center px-6 py-3 border border-zinc-300 rounded-lg text-zinc-700 font-medium hover:border-zinc-400 hover:text-zinc-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                    Limpiar filtros
                </button>
            </div>
        </div>
    )
}
