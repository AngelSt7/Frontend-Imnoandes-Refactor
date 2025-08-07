import { DateValue } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { getLocalTimeZone } from "@internationalized/date";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface BirthDateFormProps {
  setBirthDateCheck: Dispatch<SetStateAction<boolean>>;
  setBirthDate: Dispatch<SetStateAction<string | undefined>>;
  value: DateValue | null | undefined | any;
}

export const useBirthDateForm = ({
  setBirthDateCheck,
  setBirthDate,
  value,
}: BirthDateFormProps) => {
  const handleValidation = () => {
    if (!value) {
      toast.error("Debes ingresar tu fecha de nacimiento");
      setBirthDateCheck(false);
      return;
    }

    const birthDate = dayjs(value.toDate(getLocalTimeZone()));
    const today = dayjs();
    const age = today.diff(birthDate, "year");

    if (age < 18) {
      toast.error("Debes tener al menos 18 años.");
      setBirthDateCheck(false);
    } else {
      setBirthDateCheck(true);
      setBirthDate(birthDate.format("YYYY-MM-DD"));
      toast.success("Fecha válida, continue con el proceso");
    }
  };

  return { handleValidation };
};
