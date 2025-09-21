'use client'

import Image from "next/image"
import { PropertyPublic } from "../../../../schemas"

interface HeaderImagesTabletProps {
  mainImage: PropertyPublic['images'][number]
  galleryImages: PropertyPublic['images']
  remainingCount: number
  onImageClick: (image: PropertyPublic['images'][number]) => void
}

export function HeaderImagesTablet({
  mainImage,
  galleryImages,
  remainingCount,
  onImageClick
}: HeaderImagesTabletProps) {
  return (
    <div className="hidden md:flex lg:hidden md:gap-2 md:h-[350px]">
      {/* Imagen principal */}
      <figure className="flex-[2] group cursor-pointer overflow-hidden rounded-lg relative">
        <Image
          src={mainImage.url}
          alt="Imagen principal de la propiedad"
          fill
          sizes="70vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onImageClick(mainImage)}
          priority
        />
        <figcaption className="sr-only">Imagen principal de la propiedad</figcaption>
      </figure>

      {/* Galería lateral */}
      <div className="flex-1 flex flex-col gap-2">
        {galleryImages.slice(0, 3).map((image, index) => (
          <figure
            key={index}
            className="flex-1 group cursor-pointer overflow-hidden rounded-lg relative"
          >
            <Image
              src={image.url}
              alt={`Imagen de galería ${index + 1}`}
              fill
              sizes="30vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => onImageClick(image)}
            />
            <figcaption className="sr-only">
              Imagen {index + 1} de la galería
            </figcaption>

            {index === 2 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-sm font-semibold">
                  +{remainingCount}
                </span>
              </div>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
