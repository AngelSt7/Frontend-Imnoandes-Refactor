import { Waves, Shield, Droplets, Lightbulb, Wifi, Car, Baby, ArrowUp, Dumbbell, Sparkles } from "lucide-react"
import { PropertyPublic } from "../../../schemas"

interface PropertyServicesProps {
  services: PropertyPublic['services']    
}

const serviceIconMap: Record<string, any> = {
  'piscina': Waves,
  'seguridad-24h': Shield,
  'agua-potable': Droplets,
  'luz': Lightbulb,
  'internet': Wifi,
  'estacionamiento': Car,
  'parque-infantil': Baby,
  'ascensor': ArrowUp,
  'gimnasio': Dumbbell,
  'limpieza': Sparkles,
}

const serviceColorMap: Record<string, string> = {
  'piscina': 'text-blue-500',
  'seguridad-24h': 'text-green-600',
  'agua-potable': 'text-cyan-500',
  'luz': 'text-yellow-500',
  'internet': 'text-purple-500',
  'estacionamiento': 'text-gray-600',
  'parque-infantil': 'text-pink-500',
  'ascensor': 'text-indigo-500',
  'gimnasio': 'text-red-500',
  'limpieza': 'text-emerald-500',
}

export function PropertyServices({ services }: PropertyServicesProps) {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <section className="space-y-4 mt-6 mb-4 pb-2 border-b border-gray-200">
      <h2 className="text-xl font-bold mb-2 text-gray-900">Servicios</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {services.map((service) => {
          const serviceKey = service.toLowerCase().replaceAll(' ', '-')
          const IconComponent = serviceIconMap[serviceKey]
          const iconColor = serviceColorMap[serviceKey] || 'text-blue-600'
          const serviceName = service
          
          if (!IconComponent) {
            return null
          }

          return (
            <li
              key={service}
              className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <IconComponent 
                size={24} 
                className={`${iconColor} mb-2`}
              />
              <span className="text-sm text-gray-700 text-center font-medium">
                {serviceName}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}