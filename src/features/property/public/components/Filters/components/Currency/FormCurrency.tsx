import Input from "@/src/myLib/components/input/Input";
import { FilterPrices } from "@/src/types";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface FormCurrencyProps {
    register: UseFormRegister<FilterPrices>;
    handleSubmit: UseFormHandleSubmit<FilterPrices>;
    onSubmit: (data: FilterPrices) => void;
    errors: FieldErrors<FilterPrices>;
    handleClearParams: () => void
}

export default function FormCurrency({ register, handleSubmit, onSubmit, errors, handleClearParams }: FormCurrencyProps) {
  return (
                        <form noValidate onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        >
                            <div className="mt-2 flex flex-row gap-3 w-full ">
                                <Input
                                    htmlFor="minPrice"
                                    field="minPrice"
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
                                    errorMessage={errors.minPrice}
                                />
                                <Input
                                    htmlFor="maxPrice"
                                    field="maxPrice"
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
                                    errorMessage={errors.maxPrice}
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
