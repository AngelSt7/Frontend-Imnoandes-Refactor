import { Input } from "@/src/myLib/components/Input/Input";
import { FilterArea } from "@/src/types";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

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
                            className="flex flex-col gap-5"
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
                                            value: 500,
                                            message: "El precio mínimo es 500"
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
                                            value: 100000000,
                                            message: "El precio máximo es 100000000"
                                        }
                                    }}
                                    errorMessage={errors.maxArea}
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
