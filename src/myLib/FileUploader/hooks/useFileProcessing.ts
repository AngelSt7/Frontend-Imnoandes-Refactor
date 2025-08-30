import { useState, useRef, useCallback } from 'react'
import { ImageItem } from '../interfaces'
import { generateId, readFileAsDataURL } from '../utils'

export const useFileProcessing = (onError?: (error: string) => void) => {
  const [selectedFiles, setSelectedFiles] = useState<ImageItem[]>([])
  const progressIntervals = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const createFileWithLoading = useCallback((file: File): ImageItem => ({
    id: generateId(),
    type: 'file',
    isLoading: true,
    loadingProgress: 0,
    originalFile: file,
    name: file.name,
    preview: undefined
  }), [])

  const createImageFromUrl = useCallback((url: string): ImageItem => ({
    id: generateId(),
    type: 'url',
    isLoading: false,
    loadingProgress: 100,
    url: url,
    name: extractNameFromUrl(url),
    preview: url
  }), [])

  const extractNameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      const filename = pathname.split('/').pop() || 'image'
      return filename.includes('.') ? filename : `${filename}.jpg`
    } catch {
      return `image-${Date.now()}.jpg`
    }
  }

  const createProcessedFile = useCallback((file: File, existingId?: string): ImageItem => {
    const imageItem: ImageItem = {
      id: existingId || generateId(),
      type: 'file',
      isLoading: false, 
      loadingProgress: 100,
      originalFile: file,
      name: file.name,
      preview: undefined 
    }
    
    readFileAsDataURL(file).then(preview => {
      setSelectedFiles(prev =>
        prev.map(f => f.id === imageItem.id ? { ...f, preview } : f)
      )
    })
    
    return imageItem
  }, [])

  const processFile = useCallback(async (file: File, fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        const preview = reader.result as string
        setSelectedFiles(prev =>
          prev.map(f => f.id === fileId ? { ...f, preview } : f)
        )
        let progress = 0
        const totalDuration = 2500
        const interval = 50
        const increment = 100 / (totalDuration / interval)
        
        const progressInterval = setInterval(() => {
          progress += increment + (Math.random() * 2)
          const currentProgress = Math.min(progress, 100)
          
          setSelectedFiles(prev =>
            prev.map(f => f.id === fileId
              ? { ...f, loadingProgress: currentProgress }
              : f
            )
          )
          
          if (currentProgress >= 100) {
            clearInterval(progressInterval)
            progressIntervals.current.delete(fileId)
            setTimeout(() => {
              setSelectedFiles(prev =>
                prev.map(f => f.id === fileId
                  ? { ...f, isLoading: false }
                  : f
                )
              )
              resolve()
            }, 200)
          }
        }, interval)
        
        progressIntervals.current.set(fileId, progressInterval)
      }
      
      reader.onerror = () => {
        onError?.(`Error al leer el archivo ${file.name}`)
        resolve()
      }
      
      reader.readAsDataURL(file)
    })
  }, [onError])

  const removeFile = useCallback((index: number) => {
    const file = selectedFiles[index]
    if (progressIntervals.current.has(file.id)) {
      clearInterval(progressIntervals.current.get(file.id))
      progressIntervals.current.delete(file.id)
    }
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }, [selectedFiles])

  const replaceFile = useCallback(async (fileId: string, newFile: File) => {
    const processedFile = createProcessedFile(newFile, fileId)
    setSelectedFiles(prev =>
      prev.map(f => f.id === fileId ? processedFile : f)
    )
  }, [createProcessedFile])

  const initializeFromUrls = useCallback((urls: string[]) => {
    const imageItems = urls.map(url => createImageFromUrl(url))
    setSelectedFiles(imageItems)
  }, [createImageFromUrl])

  return {
    selectedFiles,
    setSelectedFiles,
    createFileWithLoading,
    createProcessedFile,
    createImageFromUrl,
    initializeFromUrls,
    processFile,
    removeFile,
    replaceFile
  }
}