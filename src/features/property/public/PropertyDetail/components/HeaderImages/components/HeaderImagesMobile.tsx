'use client'

import { PropertyPublic } from "../../../../schemas"

interface HeaderImagesMobileProps {
  mainImage: PropertyPublic['images'][number]
  onImageClick: (image: PropertyPublic['images'][number]) => void
}

export function HeaderImagesMobile({
  mainImage,
  onImageClick
}: HeaderImagesMobileProps) {
  return (
    <div className="flex flex-col gap-2 md:hidden">
      <div className="h-[250px] group cursor-pointer overflow-hidden rounded-lg">
        <img
          src={mainImage.url}
          alt="Imagen principal"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onImageClick(mainImage)}
        />
      </div>
    </div>
  )
}
