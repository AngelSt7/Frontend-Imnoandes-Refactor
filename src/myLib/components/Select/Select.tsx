import { ComponentType } from "react";
import { Control, ControllerProps, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { ErrorComponentsRegistry } from "@/src/config/ErrorsComponents";
import { Option } from "@/src/myLib/interfaces";
import { Select as HeroSelect, SelectItem } from "@heroui/react";

interface Select<T extends FieldValues> {
  controller: ComponentType<ControllerProps<T>>;
  data: Option[];
  name: Path<T>;
  control: Control<T>;
  rules: RegisterOptions<T>;
  label?: string;
  placeholder?: string;
  errorComponent?: string;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "lg" | "sm" | "md" | "full";
  errorClassName?: string;
}

export function Select<T extends FieldValues>({
  name,
  rules,
  control,
  data,
  controller: Controller,
  label,
  errorComponent,
  placeholder,
  size,
  radius,
  errorClassName
}: Select<T>) {
  const labelId = `label-${name}`;
  const ErrorComponent = ErrorComponentsRegistry[errorComponent ?? "default"];
  const defaultPlaceholder = placeholder ?? "Selecciona una opción";
  const defaultSize = size ?? "md";
  const defaultRadius = radius ?? "sm";

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <label
              id={labelId}
              htmlFor={name}
              className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7] flex justify-between items-center w-full"
            >
              <span>{label}</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {`(${data.length})`}
              </span>
            </label>
            <div
              className={`mt-[8px] rounded-md border ${
                fieldState.error
                  ? errorClassName ?? "border-[#d10b30]"
                  : "border-[#afaeae] dark:border-[#3f3f46]"
              }`}
            >
              <HeroSelect
                items={data}
                aria-labelledby={labelId}
                size={defaultSize}
                placeholder={defaultPlaceholder}
                radius={defaultRadius}
                selectedKeys={field.value ? new Set([field.value]) : new Set([])}
                onSelectionChange={(key) => field.onChange(Array.from(key)[0])}
                disabledKeys={data
                  .filter((item) => item.active === false || item.active === 0)
                  .map((item) => item.key.toString())}
              >
                {(item) => (
                  <SelectItem key={item.key.toString()}>{item.label}</SelectItem>
                )}
              </HeroSelect>
            </div>
            {fieldState.error && (
              <ErrorComponent message={fieldState.error.message} />
            )}
          </>
        )}
      />
    </div>
  );
}
