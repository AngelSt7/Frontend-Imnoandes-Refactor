export interface UseImageManagerProps {
  maxFiles?: number
  multiple?: boolean
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  maxFileSize?: number
  allowedTypes: string[]
  onError?: (error: string) => void
  value?: string | File | (string | File)[] 
  onChange?: (files: string | File | (string | File)[]) => void;
}