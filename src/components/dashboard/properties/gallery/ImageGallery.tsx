import { Dispatch, SetStateAction, useEffect } from 'react';
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

    const { handleSubmit, control, reset } = useForm<{ imagesGallery: ImageGalleryType }>({
        mode: "onChange",
        defaultValues: { imagesGallery: meta?.imagesGallery || [] }
    });

    useEffect(() => {
        reset({ imagesGallery: meta?.imagesGallery || [] });
    }, [meta.imagesGallery, reset]);

    const formatPublicId = (url: string) => {
        const formated = url.split('/');
        const folder = `${formated.at(-2)}/${formated.at(-1)}`
        return folder.slice(0, folder.indexOf('.'))
    }

    const isValid = meta?.imagesGallery?.length === 0 || meta?.imagesGallery === null

    const onSubmit = (data: { imagesGallery: ImageGalleryType }) => {
        mutate({ data, propertyId });
    }

    const { mutate } = useSubmitMutation({
        serviceFunction: async (data: { data: { imagesGallery: ImageGalleryType }; propertyId: AdminProperty['id'] }) => {
            const preparedData = {
                urls: Array.isArray(data.data.imagesGallery) ? data.data.imagesGallery.filter(url => typeof url === 'string') : [],
                files: Array.isArray(data.data.imagesGallery) ? data.data.imagesGallery.filter(files => files instanceof File) : []
            }

            const filesFormData = new FormData();
            preparedData.files.forEach((file) => {
                filesFormData.append('images', file);
            })

            const uploadResult = preparedData.files.length > 0
                ? await Image.create({ formData: filesFormData, type: 'gallery' })
                : { urls: [] }

            const formatUrls = preparedData.urls.map(url => ({
                url,
                publicId: formatPublicId(String(url))
            }))


            const payload = {
                propertyId: data.propertyId,
                images: [...formatUrls, ...uploadResult.urls]
            }

            const propertyResult = await PropertyAdmin.createImagesGallery(payload);
            return propertyResult;
        },
        cancelToast: true,
        invalidateQueries: [
            ['property', "custom-images", propertyId]
        ],
        onSuccessCallback: (data) => {
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
                allowedTypes={['image/jpeg', 'image/png', 'image/jpg']}
                rules={{
                    validate: {
                        required: (files) => Array.isArray(files) && files.length > 0 || 'Por favor, selecciona al menos una imagen',
                        min: (files) => Array.isArray(files) && files.length >= 2 || "Debes subir al menos 2 imágenes",
                        max: (files) => Array.isArray(files) && files.length <= 5 || "Máximo 5 imágenes permitidas",
                    }
                }}
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