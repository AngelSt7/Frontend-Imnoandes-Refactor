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

type ImageManagerProps<T extends FieldValues> = {
  field: Path<T>;
  errorMessage: FieldError;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  rules: RegisterOptions<T>;
  initialFile?: File | null;
  onFileChange: (file: File | null) => void;
  width: number;
  height: number;
};

export default function ImageManager<T extends FieldValues>({
  field,
  errorMessage,
  register,
  setValue,
  rules = {},
  initialFile,
  onFileChange,
  width = 600,
  height = 600,
}: ImageManagerProps<T>) {
  const {
    files,
    onUpdateFiles,
    editorConfig,
    handleBeforeAddFile,
    handleAddFile,
  } = useImageManager({ initialFile, field, setValue, onFileChange, width, height });

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <input type="hidden" {...register(field, rules)} />
      <div className="w-full h-auto single-image-filepond">
        <FilePond
          files={files}
          onupdatefiles={onUpdateFiles}
          allowMultiple={false}
          maxFiles={1}
          acceptedFileTypes={["image/png", "image/jpeg"]}
          name={`${field}_filepond`}
          labelIdle='Arrastra y suelta tu imagen (ideal: 1400x600) o <span class="filepond--label-action">Explorar</span>'

          imageCropAspectRatio="21:9"
          imageResizeTargetWidth={width}
          imageResizeTargetHeight={height}
          imageValidateSizeMinWidth={1200}
          imageValidateSizeMinHeight={400}
          maxFileSize="2MB"

          allowImageValidateSize={true}

          labelMaxFileSizeExceeded="La imagen es demasiado pesada"
          labelMaxFileSize="El tamaño máximo permitido es {filesize}"
          imageValidateSizeLabelImageSizeTooBig="La imagen es muy grande"
          imageValidateSizeLabelImageSizeTooSmall="La imagen debe ser mínimo 1200x400 píxeles"

          beforeAddFile={handleBeforeAddFile}
          onaddfile={handleAddFile}
          imageEditEditor={editorConfig}

          allowReorder={false}
          allowRevert={false}
          instantUpload={false}
          checkValidity={false}
        />
      </div>
    </div>
  );
}
