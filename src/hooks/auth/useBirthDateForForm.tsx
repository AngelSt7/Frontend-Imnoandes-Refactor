import { DateValue, getLocalTimeZone } from "@internationalized/date";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FieldValues, UseFormSetValue } from "react-hook-form";

dayjs.extend(utc);

interface UseBirthDateForFormProps<T extends FieldValues> {
  value: DateValue | null;
  setValue: UseFormSetValue<T>;
}

export const useBirthDateForForm = <T extends FieldValues>({
  value,
  setValue
}: UseBirthDateForFormProps<T>) => {
  const validateDate = () => {
    if (!value) return "Debes ingresar tu fecha de nacimiento";
    const birthDate = dayjs(value.toDate(getLocalTimeZone()));
    const today = dayjs();
    const age = today.diff(birthDate, "year");
    if (age < 18) return "Debes tener al menos 18 años.";
    setValue("birthDate" as any, birthDate.format("YYYY-MM-DD") as any, { shouldValidate: true });

    return true;
  };

  return { validateDate };
};
