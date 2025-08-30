import { FieldValues } from "react-hook-form";
import { ImageManagerProps } from "../interfaces";
import { useLogicManager } from "../hooks/useLogicManager";
import ImageDropZone from "./ImageDropZone";
import ImageGrid from "./ImageGrid";
import DragCursor from "./DragCursor";


export default function ImageManager<T extends FieldValues>(props: ImageManagerProps<T>) {
  const { controller: Controller, name, control, rules, errorComponent, onChange } = props
  const maxFiles = props.maxFiles || 5;
  const multiple = props.multiple && props.maxFiles !== 1;
  const isSingle = !multiple || maxFiles === 1;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange: rhfOnChange, value }, fieldState: { error } }) => {
        const { selectedFiles, isDragOver, dragPosition, handleRemove, ...logic } = useLogicManager({
          ...props,
          value,
          onChange: (files) => {
            rhfOnChange(files)
            onChange?.(files)
          },
        });

        return (
          <div className="p-4 mx-auto max-w-5xl">
            <DragCursor
              isDragOver={isDragOver}
              multiple={Boolean(multiple)}
              dragPosition={dragPosition}
            />
            <div className="space-y-4">
              <ImageDropZone
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
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {errorComponent || error.message}
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  )
}