import { FilePondFile } from "filepond";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { openDefaultEditor } from "@pqina/pintura";
import toast from "react-hot-toast";

interface UseImageManager<T extends FieldValues> {
  initialFile: File | File[] | null | undefined;
  field: Path<T>;
  setValue: UseFormSetValue<T>;
  onFileChange: (file: File | File[] | null) => void;
  width: number;
  height: number;
  multiple?: boolean;
  validation: {
    minWidth?: number;
    minHeight?: number;
    maxFileSizeMB?: number;
    allowedTypes?: string[];
  };
}

export const useImageManager = <T extends FieldValues>({
  initialFile,
  field,
  setValue,
  onFileChange,
  width,
  height,
  multiple = false,
  validation
}: UseImageManager<T>) => {
  const didMountRef = useRef(false);
  const [files, setFiles] = useState<any[]>([]);
  const lastFileRef = useRef<File | File[] | null>(null);
  const isUpdatingRef = useRef<boolean>(false);
  const lastErrorRef = useRef<string>("");
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isValidatingRef = useRef<boolean>(false);

  // Control de inicialización más simple
  const lastInitialFileRef = useRef<File | File[] | null | undefined>(null);
  const initializationCountRef = useRef<number>(0);
  const isFirstMountRef = useRef<boolean>(true);

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

  // Función para comparar archivos
  const areFilesEqual = useCallback((file1: File, file2: File) => {
    return file1.name === file2.name &&
      file1.size === file2.size &&
      file1.lastModified === file2.lastModified;
  }, []);

  // Función para comparar arrays de archivos
  const areFileArraysEqual = useCallback((arr1: File[], arr2: File[]) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((file1, index) => areFilesEqual(file1, arr2[index]));
  }, [areFilesEqual]);


  useEffect(() => {
    // Evitar re-sync si no cambió
    if (lastInitialFileRef.current === initialFile) return;

    lastInitialFileRef.current = initialFile;

    if (!initialFile) {
      if (files.length > 0) {
        setFiles([]);
        lastFileRef.current = multiple ? [] : null;
      }
      return;
    }

    if (multiple && Array.isArray(initialFile)) {
      const currentFiles = files.map(f => f.source).filter(Boolean) as File[];
      if (!areFileArraysEqual(currentFiles, initialFile)) {
        setFiles(initialFile.map(f => ({
          source: f,
          options: {
            type: "local"
          }
        })));
        lastFileRef.current = initialFile;
      }
    } else if (!multiple && initialFile instanceof File) {
      const currentFile = files[0]?.source;
      if (!currentFile || !areFilesEqual(currentFile, initialFile)) {
        setFiles([{ source: initialFile, options: { type: "local" } }]);
        lastFileRef.current = initialFile;
      }
    }

    // Desactivar flag de primer render
    if (isFirstMountRef.current) {
      setTimeout(() => { isFirstMountRef.current = false }, 100);
    }
  }, [initialFile, multiple, files, areFileArraysEqual, areFilesEqual]);





  // ⬇️ Aquí insertamos el nuevo efecto
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const currentFiles = files.map(f => f.source).filter(Boolean) as File[];

    if (multiple) {
      const prev = (lastFileRef.current as File[]) || [];
      const changed = !areFileArraysEqual(prev, currentFiles);
      if (changed) {
        onFileChange(currentFiles.length > 0 ? currentFiles : null);
        lastFileRef.current = currentFiles;
      }
    } else {
      const prev = (lastFileRef.current as File | null) ?? null;
      const current = currentFiles[0] ?? null;
      const changed = (prev && current) ? !areFilesEqual(prev, current) : prev !== current;
      if (changed) {
        onFileChange(current);
        lastFileRef.current = current;
      }
    }
  }, [files, multiple, onFileChange, areFilesEqual, areFileArraysEqual]);


  const onUpdateFiles = useCallback(
    (items: FilePondFile[]) => {
      const itemCount = items.length;
      console.log("onUpdateFiles called with", itemCount, "items");

      if (isUpdatingRef.current) {
        console.log("Skipping update - already updating");
        return;
      }

      initializationCountRef.current++;
      const currentInitCount = initializationCountRef.current;

      if (isFirstMountRef.current && currentInitCount <= 4) {
        const expectedCount = Array.isArray(initialFile) ? initialFile.length : (initialFile ? 1 : 0);

        if (isFirstMountRef.current) {
          if (expectedCount > 0 && itemCount < expectedCount) {
            console.log("Ignoring partial mount update");
            return;
          }
          if (expectedCount === itemCount) {
            console.log("Mount sync OK");
            isFirstMountRef.current = false;
          }
        }

        if (expectedCount === itemCount && itemCount > 0) {
          console.log("Updating files state during early mounting");
          setFiles(items.map((i) => ({
            source: i.file,
            options: { type: "local" }
          })));
          return;
        }
      }

      isUpdatingRef.current = true;

      requestAnimationFrame(() => {
        try {
          const newFiles = items.map((i) => i.file).filter(Boolean) as File[];

          if (multiple) {
            const currentFiles = lastFileRef.current as File[] || [];

            if (!areFileArraysEqual(currentFiles, newFiles)) {
              console.log("Updating multiple files - files changed from", currentFiles.length, "to", newFiles.length);
              setValue(field, newFiles as any, { shouldValidate: true });
              onFileChange(newFiles);
              lastFileRef.current = newFiles;
            } else {
              console.log("Files are the same - skipping update");
            }
          } else {
            const newFile = newFiles[0] ?? null;
            const currentFile = lastFileRef.current as File | null;

            const filesAreDifferent = (newFile && currentFile)
              ? !areFilesEqual(newFile, currentFile)
              : newFile !== currentFile;

            if (filesAreDifferent) {
              console.log("Updating single file - file changed");
              setValue(field, newFile as any, { shouldValidate: true });
              onFileChange(newFile);
              lastFileRef.current = newFile;
            } else {
              console.log("File is the same - skipping update");
            }
          }

          setFiles(items.map((i) => ({
            source: i.file,
            options: { type: "local" }
          })));

        } catch (error) {
          console.warn("Error updating files:", error);
        } finally {
          setTimeout(() => {
            isUpdatingRef.current = false;
          }, 50);
        }
      });
    },
    [field, setValue, onFileChange, multiple, areFilesEqual, areFileArraysEqual, initialFile]
  );

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

  const handleBeforeAddFile = useCallback(
    async (item: any) => {
      const file = item.file as File;
      if (isValidatingRef.current) return false;
      isValidatingRef.current = true;

      try {
        const allowedTypes = validation.allowedTypes ?? ["image/png", "image/jpeg"];
        if (!allowedTypes.includes(file.type)) {
          showUniqueToast("Tipo de archivo no permitido");
          return false;
        }

        const maxSize = (validation.maxFileSizeMB ?? 5) * 1024 * 1024;
        if (file.size > maxSize) {
          showUniqueToast(`La imagen es demasiado pesada (máximo ${validation.maxFileSizeMB}MB)`);
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
    [showUniqueToast, validation]
  );

  const handleAddFile = useCallback(
    (err: any, file: any) => {
      if (err) {
        const nativeErrors = [
          "Can't load URL",
          "Image size validation failed",
          "File type validation failed",
        ];
        if (nativeErrors.some((errText) => err.body?.includes(errText))) return;
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