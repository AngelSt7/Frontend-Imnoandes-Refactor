import { Waves, Shield, Droplets, Lightbulb, Wifi, Car, Baby, ArrowUp, Dumbbell, Sparkles } from "lucide-react"
import { PropertyPublic } from "../../../schemas"

interface PropertyServicesProps {
    services: PropertyPublic['services']    
}

const serviceIconMap : Record<string, any> = {
  'piscina': Waves,
  'seguridad-24h': Shield,
  'agua-potable': Droplets,
  'luz': Lightbulb,
  'internet': Wifi,
  'estacionamiento': Car,
  'parque-infantil': Baby,
  'ascensor': ArrowUp,
  'gimnasio': Dumbbell,
  'limpieza': Sparkles
}


export function PropertyServices({ services }: PropertyServicesProps) {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Servicios</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {services.map((service) => {
          const IconComponent = serviceIconMap[service.toLowerCase().replaceAll(' ', '-')]
          const serviceName = service
          
          if (!IconComponent) {
            return null
          }

          return (
            <div
              key={service}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <IconComponent 
                size={24} 
                className="text-blue-600 mb-2" 
              />
              <span className="text-sm text-gray-700 text-center font-medium">
                {serviceName}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}