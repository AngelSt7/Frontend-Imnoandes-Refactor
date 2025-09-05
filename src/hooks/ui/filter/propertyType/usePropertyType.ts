import { PROPERTY_TYPE_SELECT } from "@/src/utils/resolves/bases/select";
import { useMemo } from "react";

interface FilterPropertyTypeProps {
    onGetParam: (key: string) => string | null
}

export const useFilterPropertyType= ({
    onGetParam
} : FilterPropertyTypeProps ) => {
    
        const resolveLabel = (paramKey: string) => {
            const value = onGetParam(paramKey);
            switch (value) {
                case "SALE":
                    return new Set(["SALE"]);
                case "RENT":
                    return new Set(["RENT"]);
            }
        };
    
        const getButtonText = useMemo(() => {
            const value = onGetParam("propertyType");
            const selectedOption = PROPERTY_TYPE_SELECT.find(option => option.key === value);
            return selectedOption?.label || "Tipo de propiedad";
        }, [onGetParam]);

    return {
        resolveLabel,
        getButtonText
    }
}