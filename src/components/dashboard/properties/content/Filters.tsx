import { Dispatch, SetStateAction } from "react";
import { ColumnsType } from "../columns/columns";
import FilterState from "../filters/FilterState";
import FilterDepartment from "../filters/FilterDepartment";
import FilterColumns from "../filters/FilterColumns";
import FilterCurrency from "../filters/FilterCurrency";
import { Button } from "@heroui/react";

export interface FiltersProps {
    setFilterValue: (value: string) => void;
    statusFilter: string;
    setStatusFilter: Dispatch<SetStateAction<string>>;
    visibleColumns: "all" | Set<string>;
    setVisibleColumns: Dispatch<SetStateAction<"all" | Set<string>>>;
    statusOptions: { value: string; key: string; }[];
    columns: ColumnsType;
    messageButton?: string;
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string) => void
    onGetParam: (key: string) => string | null
}

export default function Filters({
    statusFilter,
    setStatusFilter,
    visibleColumns,
    setVisibleColumns,
    statusOptions,
    columns,
    messageButton,
    onAddParam,
    onDeleteParam,
    onGetParam
}: FiltersProps) {

    return (
        <div className="flex gap-3">

            <FilterCurrency
                onGetParam={onGetParam}
                onAddParam={onAddParam}
                onDeleteParam={onDeleteParam}
            />

            <FilterState 
                onGetParam={onGetParam}
                onAddParam={onAddParam}
                onDeleteParam={onDeleteParam}
            />

            <FilterColumns
                columns={columns}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
            />

            <FilterDepartment   
                onAddParam={onAddParam}
                onDeleteParam={onDeleteParam}
                onGetParam={onGetParam}
            />

        </div>
    )
}