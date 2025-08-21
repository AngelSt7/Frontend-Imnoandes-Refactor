'use client'
import { useSearch } from "@/src/hooks/search/useSearch";
import { Meta } from "@/src/schema/shared";
import { servicesMap } from "@/src/services/mapping/mapping";
import Pagination from "../../show/Pagination";
import { Spinner, TableBody, TableCell, TableColumn, TableHeader, TableRow, Table } from "@heroui/react";
import { ColumnsType } from "../../properties/columns/columns";
import { TopContent } from "./TopContent";
import { useLogicTable } from "./hooks/useLogicTable";

export interface ApiResponse<T> {
    data: T[];
    meta: Meta;
}

interface TableContentProps<T> {
    queryKey: string;
    columns: ColumnsType;
    defaultVisibleColumns: (keyof T | string)[]
    renderCells?: (item: T, columnKey: React.Key) => React.ReactNode;
}

export default function TableContent<T extends { id: number | string }>({
    queryKey,
    renderCells,
    columns,
    defaultVisibleColumns,
}: TableContentProps<T>) {

    const { data, meta, isLoading, search, setSearch } = useSearch({
        baseKey: queryKey,
        functionService: servicesMap[queryKey],
    });

    const { selectedKeys, setSelectedKeys, visibleColumns, setVisibleColumns, statusFilter, setStatusFilter, headerColumns } = useLogicTable({ defaultVisibleColumns, columns });

    return (
        <Table
            isCompact
            aria-label="Custom table using hook logic"
            bottomContent={
                <Pagination meta={meta} />
            }
            bottomContentPlacement="outside"
            classNames={{ wrapper: "min-h-[222px]" }}
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => {
                const newKeys =
                    typeof keys === "string"
                        ? new Set([keys])
                        : new Set([...keys].map(String));
                setSelectedKeys(newKeys);
            }}
            topContent={
                <TopContent
                    filterValue={search}
                    setFilterValue={setSearch}
                    onSearchChange={(value) => setSearch(value)}
                    onClear={() => {
                        setSearch("");
                        setStatusFilter("all");
                    }}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    total={meta?.totalItems || 1}
                    statusOptions={[
                        { name: "Todos", uid: "all" },
                        { name: "Activo", uid: "activo" },
                        { name: "Inactivo", uid: "inactivo" },
                    ]}
                    columns={columns}
                    messageButton="Elemento"
                />
            }
            topContentPlacement="outside"
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid.toString()}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent="No se encontraron registros"
                items={data}
                isLoading={isLoading}
                loadingContent={<Spinner />}
            >
                {(item) => (
                    <TableRow className="hover:bg-[#f3f4f6] dark:hover:bg-[#222225] dark:text-[#c9cacb]" key={item.id}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCells?.(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}