'use client'

import SelectItem from "@/src/components/ui/select/Select";
import { useForm } from "react-hook-form"
import Autocomplete from "./Autocomplete";

type prueba = {
  animal: string
}

export default function page() {
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<prueba>({
    defaultValues: {
      animal: 'cat'
    }
  });


  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex w-full flex-col gap-4 p-6 shadow-md">
        <Autocomplete 
          data={[
            
          ]}
          register={register('animal', { required: 'El animal es obligatorio' })}
          errorMessage={errors.animal}
          name="animal"
          watch={watch}
          setValue={setValue}
          label="Seleccionar un animal"
        />
      {/* <SelectItem
        data={[
          { id: 'HOLA', label: 'hola' },
          { id: 'TARDES', label: 'tardes' },
          { id: 'ADIOS', label: 'adios' },
        ]}
        register={register('id')}
        errorMessage={errors.id}
        name="id"
        watch={watch}
        setValue={setValue}
        label='Seleccionar una opcion'
      /> */}
      <button>Enviar</button>
    </form>
  )
}
