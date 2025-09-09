import { FieldValues } from "react-hook-form";
import { FileUploaderProps } from "../interfaces";
import { useLogicManager } from "../hooks/useLogicManager";
import ImageDropZone from "./ImageDropZone";
import ImageGrid from "./ImageGrid";
import DragCursor from "./DragCursor";
import { ErrorComponentsRegistry } from "@/src/config/ErrorsComponents";


export default function FileUploader<T extends FieldValues>(props: FileUploaderProps<T>) {
  const { controller: Controller, name, control, rules, errorComponent, onChange } = props
  const ErrorComponent = ErrorComponentsRegistry[errorComponent ?? "default"];
  const maxFiles = props.maxFiles || 5;
  const multiple = props.multiple && props.maxFiles !== 1;
  const isSingle = !multiple || maxFiles === 1;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange: rhfOnChange, value }, fieldState: { error } }) => {
        const { selectedFiles, isDragOver, dragPosition, handleRemove, fileInputRef, ...logic } = useLogicManager({
          ...props,
          value,
          onChange: (files) => {
            rhfOnChange(files)
            onChange?.(files)
          },
        });

        return (
          <div className="p-4 mx-auto max-w-5xl">
            {error && <ErrorComponent message={error.message} />}
            <DragCursor
              isDragOver={isDragOver}
              multiple={Boolean(multiple)}
              dragPosition={dragPosition}
            />
            <div className="space-y-4 mt-2">
              <ImageDropZone
                fileInputRef={fileInputRef}
                isSingle={isSingle}
                multiple={Boolean(multiple)}
                maxFiles={maxFiles}
                selectedFiles={selectedFiles}
                {...logic}
                isDragOver={isDragOver}
                handleRemove={handleRemove}
                removingIds={logic.removingIds}
              />
              {multiple && (
                <ImageGrid 
                  files={selectedFiles} 
                  handleRemove={handleRemove} 
                  removingIds={logic.removingIds} 
                />
              )}
            </div>
          </div>
        );
      }}
    />
  )
}