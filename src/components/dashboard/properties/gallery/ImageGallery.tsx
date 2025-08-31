import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MetaOrquest } from './ImageManagerOrquest';
import { Button } from '@heroui/react';
import { FileUploader } from '@/src/myLib/FileUploader';
import toast from 'react-hot-toast';
import { ImageGallery as ImageGalleryType } from '@/src/types/image/image';
import { useSubmitMutation } from '@/src/hooks';
import { Image } from '@/src/services/images/images';
import { PropertyAdmin } from '@/src/services/admin';
import { AdminProperty } from '@/src/types';

interface ImageGalleryProps {
    meta: MetaOrquest
    setMeta: Dispatch<SetStateAction<MetaOrquest>>
    propertyId: AdminProperty['id']
}

export default function ImageGallery({ meta, setMeta, propertyId }: ImageGalleryProps) {

    const { handleSubmit, control } = useForm<{ imagesGallery: ImageGalleryType }>({
        mode: "onChange",
        defaultValues: { imagesGallery: meta?.imagesGallery || [] }
    });

    const isValid = meta?.imagesGallery?.length === 0 || meta?.imagesGallery === null

    const onSubmit = (data: { imagesGallery: ImageGalleryType }) => {
        const formData = new FormData();
        const files = data.imagesGallery
        if(Array.isArray(files)){
            files.filter(file => file instanceof File).map(f => formData.append('images', f))
        }
        mutate({ formData, property_id: propertyId });
    }

    const { mutate } = useSubmitMutation({
        serviceFunction: async (data: { formData: FormData; property_id: AdminProperty['id'] }) => {
            const uploadResult = await Image.create({ formData: data.formData, type: 'gallery' });
            const propertyResult = await PropertyAdmin.createImagesGallery({
                id: data.property_id,
                url: uploadResult.urls
            });

            return propertyResult;
        },
        cancelToast: true,
        onSuccessCallback: () => {
            toast.success('Galería subida y vinculada correctamente');
        }
    });


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

            <FileUploader
                controller={Controller}
                name="imagesGallery"
                control={control}
                multiple={true}
                maxFiles={10}
                minWidth={800}
                minHeight={600}
                maxWidth={1600}
                maxHeight={1200}
                maxFileSize={3}
                onError={(error) => toast.error(error)}
                onChange={(data) =>
                    setMeta(prev => ({
                        ...prev,
                        imagesGallery: Array.isArray(data) ? data : [data]
                    }))
                }
            />


        </form>
    )
}