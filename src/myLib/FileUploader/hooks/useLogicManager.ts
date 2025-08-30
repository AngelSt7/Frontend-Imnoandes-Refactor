import { useCallback, useEffect, useState } from 'react'
import { useDragAndDrop, useFileProcessing, useFileRemoval, useFileValidation } from '.'
import { ImageItem, UseImageManagerProps } from '../interfaces'

export const useLogicManager = (props: UseImageManagerProps) => {
  const { maxFiles = 5, multiple, onError, value = [], onChange } = props
  const { validateFile } = useFileValidation(props)
  const { 
    selectedFiles, 
    setSelectedFiles, 
    createFileWithLoading, 
    processFile, 
    removeFile, 
    replaceFile 
  } = useFileProcessing(onError)
  
  const { isDragOver, setIsDragOver, dragPosition, handleDragOver, handleDragLeave } = useDragAndDrop()
  const { removingIds, handleRemove } = useFileRemoval()

  const [wasOriginalSingle, setWasOriginalSingle] = useState(false)

  const normalizeValue = useCallback((inputValue: string | File | (string | File)[]): ImageItem[] => {
    if (!inputValue) return []
    
    const arrayValue = Array.isArray(inputValue) ? inputValue : [inputValue]
    
    return arrayValue.map(item => {
      if (typeof item === 'string') {
        return {
          id: generateId(),
          type: 'url' as const,
          isLoading: false,
          loadingProgress: 100,
          url: item,
          name: extractNameFromUrl(item),
          preview: item
        }
      }
      
      if (item instanceof File) {
        return {
          id: generateId(),
          type: 'file' as const,
          isLoading: false,
          loadingProgress: 100,
          originalFile: item,
          name: item.name,
          preview: undefined 
        }
      }
      
      return {
        id: generateId(),
        type: 'url' as const,
        isLoading: false,
        loadingProgress: 100,
        url: '',
        name: 'unknown',
        preview: ''
      }
    })
  }, [])

  const denormalizeValue = useCallback((imageItems: ImageItem[]): string | File | (string | File)[] => {
    const denormalizedItems = imageItems.map(item => {
      if (item.type === 'url' && item.url) {
        return item.url
      }
      if (item.type === 'file' && item.originalFile) {
        return item.originalFile
      }
      return item.url || ''
    }).filter(item => item !== '') 
    
    if (wasOriginalSingle && denormalizedItems.length <= 1) {
      return denormalizedItems[0] || ''
    }
    
    return denormalizedItems
  }, [wasOriginalSingle])

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

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  useEffect(() => {
    if (value !== undefined) {
      const isSingle = !Array.isArray(value)
      setWasOriginalSingle(isSingle)
      
      const normalizedValue = normalizeValue(value)
      
      const shouldUpdate = normalizedValue.length !== selectedFiles.length ||
        normalizedValue.some((item, index) => {
          const current = selectedFiles[index]
          if (!current) return true
          
          if (item.type === 'url' && current.type === 'url') {
            return item.url !== current.url
          }
          if (item.type === 'file' && current.type === 'file') {
            return item.originalFile?.name !== current.originalFile?.name ||
                   item.originalFile?.size !== current.originalFile?.size
          }
          return item.type !== current.type
        })
      
      if (shouldUpdate) {
        setSelectedFiles(normalizedValue)
        
        normalizedValue.forEach(async (item) => {
          if (item.type === 'file' && item.originalFile && !item.preview) {
            try {
              const preview = await readFileAsDataURL(item.originalFile)
              setSelectedFiles(prev =>
                prev.map(f => f.id === item.id ? { ...f, preview } : f)
              )
            } catch (error) {
            }
          }
        })
      }
    }
  }, [value, selectedFiles.length, normalizeValue])

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const updateFiles = useCallback((newFiles: ImageItem[]) => {
    setSelectedFiles(newFiles)
    const denormalizedFiles = denormalizeValue(newFiles)
    onChange?.(denormalizedFiles)
  }, [onChange, setSelectedFiles, denormalizeValue])

  const processFiles = useCallback(async (files: File[]) => {
    const filesToProcess = files.slice(0, multiple ? maxFiles - selectedFiles.length : 1)

    for (const file of filesToProcess) {
      const isValid = await validateFile(file)
      if (!isValid) continue

      const fileWithLoading = createFileWithLoading(file)
      const newFiles = multiple ? [...selectedFiles, fileWithLoading] : [fileWithLoading]
      updateFiles(newFiles)
      await processFile(file, fileWithLoading.id)
    }
  }, [validateFile, createFileWithLoading, processFile, multiple, maxFiles, selectedFiles, updateFiles])

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"))
    if (files.length === 0) return
    await processFiles(files)
  }, [setIsDragOver, processFiles])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files).filter(f => f.type.startsWith("image/"))
    if (files.length === 0) return
    await processFiles(files)
    e.target.value = ""
  }, [processFiles])

  const openFileSelector = useCallback(() => {
    const input = document.getElementById("fileInput") as HTMLInputElement | null
    input?.click()
  }, [])

  const handleRemoveFile = useCallback((fileId: string) => {
    handleRemove(fileId, removeFile, selectedFiles)
  }, [handleRemove, removeFile, selectedFiles])

  return {
    selectedFiles,
    removeFile,
    openFileSelector,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragOver,
    dragPosition,
    replaceFile,
    removingIds,
    handleRemove: handleRemoveFile
  }
}