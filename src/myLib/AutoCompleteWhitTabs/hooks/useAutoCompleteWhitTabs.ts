import { Path, PathValue } from "react-hook-form";
import { Option } from "../../shared/interfaces/interface";
import { useRef, useState } from "react";

interface useAutoCompleteWhitTabs<T> {
  data: Option[];
  value: PathValue<T, Path<T>>
  onChange: (...event: any[]) => void
}

export const useAutoCompleteWhitTabs = <T>({
  data,
  value,
  onChange
}: useAutoCompleteWhitTabs<T>) => {
  
  const [inputValue, setInputValue] = useState("");
  const myFilter = (textValue: string, inputValue: string) => {
    if (!inputValue.length) return true;
    textValue = textValue.normalize("NFC").toLowerCase();
    inputValue = inputValue.normalize("NFC").toLowerCase();
    return textValue.startsWith(inputValue);
  };

  const selectedItems: Option[] = (Array.isArray(value) ? value.map((key: string) => data.find(d => d.key === key)) : []).filter((i): i is Option => i !== undefined);

  const handleChange = (key: string) => {
    const exist = data.find(d => d.key === key);
    if (!exist) return;
    onChange([...selectedItems.map((i: Option) => i!.key), exist.key]);
    setInputValue("");
  };

  const handleDelete = (key: string) => {
    onChange(selectedItems.filter((i: Option) => i!.key !== key).map((i: Option) => i!.key));
  };

  const filterData = data.filter(item => !selectedItems.some((sel: Option) => sel!.key === item.key));

  return {
    inputValue,
    setInputValue,
    myFilter,
    selectedItems,
    handleChange,
    handleDelete,
    filterData
  }
}