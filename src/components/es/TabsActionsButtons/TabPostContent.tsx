import { CardAction } from "../CardAction/CardAction"

export default function TabPostContent() {

  return (
    <>

      <CardAction
        title="Publicar mi propiedad"
        description="Vende o alquila tu propiedad de manera rápida y segura. Llega a miles de compradores interesados."
        icon={
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        }
        bgColor="bg-orange-50"
        buttonText="Publicar ahora"
        iconHover="bg-gray-50 group-hover:bg-orange-100 "
        buttonTextColor="text-white"
        onClick={() => window.open('/publicar-propiedad', '_blank')}
        highlightButton
        highlightButtonColor="bg-orange-500 group-hover:bg-orange-600"
        bgHoverColor="hover:bg-orange-50"
        borderHoverColor="hover:border-orange-300"
      />

      <CardAction
        title="Cómo tomar mejores fotos"
        description="Tips profesionales para fotografiar tu propiedad y atraer más compradores potenciales."
        icon={
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
        buttonText="Ver consejos"
        iconHover="bg-gray-50 group-hover:bg-green-100 "
        buttonTextColor="text-green-600"
        bgHoverColor="hover:bg-green-50"
        onClick={() => window.open('/guia-fotos', '_blank')}
      />

    </>
  )
}
