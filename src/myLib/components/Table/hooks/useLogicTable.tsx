import { ColumnsType } from "@/src/myLib";
import { useMemo, useState } from "react";

interface UseLogicTableProps<T> {
    defaultVisibleColumns: (keyof T | string)[]
    columns: ColumnsType
}

export const useLogicTable = <T,>({
    defaultVisibleColumns,
    columns
}: UseLogicTableProps<T>) => {

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [visibleColumns, setVisibleColumns] = useState<"all" | Set<string>>(
        new Set(defaultVisibleColumns.map(String))
    );
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid as string)
        );
    }, [visibleColumns, columns]);

    return {
        selectedKeys,
        setSelectedKeys,
        visibleColumns,
        setVisibleColumns,
        statusFilter,
        setStatusFilter,
        headerColumns
    };
};