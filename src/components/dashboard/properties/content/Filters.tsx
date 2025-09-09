import { Dispatch, SetStateAction } from "react";
import { ColumnsType } from "../columns/columns";
import FilterState from "../filters/FilterState";
import FilterDepartment from "../filters/FilterDepartment";
import FilterColumns from "../filters/FilterColumns";
import FilterCurrency from "../filters/FilterCurrency";
import { TopContentShow } from "../../ui/table/TopContent";
import { useAppStore } from "@/src/store/useAppStore";
import { Button } from "@heroui/react";
import FilterPagination from "../filters/FilterPagination";
import { useParams } from "@/src/hooks/search/useParams";
import FilterPropertyType from "../filters/FilterPropertyType";
import FilterPropertyCategory from "../filters/FilterPropertyCategory";

export interface FiltersProps {
    show: TopContentShow[];
    visibleColumns: "all" | Set<string>;
    setVisibleColumns: Dispatch<SetStateAction<"all" | Set<string>>>;
    columns: ColumnsType;
    onAddParam: (key: string, value: string) => void
    onDeleteParam: (key: string) => void
    onGetParam: (key: string) => string | null
}

export default function Filters({
    show,
    visibleColumns,
    setVisibleColumns,
    columns,
    onAddParam,
    onDeleteParam,
    onGetParam
}: FiltersProps) {

    const onChangeDrawer = useAppStore(state => state.onChangeDrawer)
    const { clearParams } = useParams()
    const classNames = 'border border-[#dbdada]'
    return (
        <>

            {show.includes("filters") && (
                <Button onPress={onChangeDrawer} size="md" variant="flat" className="w-full border border-[#dbdada]">
                    Filtrar
                </Button>
            )}

            {show.includes("clear") && (
                <Button
                    onPress={() => clearParams()}
                    size="md" variant="flat" className="w-full border border-[#dbdada]"
                >
                    Limpiar
                </Button>
            )}

            {show.includes("propertyCategory") &&
                <FilterPropertyCategory
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            }

            {show.includes("propertyType") && (
                <FilterPropertyType
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            )}

            {show.includes("pagination") && (
                <FilterPagination
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            )}

            {show.includes("columns") && (
                <FilterColumns
                    classNames={classNames}
                    columns={columns}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                />
            )}
            {show.includes("currency") && (
                <FilterCurrency
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            )}

            {show.includes("departmentId") && (
                <FilterDepartment
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            )}

            {show.includes("state") && (
                <FilterState
                    classNames={classNames}
                    onGetParam={onGetParam}
                    onAddParam={onAddParam}
                    onDeleteParam={onDeleteParam}
                />
            )}


        </>
    )
}