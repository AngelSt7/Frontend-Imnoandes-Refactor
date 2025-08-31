'use client'

import { Controller, Form, useForm } from "react-hook-form";
import ImageManager from "../../src/myLib/FileUploader/components/FileUploader";
import toast from "react-hot-toast";

interface FormDataI {
  imageMain: File | File[] | string | string[];
}

export default function Page() {
  const { handleSubmit, control } = useForm<FormDataI>({
    defaultValues: {
      imageMain: 'https://res.cloudinary.com/dihj0ezqt/image/upload/v1739834840/bienesRaices/iaa9srbqrdxs34suwcif.jpg'
    },
  })

  const preparedData = (data: FormDataI) => {
    const formData = new FormData();

    if (Array.isArray(data.imageMain)) {
      data.imageMain.forEach(file => {
        if (file instanceof File) formData.append('imageMain[]', file);
        else if (typeof file === 'string') formData.append('imageMain[]', file);
      });
    } else {
      if (data.imageMain instanceof File) formData.append('imageMain', data.imageMain);
      else if (typeof data.imageMain === 'string') formData.append('imageMain', data.imageMain);
    }

    return formData;
  };


  return (
    <form className=" w-full " onSubmit={handleSubmit((data) => preparedData(data))}>

      <ImageManager
        controller={Controller}
        name="imageMain"
        control={control}
        rules={{ required: "La imagen es requerida" }}
        multiple={false}
        maxFiles={1}
        minWidth={400}
        minHeight={400}
        maxWidth={5000}
        maxHeight={5000}
        maxFileSize={10}
        onError={(error) => toast.error(error)}
      />

      <button className=" bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Enviar</button>

    </form>
  );
}

