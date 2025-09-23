import React from "react";
import { Checkbox } from "@heroui/react";
import { FieldValues, Path, PathValue, UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface CheckBoxProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  label: string
}

export function CheckBox<T extends FieldValues>({
  name,
  register,
  setValue,
  watch,
  label,
}: CheckBoxProps<T>) {
  const selectedValue = Boolean(watch(name));

  const handleChange = (value: boolean) => {
    setValue(name, value as PathValue<T, Path<T>>, { shouldValidate: true });
  };
  const labelId = `label-${name}`;
  return (
    <div className="flex flex-col gap-2">

      <input
        type="checkbox"
        hidden
        checked={selectedValue}
        {...register}
        readOnly
      />

      <Checkbox
        isSelected={selectedValue}
        onValueChange={handleChange}
      >
        <label
          id={labelId}
          htmlFor={name}
          className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7] flex justify-between items-center w-full"
        >
          <span>{label}</span>
        </label>
      </Checkbox>
    </div>
  );
}
