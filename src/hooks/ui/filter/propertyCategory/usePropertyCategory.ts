import { PROPERTY_CATEGORY } from "@/src/utils/resolves/bases/enums";
import { PROPERTY_CATEGORY_SELECT, PROPERTY_TYPE_SELECT } from "@/src/utils/resolves/bases/select";
import { useMemo } from "react";

interface FilterPropertyCategoryProps {
    onGetParam: (key: string) => string | null
}

export const useFilterPropertyCategory= ({
    onGetParam
} : FilterPropertyCategoryProps ) => {
    
        const resolveLabel = (paramKey: string) => {
            const value = onGetParam(paramKey);
            switch (value) {
                case PROPERTY_CATEGORY.CASA:
                    return new Set([PROPERTY_CATEGORY.CASA]);
                case PROPERTY_CATEGORY.APARTAMENTO:
                    return new Set([PROPERTY_CATEGORY.APARTAMENTO]);
                case PROPERTY_CATEGORY.TERRENO:
                    return new Set([PROPERTY_CATEGORY.TERRENO]);
                case PROPERTY_CATEGORY.COMERCIAL:
                    return new Set([PROPERTY_CATEGORY.COMERCIAL]);
                case PROPERTY_CATEGORY.OFICINA:
                    return new Set([PROPERTY_CATEGORY.OFICINA]);
                case PROPERTY_CATEGORY.ALMACEN:
                    return new Set([PROPERTY_CATEGORY.ALMACEN]);
            }
        };
    
        const getButtonText = useMemo(() => {
            const value = onGetParam("propertyCategory");
            const selectedOption = PROPERTY_CATEGORY_SELECT.find(option => option.key === value);
            return selectedOption?.label || "Categoría de propiedad";
        }, [onGetParam]);

    return {
        resolveLabel,
        getButtonText
    }
}