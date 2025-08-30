import { ImageItem } from "../interfaces/data/data"

export const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now()

export const resolveMB = (size: number) => size * 1024 * 1024

export const formatFileSize = (file: ImageItem): string => {
  const bytes = file.originalFile?.size || file.size || 0
  if (!bytes || bytes === 0 || isNaN(bytes)) return "0.0 MB"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

export const getImageDimensions = (file: ImageItem): Promise<{ width: number, height: number }> => {
  return new Promise((resolve) => {
    if (!file.preview) {
      resolve({ width: 0, height: 0 })
      return
    }
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = () => resolve({ width: 0, height: 0 })
    img.src = file.preview
  })
}

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}