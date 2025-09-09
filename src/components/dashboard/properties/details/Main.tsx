import { Home, Square, Bed, Bath, Calendar, Car, Users, CheckCircle, MapPin } from 'lucide-react'
import React from 'react'
import { DetailsPropertyProps } from '../actions/DetailsProperty'

export default function Main({ data }: DetailsPropertyProps) {
  return (
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Features */}
        <section
          aria-labelledby="features-title"
          className="bg-gray-100 rounded-3xl p-8 shadow"
        >
          <h2
            id="features-title"
            className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
          >
            <Home className="w-7 h-7" />
            Características
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {data.area && (
              <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
                <div className="flex items-center gap-3 mb-2">
                  <Square className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm">Área</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {data.area} m²
                </div>
              </div>
            )}

            {data.bedrooms && (
              <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
                <div className="flex items-center gap-3 mb-2">
                  <Bed className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm">Dormitorios</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {data.bedrooms}
                </div>
              </div>
            )}

            {data.bathrooms && (
              <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
                <div className="flex items-center gap-3 mb-2">
                  <Bath className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm">Baños</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {data.bathrooms}
                </div>
              </div>
            )}

            {data.yearBuilt && (
              <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 text-sm">Año</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {data.yearBuilt}
                </div>
              </div>
            )}
          </div>

          {(data.hasTerrace || data.hasParking || data.furnished) && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Servicios adicionales
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {data.hasParking && (
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-inner">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Estacionamiento</span>
                    </div>
                    <span className="text-gray-800 font-medium">
                      {data.parkingSpaces
                        ? `${data.parkingSpaces} espacios`
                        : 'Disponible'}
                    </span>
                  </div>
                )}

                {data.hasTerrace && (
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-inner">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Terraza</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                )}

                {data.furnished && (
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-inner">
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Amoblado</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Location */}
        <section
          aria-labelledby="location-title"
          className="bg-gray-100 rounded-3xl p-8 shadow"
        >
          <h2
            id="location-title"
            className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
          >
            <MapPin className="w-7 h-7" />
            Ubicación
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
              <div className="text-sm text-gray-600 mb-1">Departamento</div>
              <div className="text-lg font-semibold text-gray-800">
                {data.departament}
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
              <div className="text-sm text-gray-600 mb-1">Provincia</div>
              <div className="text-lg font-semibold text-gray-800">
                {data.province}
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
              <div className="text-sm text-gray-600 mb-1">Distrito</div>
              <div className="text-lg font-semibold text-gray-800">
                {data.district}
              </div>
            </div>

            {data.floor && (
              <div className="bg-gray-100 rounded-2xl p-4 shadow-inner">
                <div className="text-sm text-gray-600 mb-1">Piso</div>
                <div className="text-lg font-semibold text-gray-800">
                  {data.floor}°
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
  )
}
