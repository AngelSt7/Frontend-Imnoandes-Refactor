'use client'

import { HeaderMenu } from "@/src/components";

export default function Page() {

  return (
    <div className=" bg-[#ffffff] ">

      <HeaderMenu fadeOnClose={false} bgColor="#00bb2d" />

      {/* Demo Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8 ">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-8">
            Header with Burger Menu
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            En pantallas pequeñas (menos de md), el menú se oculta y aparece un botón hamburguesa.
            Al presionarlo, el menú se desliza desde la derecha con una animación suave.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Card {i + 1}
                </h3>
                <p className="text-gray-600">
                  Contenido de ejemplo para demostrar el scroll y el efecto del header.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

