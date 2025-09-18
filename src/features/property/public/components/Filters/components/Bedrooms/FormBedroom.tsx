import { Input } from "@/src/myLib/components/Input/Input";
import { FilterBedrooms } from "@/src/types";
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
                    htmlFor="minBedrooms"
                    field="minBedrooms"
                    inputMode="numeric"
                    type="text"
                    label="Mínimo"
                    variant="floating"
                    register={register}
                    rules={{
                        min: {
                            value: 1,
                            message: "El mínimo es 1 habitación"
                        }
                    }}
                    errorMessage={errors.minBedrooms}
                />
                <Input
                    htmlFor="maxBedrooms"
                    field="maxBedrooms"
                    inputMode="numeric"
                    type="text"
                    label="Máximo"
                    variant="floating"
                    register={register}
                    rules={{
                        max: {
                            value: 10,
                            message: "El máximo es 10 habitaciones"
                        }
                    }}
                    errorMessage={errors.maxBedrooms}
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
