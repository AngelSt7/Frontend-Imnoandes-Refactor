import { Input } from "@/src/myLib/components/Input/Input";
import { FilterBedrooms } from "@/src/types";
import { Button } from "@heroui/react";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface FormBedroomProps {
    register: UseFormRegister<FilterBedrooms>;
    handleSubmit: UseFormHandleSubmit<FilterBedrooms>;
    onSubmit: (data: FilterBedrooms) => void;
    errors: FieldErrors<FilterBedrooms>;
    handleClearParams: () => void
}

export default function FormBedroom({ register, handleSubmit, onSubmit, errors, handleClearParams }: FormBedroomProps) {
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
        >
            <div className="mt-2 flex flex-row gap-3 w-full ">
                <Input
                    htmlFor="minBedroom"
                    field="minBedroom"
                    type="number"
                    placeholder="Mínimo"
                    variant="floating"
                    register={register}
                    rules={{
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: "El mínimo es 1 habitación"
                        }
                    }}
                    errorMessage={errors.minBedroom}
                />
                <Input
                    htmlFor="maxBedroom"
                    field="maxBedroom"
                    type="number"
                    placeholder="Máximo"
                    variant="floating"
                    register={register}
                    rules={{
                        valueAsNumber: true,
                        max: {
                            value: 3,
                            message: "El máximo es 3 habitaciones"
                        }
                    }}
                    errorMessage={errors.maxBedroom}
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={handleClearParams}
                    className="w-full"
                >
                    Limpiar
                </button>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-md transition-colors duration-200"
                >
                    Ver resultados
                </button>
            </div>
        </form>
    )
}
