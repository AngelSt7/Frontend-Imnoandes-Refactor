import { useState, useCallback } from 'react'

export const useDragAndDrop = () => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
    setDragPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }, [])

  return {
    isDragOver,
    setIsDragOver,
    dragPosition,
    handleDragOver,
    handleDragLeave
  }
}