import { Input } from "@/src/myLib/components/Input/Input";
import { FilterArea } from "@/src/types";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ButtonsToForm } from "../Buttons/ButtonsToForm";

interface FormAreaProps {
    register: UseFormRegister<FilterArea>;
    handleSubmit: UseFormHandleSubmit<FilterArea>;
    onSubmit: (data: FilterArea) => void;
    errors: FieldErrors<FilterArea>;
    handleClearParams: () => void
}

export default function FormArea({ register, handleSubmit, onSubmit, errors, handleClearParams }: FormAreaProps) {
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
        >
            <div className="mt-2 flex flex-row gap-3 w-full ">
                <Input
                    htmlFor="minArea"
                    field="minArea"
                    inputMode="numeric"
                    type="text"
                    label="Desde"
                    variant="floating"
                    register={register}
                    rules={{
                        min: {
                            value: 50,
                            message: "El area mínimo es 50 m²"
                        }
                    }}
                    errorMessage={errors.minArea}
                />
                <Input
                    htmlFor="maxArea"
                    field="maxArea"
                    inputMode="numeric"
                    type="text"
                    label="Hasta"
                    placeholder="Precio Máximo"
                    variant="floating"
                    register={register}
                    rules={{
                        max: {
                            value: 1000,
                            message: "El área máxima es 1000 m²"
                        }
                    }}
                    errorMessage={errors.maxArea}
                />
            </div>
            <ButtonsToForm handleClearParams={handleClearParams} />
        </form>
    )
}
