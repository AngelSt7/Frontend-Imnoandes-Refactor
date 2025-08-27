import { FilePondFile } from "filepond";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { openDefaultEditor } from "@pqina/pintura";
import toast from "react-hot-toast";

interface UseImageManager<T extends FieldValues> {
  initialFile: File | null | undefined;
  field: Path<T>;
  setValue: UseFormSetValue<T>;
  onFileChange: (file: File | null) => void;
  width: number;
  height: number;
}

export const useImageManager = <T extends FieldValues>({
  initialFile,
  field,
  setValue,
  onFileChange,
  width,
  height,
}: UseImageManager<T>) => {
  const [files, setFiles] = useState<any[]>([]);

  const lastFileRef = useRef<File | null>(null);
  const isUpdatingRef = useRef<boolean>(false);

  // refs para errores
  const lastErrorRef = useRef<string>("");
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isValidatingRef = useRef<boolean>(false);

  // Mostrar toast único
  const showUniqueToast = useCallback((message: string) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    if (lastErrorRef.current === message) return;

    lastErrorRef.current = message;
    toast.error(message);

    errorTimeoutRef.current = setTimeout(() => {
      lastErrorRef.current = "";
    }, 2000);
  }, []);

  // efecto inicial
  useEffect(() => {
    if (initialFile) {
      if (lastFileRef.current !== initialFile) {
        setFiles([{ source: initialFile, options: { type: "local" } }]);
        lastFileRef.current = initialFile;
      }
    } else if (files.length > 0) {
      setFiles([]);
      lastFileRef.current = null;
    }
  }, [initialFile, files.length]);

  // actualizar archivos
  const onUpdateFiles = useCallback(
    (items: FilePondFile[]) => {
      if (isUpdatingRef.current) return;
      isUpdatingRef.current = true;

      requestAnimationFrame(() => {
        try {
          const newFile = items[0]?.file ?? null;
          if (lastFileRef.current !== newFile) {
            setValue(field, newFile as any, { shouldValidate: true });
            onFileChange(newFile as File);
            lastFileRef.current = newFile instanceof File ? newFile : null;

            setFiles(prevFiles => {
              const newFiles = items.map(item => item);
              if (JSON.stringify(prevFiles) !== JSON.stringify(newFiles)) {
                return newFiles;
              }
              return prevFiles;
            });
          }
        } catch (error) {
          console.warn("Error updating files:", error);
        } finally {
          setTimeout(() => {
            isUpdatingRef.current = false;
          }, 50);
        }
      });
    },
    [field, setValue, onFileChange]
  );

  // config de editor
  const editorConfig = useMemo(
    () => ({
      open: (file: File, instructions: any, options: any) => {
        return openDefaultEditor({
          src: file,
          ...instructions,
          utils: ["crop", "filter", "finetune", "redact", "decorate"],
          modalClass: "pintura-editor-modal",
          preventScroll: true,
          modal: true,
          modalCloseOnBackdropClick: false,
          enableCanvasRenderingGroup: false,
          enableKeyInput: false,
          imageResizeMaximumDimensions: { width, height },
          imageCropMaxSize: { width, height },
          imageResizeMode: "contain" as const,
        });
      },
    }),
    [width, height]
  );

  // validación antes de agregar archivo
  const handleBeforeAddFile = useCallback(
    async (item: any) => {
      const file = item.file as File;
      if (isValidatingRef.current) return false;
      isValidatingRef.current = true;

      try {
        const allowedTypes = ["image/png", "image/jpeg"];
        if (!allowedTypes.includes(file.type)) {
          showUniqueToast("Solo se permiten archivos PNG y JPEG");
          return false;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          showUniqueToast("La imagen es demasiado pesada (máximo 5MB)");
          return false;
        }
        return true;
      } catch {
        showUniqueToast("Error al validar la imagen");
        return false;
      } finally {
        setTimeout(() => {
          isValidatingRef.current = false;
        }, 100);
      }
    },
    [showUniqueToast]
  );

  // manejar errores al subir archivo
  const handleAddFile = useCallback(
    (err: any, file: any) => {
      if (err) {
        const nativeErrors = [
          "Can't load URL",
          "Image size validation failed",
          "File type validation failed",
        ];
        if (nativeErrors.some(errText => err.body?.includes(errText))) return;
        showUniqueToast(err.main || "Error al subir la imagen");
      }
    },
    [showUniqueToast]
  );

  return useMemo(
    () => ({
      files,
      onUpdateFiles,
      editorConfig,
      handleBeforeAddFile,
      handleAddFile,
    }),
    [files, onUpdateFiles, editorConfig, handleBeforeAddFile, handleAddFile]
  );
};
