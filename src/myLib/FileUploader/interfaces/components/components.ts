import { Control, ControllerProps, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { ChangeEvent, DragEvent } from "react";
import { ImageItem } from "../data/data";
import { ComponentType } from "react";

export interface ImageManagerProps<T extends FieldValues> {
  controller: ComponentType<ControllerProps<T>>;
  name: Path<T>
  control: Control<T>;
  rules?: RegisterOptions<T>;
  errorComponent?: string
  maxFiles?: number
  multiple?: boolean
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  maxFileSize?: number
  onError?: (error: string) => void
  onChange?: (files: string | File | (string | File)[]) => void
}

export interface ImageDropZoneProps {
    isSingle: boolean;
    multiple: boolean;
    maxFiles: number;
    selectedFiles: ImageItem[];
    isDragOver: boolean;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
    openFileSelector: () => void;
    handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    removingIds: Set<string>;
    handleRemove: (fileId: string) => void
}


export interface ImageGridProps {
  files: ImageItem[];
  handleRemove: (id: string) => void;
  removingIds: Set<string>;
}

export interface DragCursorProps {
  isDragOver: boolean;
  multiple: boolean;
  dragPosition: { x: number; y: number };
}
