'use client'

import { User, Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ContactInfoForm } from "@/src/types/publicTypes/publicProperty";
import { Input, useSubmitMutation } from '@/src/myLib';
import { Email } from '@/src/services/email/email.service';

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInfoForm>();

    const { mutate } = useSubmitMutation({
        serviceFunction: Email.requestInfo,
        onSuccessCallback: () => reset()
    })

    const onSubmit = (data: ContactInfoForm) => mutate(data)
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
            <div className=" grid grid-cols-2 w-full gap-4">
                <Input
                    type="text"
                    htmlFor="fullName"
                    field="fullName"
                    placeholder="Nombre"
                    label='Nombre'
                    variant="floating"
                    Icon={User}
                    register={register}
                    rules={{
                        required: 'El nombre es obligatorio'
                    }}
                    errorMessage={errors.fullName}
                />
                <Input
                    type="tel"
                    inputMode='numeric'
                    htmlFor="phone"
                    label='Telefono'
                    field="phone"
                    placeholder="Telefono"
                    variant="floating"
                    Icon={Phone}
                    register={register}
                    rules={{
                        required: 'El apellido es obligatorio'
                    }}
                    errorMessage={errors.phone}
                />
            </div>

            <Input
                type="email"
                htmlFor="email"
                field="email"
                placeholder="Email"
                label='Email'
                variant="floating"
                Icon={Mail}
                register={register}
                rules={{
                    required: 'El email es obligatorio',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Ingrese un email válido'
                    }
                }}
                errorMessage={errors.email}
            />

            <Input
                type="textarea"
                htmlFor="message"
                field="message"
                placeholder="Mensaje"
                label='Mensaje'
                variant="floating"
                Icon={Mail}
                register={register}
                rules={{
                    required: 'El mensaje es obligatorio'
                }}
                errorMessage={errors.message}
            />


            <button
                className="w-full bg-zinc-900/90 hover:bg-zinc-800 dark:bg-zinc-700/25 dark:hover:bg-zinc-800 text-gray-100 mt-4 mx-auto px-4 py-2 transition-transform-background rounded-md font-medium"
            >
                Enviar
            </button>
        </form>
    )
}
