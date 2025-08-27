import React, { Dispatch, SetStateAction } from 'react'
import { FieldError, useForm } from 'react-hook-form';
import MultiImageManager from './MultiImageManager';
import { MetaOrquest } from './ImageManagerOrquest';

interface ImageGalleryProps {
    meta: MetaOrquest | undefined
    setMeta: Dispatch<SetStateAction<MetaOrquest>>
}

export default function ImageGallery({ meta, setMeta }: ImageGalleryProps) {
    
    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<{ gallery: File[] }>({
        mode: "onChange"
    });
    
    const onSubmit = (data: { gallery: File[] }) => console.log(data)
    
    return (
        <div className=' p-2'>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >

                <MultiImageManager
                    field="gallery"
                    htmlFor="gallery"
                    register={register}
                    setValue={setValue}
                    errorMessage={errors.gallery as FieldError}
                    rules={{ required: "Selecciona al menos una imagen" }}
                    onImagesChange={(files) => setMeta({ main: meta?.main, gallery: files })}
                />
                
                <button
                    type="submit"
                    className={`mx-auto bg-zinc-800 text-white font-semibold w-[70%] p-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 ${!isValid && 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isValid}
                >Guardar</button>
            </form>
        </div>
    )
}