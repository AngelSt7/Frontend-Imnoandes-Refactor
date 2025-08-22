'use client'

import GenericDrawer from "./GenericDrawer";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams()
  const router = useRouter()

  const setParmas = () => {
    const addParams = new URLSearchParams(params)
    addParams.set('action', 'details')
    addParams.set('id', '0b1293c4-f131-4326-862a-ab72b4b48ac9')
    router.replace(`?${addParams.toString()}`, { scroll: false })
  }

  return (
    <>
      <GenericDrawer
        width="99"
        descriptionDrawer="Aquí podrás editar la información de la propiedad"
      />

      <button
        onClick={() => setParmas()}
        className='relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white'>
        Open Drawer
      </button>
    </>
  );
}