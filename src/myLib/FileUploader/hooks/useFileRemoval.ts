import { useState, useCallback } from 'react'

export const useFileRemoval = () => {
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())

  const handleRemove = useCallback((fileId: string, removeFile: (index: number) => void, selectedFiles: any[]) => {
    setRemovingIds(prev => new Set(prev).add(fileId))
    
    setTimeout(() => {
      const idx = selectedFiles.findIndex(f => f.id === fileId)
      if (idx !== -1) removeFile(idx)
      setRemovingIds(prev => {
        const next = new Set(prev)
        next.delete(fileId)
        return next
      })
    }, 300) 
  }, [])

  return {
    removingIds,
    handleRemove
  }
}