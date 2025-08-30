export interface ImageItem {
  id: string
  type: 'file' | 'url'
  isLoading?: boolean
  preview?: string
  loadingProgress?: number
  name: string
  originalFile?: File
  url?: string
  size?: number
}