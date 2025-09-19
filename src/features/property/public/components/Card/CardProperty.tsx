'use client';

import Link from "next/link";
import { useState } from "react";
import { PropertySearch } from "@/src/features/property/public/schemas/propertyPublic.schema";
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";
import { PropertyImage } from "./components/PropertyImage";
import { PropertyHeader } from "./components/PropertyHeader";
import { PropertyLocation } from "./components/PropertyLocation";
import { PropertyDescription } from "./components/PropertyDescription";
import { PropertyDetails } from "./components/PropertyDetails";
import { PropertyActions } from "./components/PropertyActions";
import { FavoriteButton } from "./components/FavoriteButton";

type CardPropertyProps = {
  property: PropertySearch
}

export function CardProperty({ property }: CardPropertyProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setIsFavorite(!isFavorite); };
  const handleWhatsAppClick = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); window.open(`https://wa.me/?text=${encodeURIComponent(`Hola, estoy interesado en la propiedad ubicada en ${property.address} - ${formatCurrency(property.price, property.currency)}`)}`, '_blank'); };
  const handleContactClick = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); console.log('Contactar para propiedad:', property.id); };

  return (
    <article className="bg-[#f5f5f5] rounded-lg shadow-sm border border-gray-200 md:h-[295px] overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300 group relative">
      <Link href={property.url} className="flex w-full h-full" target="_blank">
        <div className="flex flex-col md:flex-row w-full h-full">
          <PropertyImage images={[
            {
              url: 'https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg',
              type: 'MAIN',

            },
            {
              url: 'https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg',
              type: 'GALLERY',
            },
          ]} location={property.address} />
          <div className="space-y-1 p-4 flex-1 flex flex-col justify-between">
            <PropertyHeader type={property.propertyType} category={property.propertyCategory} price={property.price} currency={property.currency} />
            <PropertyLocation location={property.address} district={property.district!} department={property.department!} />
            <PropertyDescription description={property.description} />
            <PropertyDetails createdAt={property.createdAt} area={property.area!} bedrooms={property.bedrooms!} bathrooms={property.bathrooms!} />
            <PropertyActions onWhatsApp={handleWhatsAppClick} onContact={handleContactClick} />
          </div>
        </div>
      </Link>
      <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick} />
    </article>
  );
}
