import { useMemo } from "react";

interface FilterCurrencyProps {
    onGetParam: (key: string) => string | null
}

export const currency = [
    { key: "ALL", value: "Cualquier moneda" },
    { key: "PEN", value: "Soles" },
    { key: "USD", value: "Dolares" },
]

export const useFilterCurrency = ({
    onGetParam
} : FilterCurrencyProps ) => {
    
        const resolveLabel = (paramKey: string) => {
            const value = onGetParam(paramKey);
            switch (value) {
                case "PEN":
                    return new Set(["PEN"]);
                case "USD":
                    return new Set(["USD"]);
                default:
                    return new Set(["ALL"]);
            }
        };
    
        const getCurrencyButtonText = useMemo(() => {
            const value = onGetParam("currency");
            const selectedOption = currency.find(option => option.key === value);
            return selectedOption?.value || "Cualquier moneda";
        }, [onGetParam]);

    return {
        resolveLabel,
        getCurrencyButtonText
    }
}