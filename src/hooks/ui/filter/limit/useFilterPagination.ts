import { useAppStore } from "@/src/store/useAppStore";
import { useMemo } from "react";

interface useFilterLimitProps {
    onGetParam: (key: string) => string | null
}

export const Pagination = [
     { key: "5", value: "5" },
     { key: "10", value: "10" },
     { key: "15", value: "15" },
 ]

export const useFilterPagination = ({
    onGetParam
}: useFilterLimitProps) => {


    const resolveLabel = (paramKey: string) => {
        const value = onGetParam(paramKey);
        switch (value) {
            case "5":
                return new Set(["5"]);
            case "10":
                return new Set(["10"]);
            case "15":
                return new Set(["15"]);
            default:
                return new Set(["10"]);
        }
    };

    const getCurrencyButtonText = useMemo(() => {
        const value = onGetParam("limit");
        const selectedOption = Pagination.find(pag => pag.key === value);
        return selectedOption?.value || "Paginar";
    }, [onGetParam]);

    return {
        resolveLabel,
        getCurrencyButtonText
    }
}