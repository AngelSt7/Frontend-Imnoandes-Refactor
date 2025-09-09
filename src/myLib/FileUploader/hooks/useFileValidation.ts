import { UseImageManagerProps } from '../interfaces'
import { readFileAsDataURL, resolveMB } from '../utils'

export const useFileValidation = (props: Pick<UseImageManagerProps, 'maxFileSize' | 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight' | 'onError' | 'allowedTypes'>) => {

  const resolveMaxFileSize = resolveMB(props.maxFileSize || 10)

  const validateFile = async (file: File): Promise<boolean> => {
    if (props.allowedTypes && !props.allowedTypes.includes(file.type)) {
      props.onError?.(`El tipo de archivo ${file.type} no está permitido`);
      return false;
    }

    if (resolveMaxFileSize && file.size > resolveMaxFileSize) {
      props.onError?.(`El archivo ${file.name} excede el tamaño máximo (${(file.size / (1024 * 1024)).toFixed(1)} MB)`)
      return false
    }

    if (props.minWidth || props.minHeight || props.maxWidth || props.maxHeight) {
      const preview = await readFileAsDataURL(file)
      const { width, height } = await new Promise<{ width: number; height: number }>((resolve) => {
        const img = new Image()
        img.onload = () => resolve({ width: img.width, height: img.height })
        img.onerror = () => resolve({ width: 0, height: 0 })
        img.src = preview
      })

      const validations = [
        { condition: props.minWidth && width < props.minWidth, message: `El ancho de ${file.name} es muy pequeño (${width}px, mínimo ${props.minWidth}px)` },
        { condition: props.minHeight && height < props.minHeight, message: `La altura de ${file.name} es muy pequeña (${height}px, mínimo ${props.minHeight}px)` },
        { condition: props.maxWidth && width > props.maxWidth, message: `El ancho de ${file.name} es demasiado grande (${width}px, máximo ${props.maxWidth}px)` },
        { condition: props.maxHeight && height > props.maxHeight, message: `La altura de ${file.name} es demasiado grande (${height}px, máximo ${props.maxHeight}px)` }
      ]

      for (const { condition, message } of validations) {
        if (condition) {
          props.onError?.(message)
          return false
        }
      }
    }

    return true
  }

  return { validateFile }
}