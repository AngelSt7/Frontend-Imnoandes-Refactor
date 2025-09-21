'use client'

import { useForm } from 'react-hook-form';
import { Mail, Phone, User } from 'lucide-react';
import { BiLogoGmail } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { PublicContactForm } from '@/src/types/publicTypes/publicProperty';
import Link from 'next/link';
import { Input, useSubmitMutation } from '@/src/myLib';
import { Email } from '@/src/services/email/email.service';

type FormContactProps = {
    address: string,
    phone: string,
    ownerEmail: string
}

export default function FormContact({ address, phone, ownerEmail }: FormContactProps) {
    const message = `Hola, me interesa la propiedad ubicada en ${address}, estará disponible aún?`

    const { register, handleSubmit, formState: { errors }, reset } = useForm<PublicContactForm>({
        defaultValues: {
            ownerEmail,
            address,
            message
        }
    });

    const { mutate } = useSubmitMutation({
        serviceFunction: Email.contactOwner,
        onSuccessCallback: () => reset()
    }) 

    const preparedMessage = encodeURIComponent(message);
    const messageFormated = `https://wa.me/51${phone}?text=${preparedMessage}`

    const onSubmit = async (data: PublicContactForm) => {
        mutate(data)
    }

    return (
        <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <fieldset className='font-medium text-gray-800 dark:text-gray-200 mb-5 text-base'>
                Contacta al vendedor
            </fieldset>
            
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='flex flex-col gap-8 mb-5'>
                    <div className='relative'>
                        <Input
                            variant="floating"
                            htmlFor="email"
                            field="email"
                            label='Email'
                            type="email"
                            placeholder="Tu email"
                            Icon={Mail}
                            register={register}
                            rules={{
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Ingrese un email válido",
                                },
                            }}
                            errorMessage={errors.email}
                            className="w-full"
                        />
                    </div>

                    <div className='relative'>
                        <Input
                            variant="floating"
                            htmlFor="phone"
                            inputMode='numeric'
                            field="phone"
                            label='Teléfono'
                            type="tel"
                            placeholder="Tu teléfono"
                            Icon={Phone}
                            register={register}
                            rules={{
                                required: "El teléfono es obligatorio",
                                pattern: {
                                    value: /^[0-9]{9}$/,
                                    message: "Ingrese un número de 9 dígitos",
                                },
                            }}
                            errorMessage={errors.phone}
                            className="w-full"
                        />
                    </div>

                    <div className="flex w-full gap-3">
                            <Input
                                variant="floating"
                                htmlFor="fullName"
                                field="fullName"
                                label='Nombre'
                                type="text"
                                placeholder="Ingrese su nombre completo"
                                Icon={User}
                                register={register}
                                rules={{
                                    required: "El nombre es obligatorio",
                                }}
                                errorMessage={errors.fullName}
                                className="w-full"
                            />
                    </div>
                </div>

                <button
                    type='submit'
                    className="flex items-center justify-center gap-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-3 px-4 rounded-md border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 w-full mb-3 group"
                >
                    <span>Contactar por Email</span>
                    <BiLogoGmail className="text-gray-500 dark:text-gray-400 text-lg group-hover:text-red-500 transition-colors duration-200" />
                </button>
            </form>

            <Link
                href={messageFormated}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-4 px-6 rounded-xl shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.05)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)] dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(255,255,255,0.05)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] dark:active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] transition-all duration-200 ease-in-out w-full group"
            >
                <span>Escribir directamente</span>
                <ImWhatsapp className="text-gray-500 dark:text-gray-400 text-lg group-hover:text-green-500 transition-colors duration-200" />
            </Link>
        </div>
    )
}