'use client'

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
      <div className="flex-[2] group cursor-pointer overflow-hidden rounded-lg">
        <img
          src={mainImage.url}
          alt="Imagen principal"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onImageClick(mainImage)}
        />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {galleryImages.slice(0, 3).map((image, index) => (
          <div key={index} className="flex-1 group cursor-pointer overflow-hidden rounded-lg relative">
            <img
              src={image.url}
              alt={`Galería ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => onImageClick(image)}
            />

            {index === 2 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-sm font-semibold">
                  +{remainingCount}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
