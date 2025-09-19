'use client'
import { PropertyPublic } from "../../../../schemas"
import { useState } from "react"
import { number } from "zod"

export function useHeaderImages(images: PropertyPublic["images"]) {
  const [showAllImages, setShowAllImages] = useState(false)

  const mockImages = [
    { url: "https://images.adsttc.com/media/images/5b58/a914/f197/cc65/2900/01d5/slideshow/1.jpg?1532537092", type: "MAIN" },
    { url: "https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg", type: "GALLERY" },
    { url: "https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg", type: "GALLERY" },
    { url: "https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg", type: "GALLERY" },
    { url: "https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg", type: "GALLERY" },
  ]

  const imagesArray = images.length > 0 ? images : mockImages

  const mainImage = imagesArray.find(img => img.type === "MAIN")!
  const galleryImages = imagesArray.filter(img => img.type === "GALLERY")

  const getVisibleImages = () => {
    if (showAllImages) return galleryImages
    return galleryImages.slice(0, 4)
  }

  const visibleGalleryImages = getVisibleImages()
  const remainingCount = galleryImages.length - visibleGalleryImages.length

  return {
    mainImage,
    visibleGalleryImages,
    remainingCount,
    imagesArray,
    setShowAllImages,
  }
}
