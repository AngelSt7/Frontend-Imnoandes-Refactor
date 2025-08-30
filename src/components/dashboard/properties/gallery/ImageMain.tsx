import React, { Dispatch, SetStateAction } from 'react'
import { FieldError, useForm } from 'react-hook-form';
import ImageManager from '../../../ui/lib/image-manager/one/ImageManager';
import { MetaOrquest } from './ImageManagerOrquest';
import { Button } from '@heroui/react';

interface ImageMainProps {
    meta: MetaOrquest | undefined
    setMeta: Dispatch<SetStateAction<MetaOrquest>>
}

export default function ImageMain({ meta, setMeta }: ImageMainProps) {

    const { register, handleSubmit, setValue } = useForm<{ main: File | null }>({
        mode: "onChange",
    });

    const isValid = meta?.main !== null

    const onSubmit = (data: { main: File | null }) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className=' space-y-4' >

            <div className=' flex justify-between'>
                <h2 className='text-gray-800 text-2xl'>Imagen principal</h2>
                <Button type='submit'
                    disabled={!isValid}
                    radius='full' className={`bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400  ${!isValid && 'opacity-50 cursor-not-allowed'}`}>
                    Guardar
                </Button>
            </div>


            <ImageManager<{ main: File | null }>
                field="main"
                register={register}
                className='single-image-filepond'
                setValue={setValue}
                initialFile={meta?.main ?? null}
                onFileChange={(file) => setMeta((prev) => ({ ...prev, main: file as File | null }))}
                width={1400}
                height={600}
                multiple={false}
                validation={{
                    minWidth: 1200,
                    minHeight: 400,
                    maxFileSizeMB: 5,
                    allowedTypes: ["image/png", "image/jpeg"],
                }}
            />

        </form>
    )
}