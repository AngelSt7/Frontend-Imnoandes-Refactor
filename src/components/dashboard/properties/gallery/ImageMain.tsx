import { Dispatch, SetStateAction, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { MetaOrquest } from './ImageManagerOrquest';
import { Button } from '@heroui/react';
import FileUploader from '@/src/myLib/FileUploader/components/FileUploader';
import toast from 'react-hot-toast';
import { useSubmitMutation } from '@/src/hooks';
import { Image } from '@/src/services/images/images';
import { ImageMain as ImageMainType } from '@/src/types/image/image';
import { PropertyAdmin } from '@/src/services/admin';
import { AdminProperty } from '@/src/types';
import { messages } from '../../../../utils/frontend/ui/messagesUtils';

interface ImageMainProps {
    currentId?: AdminProperty['id']
    meta: MetaOrquest
    setMeta: Dispatch<SetStateAction<MetaOrquest>>
    propertyId: AdminProperty['id']
}

export default function ImageMain({ currentId, meta, setMeta, propertyId }: ImageMainProps) {

    const { handleSubmit, control, reset } = useForm<{ imageMain: ImageMainType }>({
        mode: "onChange",
        defaultValues: { imageMain: meta?.imageMain }
    });

    useEffect(() => {
        reset({ imageMain: meta?.imageMain || null });
    }, [meta.imageMain, reset]);

    const isValid = meta?.imageMain !== null

    const onSubmit = (data: { imageMain: ImageMainType }) => {
        const formData = new FormData();
        formData.append('images', data.imageMain as File | string);
        mutate({ formData, propertyId });
    };

    const { mutate } = useSubmitMutation({
        serviceFunction: async (data: { formData: FormData; propertyId: AdminProperty['id'] }) => {
            const uploadResult = await Image.create({ formData: data.formData, type: 'main' });
            const { url, publicId } = uploadResult.urls[0];
            const propertyResult = await PropertyAdmin.createImageMain({
                id: currentId ?? '',
                propertyId: data.propertyId,
                url,
                publicId,
            });
            return propertyResult;
        },
        cancelToast: true,
        invalidateQueries: [
            ['property', "custom-images", propertyId]
        ],
        onSuccessCallback: (data) => {
            setMeta(prev => ({ ...prev, imageMain: data.image }));
            toast.success('Imagen subida y vinculada correctamente');
        }
    });


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

            <FileUploader
                controller={Controller}
                name="imageMain"
                rules={{ required: "La imagen principal es obligatoria, pero puede cerrar el formulario para guardar sin ella" }}
                control={control}
                multiple={false}
                maxFiles={1}
                minWidth={1200}
                minHeight={600}
                maxWidth={1600}
                maxHeight={800}
                maxFileSize={5}
                allowedTypes={["image/png", "image/jpeg"]}
                onError={(error) => toast.error(error)}
                onChange={(files) =>
                    setMeta(prev => ({
                        ...prev,
                        imageMain: Array.isArray(files) ? files[0] : files
                    }))
                }
            />

        </form>
    )
}