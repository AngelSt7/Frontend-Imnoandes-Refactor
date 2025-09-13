import { Popover, PopoverTrigger, PopoverContent, Button, RadioGroup, Radio } from "@heroui/react";
import { useFormFilter } from "@/src/features/property/public/components/Filters/hooks/useFormFilter";
import { FilterArea } from "@/src/types";
import FormArea from "./FormArea";

interface CurrencyProps {
    setParam: (key: string, value: string) => void
    getParam: (key: string) => string | undefined
    deleteParams: (keys: string[]) => void
}

export default function AreaFilter({ setParam, getParam, deleteParams }: CurrencyProps) {
    const tittle = "Área";
    const defaultValues = {  minArea: Number(getParam("minArea")),  maxArea: Number(getParam("maxArea")) }

    const { register, handleSubmit, errors , onSubmit, handleClearParams } = useFormFilter<FilterArea>({
        defaultValues,
        deleteParams,
        clearKeys: ["minArea", "maxArea"],
    })

    return (
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button variant="flat" color="secondary">{tittle}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full space-y-3">
                        <p className="text-lg font-medium text-gray-900 mb-4" {...titleProps}>
                            {tittle}
                        </p>
                        <FormArea 
                            register={register}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            errors={errors}
                            handleClearParams={handleClearParams}
                        />
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
