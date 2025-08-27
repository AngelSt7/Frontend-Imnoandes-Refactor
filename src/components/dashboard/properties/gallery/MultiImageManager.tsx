import { useState, useEffect, useRef } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { openDefaultEditor } from "@pqina/pintura";
import "@pqina/pintura/pintura.css";
// Plugins de FilePond
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

type ImageManagerProps<T extends FieldValues> = {
  field: Path<T>;
  htmlFor: Path<T>;
  errorMessage?: FieldError;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  rules?: RegisterOptions<T>;
  persistedFiles?: any[];
  setPersistentFiles?: (files: any[]) => void;
  // ✨ Nueva prop de callback para múltiples archivos
  onImagesChange?: (files: File[], filesData?: any[]) => void;
};

export default function MultiImageManager<T extends FieldValues>({
  field,
  htmlFor,
  errorMessage,
  register,
  setValue,
  rules = {},
  persistedFiles = [],
  setPersistentFiles,
  onImagesChange, // ✨ Destructuramos el callback
}: ImageManagerProps<T>) {
  const [files, setFiles] = useState<any[]>(persistedFiles);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincronizar con el estado padre cuando los archivos cambien
  const handleFilesUpdate = (newFiles: any[]) => {
    setFiles(newFiles);
    
    if (setPersistentFiles) {
      setPersistentFiles(newFiles);
    }

    // ✨ Ejecutar el callback cuando cambien las imágenes
    if (onImagesChange) {
      const realFiles: File[] = [];
      const allFilesData: any[] = [];

      newFiles.forEach((fileItem) => {
        allFilesData.push(fileItem);
        if (fileItem.file instanceof File) {
          realFiles.push(fileItem.file);
        }
      });

      onImagesChange(realFiles, allFilesData);
    }
  };

  // sincronizar FilePond -> RHF
  useEffect(() => {
    setValue(
      field,
      files.map((f) => f.file) as any,
      { shouldValidate: true }
    );
  }, [files, field, setValue]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full gap-2 relative"
    >
      <input type="hidden" {...register(field, rules)} />
      
      <div className="multi-image-filepond">
        <FilePond
          files={files}
          onupdatefiles={handleFilesUpdate}
          allowMultiple={true}
          maxFiles={10}
          acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}
          name={`${field}_filepond`}
          imagePreviewHeight={170}
          styleLoadIndicatorPosition="center bottom"
          styleProgressIndicatorPosition="right bottom"
          styleButtonRemoveItemPosition="top left"
          styleButtonProcessItemPosition="center center"
          imageEditEditor={{
            open: (file: File, instructions: any, options: any) => {
              return openDefaultEditor({
                src: file,
                ...instructions,
                utils: ["crop", "filter", "finetune", "redact", "decorate"],
                modalClass: "pintura-editor-modal",
                preventScroll: true,
                modal: true,
                appendTo: containerRef.current,
                size: { width: "80%", height: "70vh" },
                layoutHorizontalToolbarItems: ["close", "done"],
                imageCropMaxSize: {
                  width: 800,
                  height: 800,
                },
                imageCropLimitToImage: true,
              });
            },
          }}
          imageEditInstantEdit={false}
        />
      </div>
      {errorMessage && (
        <span className="text-sm text-[#d10b30]">{errorMessage.message}</span>
      )}
    </div>
  );
}