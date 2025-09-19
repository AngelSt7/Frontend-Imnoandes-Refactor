'use client'
import { useEffect, useState } from "react"
import { PropertyPublic } from "../../../../schemas"

export function useHeaderImagesOverlay(images: PropertyPublic["images"]) {
  const [metaOverlay, setMetaOverlay] = useState({ show: false, image: "", index: 0 })

  const openOverlay = (url: string) => {
    const idx = images.findIndex(img => img.url === url)
    setMetaOverlay({ show: true, image: url, index: idx >= 0 ? idx : 0 })
  }

  const closeOverlay = () => setMetaOverlay({ show: false, image: "", index: 0 })

  const showPrev = () => {
    if (images.length === 0) return
    const prevIndex = (metaOverlay.index - 1 + images.length) % images.length
    setMetaOverlay({ show: true, image: images[prevIndex].url, index: prevIndex })
  }

  const showNext = () => {
    if (images.length === 0) return
    const nextIndex = (metaOverlay.index + 1) % images.length
    setMetaOverlay({ show: true, image: images[nextIndex].url, index: nextIndex })
  }

  // teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!metaOverlay.show) return

      if (e.key === "ArrowLeft") showPrev()
      if (e.key === "ArrowRight") showNext()
      if (e.key === "Escape") closeOverlay()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [metaOverlay.show, metaOverlay.index, images])

  const currentImage = images[metaOverlay.index]

  return {
    metaOverlay,
    currentIndex: metaOverlay.index,
    currentImage,
    openOverlay,
    closeOverlay,
    showPrev,
    showNext,
  }
}
