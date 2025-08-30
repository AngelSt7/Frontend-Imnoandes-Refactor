import { Select, SelectItem as HeroSelectItem } from "@heroui/react";
import { FieldError, FieldErrorsImpl, FieldValues, Merge, Path, PathValue, UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from "react-hook-form";
import Errors from "../errors/Errors";

interface Option { 
  key: string | number; 
  label: string; 
  active?: boolean | number; 
}

interface SelectItemProps<T extends FieldValues> {
  data: Option[];
  name: Path<T>;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  label?: string;
  errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export default function SelectItem<T extends FieldValues>({
  data,
  register,
  errorMessage,
  name,
  label = "Seleccionar opción",
  watch,
  setValue,
}: SelectItemProps<T>) {
  const selectedValue = watch(name);


  const handleChange = (value: string) => {
    setValue(name, value as PathValue<T, Path<T>>, { shouldValidate: true });
  };

  const labelId = `label-${name}`;

  return (
    <div className="w-full">
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

      <input type="hidden" {...register} />

      <div
        className={`mt-[8px] rounded-md border ${
          errorMessage
            ? "border-[#d10b30]"
            : "border-[#afaeae] dark:border-[#3f3f46]"
        }`}
      >
        <Select
          className="w-full"
          aria-labelledby={labelId}
          items={data}
          size="lg"
          radius="sm"
          variant="flat" 
          showScrollIndicators={true}
          placeholder="Selecciona una opción"
          selectedKeys={selectedValue ? [String(selectedValue)] : []}
          onSelectionChange={(keys) => handleChange(Array.from(keys)[0] as string)}
          disabledKeys={data
            .filter((item) => item.active === false || item.active === 0)
            .map((item) => item.key.toString())}
        >
          {(item) => (
            <HeroSelectItem key={item.key.toString()}>
              {item.label}
            </HeroSelectItem>
          )}
        </Select>
      </div>

      {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
    </div>
  );
}
