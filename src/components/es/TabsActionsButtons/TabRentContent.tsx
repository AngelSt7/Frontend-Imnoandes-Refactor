import React from 'react'
import { CardAction } from '../CardAction/CardAction'

export default function TabRentContent() {

  return (
    <>

      <CardAction
        title="Guía para alquilar"
        description="Lo que necesitas saber a la hora de alquilar en un solo lugar."
        icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>}
        buttonText="Conocer más"
        buttonTextColor="text-orange-600"
        iconHover="bg-gray-50 group-hover:bg-orange-100 "
        bgHoverColor="hover:bg-orange-50"
        onClick={() => window.open('/guia-alquiler', '_blank')}
      />

      <CardAction
        title="Nuestro blog"
        description="Consejos, novedades y noticias del ámbito de la construcción y el mercado inmobiliario."
        icon={
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-2 4h.01" />
          </svg>
        }
        requiredButton={false}
        iconHover="bg-gray-50 group-hover:bg-green-100 "
        bgHoverColor="hover:bg-green-50"
      />

    </>
  )
}