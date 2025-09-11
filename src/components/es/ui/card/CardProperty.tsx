import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";
import { Calendar, Heart, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { formatDate } from '@/src/utils/frontend/format/dateUtils';
import { PropertySearch } from "@/src/features/property/public/schemas/propertyPublic.schema";
import { PROPERTY_CATEGORY_TRANSLATE, PROPERTY_TYPE_TRANSLATE } from "@/src/utils/resolves/bases/enums";
import Image from "next/image";
import { useState } from "react";

type CardPropertyProps = {
  property: PropertySearch
}

export default function CardProperty({ property }: CardPropertyProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hola, estoy interesado en la propiedad: ${property.location} - ${formatCurrency(property.price, property.currency)}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Contactar para propiedad:', property.id);
  };

  return (
    <article className="bg-[#f5f5f5] rounded-lg shadow-sm border border-gray-200 md:h-[295px] overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300 group relative">
      <Link href={property.url} className="flex w-full h-full">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Imagen */}
          <figure className="relative w-full md:w-[320px] lg:h-full lg:w-[425px] flex-shrink-0 overflow-hidden">
            <Image
              alt={`Imagen de la propiedad en ${property.location}`}
              src={property.images?.find(image => image.type === 'MAIN')?.url ?? 'https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg'}
              width={425}
              height={295}
              className="object-cover w-full h-full"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 425px"
            />
          </figure>

          {/* Contenido */}
          <div className="space-y-1 p-4 flex-1 flex flex-col justify-between">
            {/* Header: tipo y precio */}
            <header className="space-y-3">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">
                  {PROPERTY_TYPE_TRANSLATE[property.propertyType]} · {PROPERTY_CATEGORY_TRANSLATE[property.propertyCategory]}
                </span>
                <h2 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(property.price, property.currency)}
                </h2>
              </div>

              {/* Ubicación */}
              <address className="not-italic">
                <p className="text-sm font-normal text-zinc-900">{property.location}</p>
                <p className="text-sm font-normal text-neutral-600 capitalize">{property.district}, {property.department}</p>
              </address>
            </header>

            {/* Descripción */}
            {property.description && (
              <section>
                <p className="text-sm font-normal text-neutral-600 truncate">
                  {property.description}
                </p>
              </section>
            )}

            {/* Detalles: fecha */}
            <div className="flex items-center gap-4 text-neutral-600 pt-1">
              <Calendar className="w-5 h-5" />
              <time className="text-sm" dateTime={property.createdAt.toString()}>
                {formatDate(property.createdAt)}
              </time>
            </div>

            {/* Características */}
            <ul className="flex items-center gap-4 text-neutral-600 pt-1">
              <li className="flex items-center gap-1">
                <span className="text-sm">{property.area}m²</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="text-sm">{property.bedrooms} Dorm</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="text-sm">{property.bathrooms} Baños</span>
              </li>
            </ul>

            {/* Botones de acción */}
            <footer className="flex justify-center items-center md:justify-end gap-3 pt-2">
              <button 
                onClick={handleWhatsAppClick}
                className="flex justify-center w-full md:w-fit items-center gap-2 bg-[#1fa953] hover:bg-[#178541] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button 
                onClick={handleContactClick}
                className="flex justify-center   w-full md:w-fit items-center gap-2 bg-[#0d624e] hover:bg-[#0a4c3d] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Phone className="w-4 h-4" />
                Contactar
              </button>
            </footer>
          </div>
        </div>
      </Link>

      {/* Botón de Favoritos */}
      <button 
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:shadow-xl group/heart"
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-200 ${
            isFavorite 
              ? 'text-red-500 fill-red-500 scale-110' 
              : 'text-gray-600 hover:text-red-500 group-hover/heart:scale-110'
          }`}
        />
      </button>
    </article>
  );
}
