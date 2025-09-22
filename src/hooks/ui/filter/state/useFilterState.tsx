import { options } from "@/src/myLib/components/Table/TableContent";
import { useMemo } from "react";

interface FiltersProps {
    onGetParam: (key: string) => string | null
}

export const useFilterState = ({
    onGetParam
} : FiltersProps ) => {
    
        const resolveLabel = (paramKey: string) => {
            const value = onGetParam(paramKey);
            switch (value) {
                case "true":
                    return new Set(["activo"]);
                case "false":
                    return new Set(["inactivo"]);
                default:
                    return new Set(["all"]);
            }
        };
    
        const getStatusButtonText = useMemo(() => {
            const value = onGetParam("availability");
            const selectedOption = options.find(option => {
                if (value === "true") return option.key === "activo";
                if (value === "false") return option.key === "inactivo";
                return option.key === "all";
            });
            return selectedOption?.value || "Estados";
        }, [onGetParam]);


    return {
        resolveLabel,
        getStatusButtonText
    }
}