import { ComponentType } from "react";
import { Control, ControllerProps, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Option } from "../../shared/interfaces/interface";

export interface AutoCompleteWhitTabs<T extends FieldValues> {
    controller: ComponentType<ControllerProps<T>>;
    data: Option[];
    name: Path<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    label?: string;
    errorMessage?: string;
    errorComponent?: string;
    placeholder?: string
}