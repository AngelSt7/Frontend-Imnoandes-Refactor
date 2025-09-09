import React from 'react'
import { DetailsPropertyProps } from '../actions/DetailsProperty'
import { Home, Car } from 'lucide-react'

export default function Services({ data }: DetailsPropertyProps) {

    return (


        <section
            aria-labelledby="services-title"
            className="bg-gray-100 rounded-3xl p-8 shadow mt-8"
        >
            <h2
                id="services-title"
                className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
            >
                <Home className="w-7 h-7" />
                Servicios
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.services!.map(service => (
                    <div
                        key={service}
                        className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-inner"
                    >
                        <div className="flex items-center gap-3">
                            <Car className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">{service}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )

}
