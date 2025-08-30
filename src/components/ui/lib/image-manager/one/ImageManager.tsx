import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "@pqina/pintura/pintura.css";
import { useImageManager } from "./useImageManager";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "@pqina/pintura/pintura.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateSize
);

type ImageValidation = {
  minWidth?: number;
  minHeight?: number;
  maxFileSizeMB?: number;
  allowedTypes?: string[];
};

type ImageManagerProps<T extends FieldValues> = {
  field: Path<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  rules?: RegisterOptions<T>;
  initialFile?: File | File[] | null;
  onFileChange: (file: File | File[] | null) => void;
  width: number;
  height: number;
  className?: string;
  multiple?: boolean;
  maxFiles?: number;
  validation?: ImageValidation;
};


export default function ImageManager<T extends FieldValues>({
  field,
  register,
  setValue,
  rules = {},
  initialFile,
  className,
  onFileChange,
  width = 600,
  height = 600,
  multiple = false,
  maxFiles = 1,
  validation = {
    minWidth: 1200,
    minHeight: 400,
    maxFileSizeMB: 5,
    allowedTypes: ["image/png", "image/jpeg"],
  },
}: ImageManagerProps<T>) {
  const {
    files,
    onUpdateFiles,
    editorConfig,
    handleBeforeAddFile,
    handleAddFile,
  } = useImageManager({
    initialFile,
    field,
    setValue,
    onFileChange,
    width,
    height,
    multiple,
    validation,
  });

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <input type="hidden" {...register(field, rules)} />
      <div className={`w-full h-auto ${className}`}>
        <FilePond
          files={files}
          onupdatefiles={onUpdateFiles}
          allowMultiple={multiple}
          maxFiles={maxFiles}
          acceptedFileTypes={validation.allowedTypes}
          name={`${field}_filepond`}
          labelIdle={
            multiple
              ? `Arrastra y suelta tus imágenes (mín. ${validation.minWidth}x${validation.minHeight}) o <span class="filepond--label-action">Explorar</span>`
              : `Arrastra y suelta tu imagen (mín. ${validation.minWidth}x${validation.minHeight}) o <span class="filepond--label-action">Explorar</span>`
          }

          imageCropAspectRatio="21:9"
          imageResizeTargetWidth={width}
          imageResizeTargetHeight={height}
          imageValidateSizeMinWidth={validation.minWidth}
          imageValidateSizeMinHeight={validation.minHeight}
          maxFileSize={`${validation.maxFileSizeMB}MB`}
          allowImageValidateSize={true}
          labelMaxFileSizeExceeded="La imagen es demasiado pesada"
          labelMaxFileSize="El tamaño máximo permitido es {filesize}"
          imageValidateSizeLabelImageSizeTooBig="La imagen es muy grande"
          imageValidateSizeLabelImageSizeTooSmall={`La imagen debe ser mínimo ${validation.minWidth}x${validation.minHeight} píxeles`}
          beforeAddFile={handleBeforeAddFile}
          onaddfile={handleAddFile}
          imageEditEditor={editorConfig}
          allowReorder={multiple}
          allowRevert={false}
          instantUpload={false}
          checkValidity={false}
        />
      </div>
    </div>
  );
}
