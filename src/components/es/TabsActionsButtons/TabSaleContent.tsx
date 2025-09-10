import { CardAction } from "../CardAction/CardAction"

export default function TabSaleContent() {
  return (
    <>

      <CardAction
        title="Guía de compra paso a paso"
        description="Todo lo que necesitas saber para comprar tu primera vivienda sin complicaciones."
        icon={
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 12 2 2 4-4" />
          </svg>
        }
        buttonText="Ver guía completa"
        iconHover="bg-gray-50 group-hover:bg-blue-100 "
        buttonTextColor="text-blue-600"
        bgHoverColor="hover:bg-blue-50"
        onClick={() => window.open('/guia-compra', '_blank')}
      />

      <CardAction
        title="Buscar propiedades"
        description="Encuentra la propiedad ideal según tus necesidades y presupuesto en nuestro buscador."
        icon={
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
        }
        buttonText="Ir al buscador"
        iconHover="bg-gray-50 group-hover:bg-purple-100 "
        buttonTextColor="text-purple-600"
        bgHoverColor="hover:bg-purple-50"
        onClick={() => window.open('/search', '_blank')}
      />

    </>
  )
}
