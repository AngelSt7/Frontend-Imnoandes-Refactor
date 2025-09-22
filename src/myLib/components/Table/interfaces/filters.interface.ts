import { Dispatch, SetStateAction } from "react";
import { ColumnsType } from "./columns.interface";

export interface FiltersProps<T = unknown> {
    show: T[];
    visibleColumns: "all" | Set<string>;
    setVisibleColumns: Dispatch<SetStateAction<"all" | Set<string>>>;
    columns: ColumnsType;
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string) => void
    onGetParam: (key: string) => string | null
}