import { ApiResponse } from "@/src/myLib/interfaces";
import { ColumnsType } from "@/src/myLib/components/Table";
import { UseMutateFunction } from "@tanstack/react-query";
import { IOpenModal } from "@/src/myLib/hooks";
import { FiltersProps } from "./filters.interface";

interface RenderCellProps {
    onOpenModal?: (meta: IOpenModal) => void
    onMutate?: UseMutateFunction<any, any, string, unknown>;
};

export interface TableContentProps<T, F> {
  baseKey: string[];
  columns: ColumnsType;
  defaultVisibleColumns: (keyof T | string)[];
  renderCells: React.ComponentType<{ item: T; columnKey: React.Key } & RenderCellProps>;
  renderFilters: React.ComponentType<FiltersProps<F>>;
  renderCellsProps?: RenderCellProps;
  onList: (filters: any) => Promise<ApiResponse<T> | undefined>;
  onAddParam: (key: string, value: string) => void;
  onDeleteParam: (key: string) => void;
  onGetParam: (key: string) => string | null;
  getRowId: (item: T) => string | number;

  topContent: React.ComponentType<{
    filterValue: string;
    onSearchChange: (value: string) => void;
    onClear: () => void;
    total: number | undefined;
    renderFilters: (show: F[]) => React.ReactNode;
  }>;
}
