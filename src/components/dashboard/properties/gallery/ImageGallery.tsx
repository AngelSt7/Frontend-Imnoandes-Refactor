import React, { Dispatch, SetStateAction } from 'react'
import { FieldError, useForm } from 'react-hook-form';
import MultiImageManager from './MultiImageManager';
import { MetaOrquest } from './ImageManagerOrquest';
import ImageManager from '@/src/components/ui/lib/image-manager/one/ImageManager';
import { Button } from '@heroui/react';

interface ImageGalleryProps {
    meta: MetaOrquest | undefined
    setMeta: Dispatch<SetStateAction<MetaOrquest>>
}

export default function ImageGallery({ meta, setMeta }: ImageGalleryProps) {

    const { register, handleSubmit, setValue } = useForm<{ gallery: File[] }>({
        mode: "onChange"
    });

    const isValid = meta?.gallery?.length === 0 || meta?.gallery === null
    const onSubmit = (data: { gallery: File[] }) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className='space-y-4' >

            <div className=' flex justify-between'>
                <h2 className='text-gray-800 text-2xl'>Imagenes de galería</h2>
                <Button type='submit'
                    disabled={isValid}
                    radius='full' className={`bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400  ${isValid && 'opacity-50 cursor-not-allowed'}`}>
                    Guardar
                </Button>
            </div>

            <ImageManager<{ gallery: File[] }>
                field="gallery"
                register={register}
                maxFiles={10}
                className='multi-image-filepond'
                setValue={setValue}
                initialFile={meta?.gallery ?? []}
                onFileChange={(files) => {
                    console.log("ejecutando en arranque")
                    setMeta((prev) => ({
                        main: prev.main,
                        gallery: files as File[]
                    }))
                }}
                width={800}
                height={600}
                multiple
                validation={{
                    minWidth: 400,
                    minHeight: 300,
                    maxFileSizeMB: 2,
                    allowedTypes: ["image/png", "image/jpeg", "image/webp"],
                }}
            />

        </form>
    )
}