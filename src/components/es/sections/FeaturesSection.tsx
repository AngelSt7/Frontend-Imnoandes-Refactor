import { Search, Target, Home, Award } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 text-gray-700" />,
      title: "Búsqueda clara y rápida",
      description: "Pensamos nuestros filtros y mapas para simplificar tu experiencia en nuestro portal."
    },
    {
      id: 2,
      icon: <Target className="w-8 h-8 text-gray-700" />,
      title: "Tienes tu propia sección",
      description: "Accede de forma fácil y segura a los avisos contactados, favoritos, las notas que creaste y más."
    },
    {
      id: 3,
      icon: <Home className="w-8 h-8 text-gray-700" />,
      title: "Variedad de anunciantes",
      description: "Inmobiliarias y dueños directos de todo el país ofrecen las mejores opciones de inmuebles para ti."
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8 text-gray-700" />,
      title: "¡Somos IMNOANDES!",
      description: "12 años en el mercado y 3.2 millones de avisos publicados nos respaldan en la búsqueda de tu hogar."
    }
  ]

  return (
    <section aria-label="Características de Urbania" className="bg-gray-50 mt-4 space-y-4">
        <h2 className='text-h2'>Te acompañamos en cada paso</h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <article 
              key={feature.id}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 p-3 rounded-full" aria-hidden="true">
                  {feature.icon}
                </div>
              </div>
              
              <header>
                <h3 className="font-semibold text-gray-900 text-lg mb-3">
                  {feature.title}
                </h3>
              </header>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
