'use client'

import { Field, FieldError, useForm } from "react-hook-form";
import AutoCompleteWhitTabs from "./AutoCompleteWhitTabs";
import Autocomplete from "./Autocomplete";

interface MapInterface {
  provinceId: string[] | null;
}

export default function page() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MapInterface>({
    defaultValues: {
      provinceId: null
    }
  });



  const submit = (data: MapInterface) => {
    console.log(data)
  }

  return (
    <div className=" flex flex-col min-h-screen">
    <form onSubmit={handleSubmit(submit)} className="flex gap-5 flex-col max-w-[400px] mx-auto">

      
      <button className="bg-red-400">Enviar</button>

    </form>
        </div>
  )
}
