'use client'

import Input from "../../../myLib/components/Input/Input"
import { User, Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PublicContactForm } from "@/src/types/publicTypes/publicProperty";

export default function ContactForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<PublicContactForm>();

    const onSubmit = (data: PublicContactForm) => {
        console.log(data)
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className=" grid grid-cols-2 w-full gap-x-4">
                <Input
                    type="text"
                    htmlFor="name"
                    field="name"
                    placeholder="Nombre"
                    variant="floating"
                    Icon={User}
                    register={register}
                    rules={{
                        required: 'El nombre es obligatorio'
                    }}
                    errorMessage={errors.name}
                />
                <Input
                    type="text"
                    htmlFor="lastname"
                    field="lastname"
                    placeholder="Apellido"
                    variant="floating"
                    Icon={User}
                    register={register}
                    rules={{
                        required: 'El apellido es obligatorio'
                    }}
                    errorMessage={errors.lastname}
                />
            </div>

            {/* <Input
                type="text"
                htmlFor="subject"
                field="subject"
                placeholder="Asunto"
                variant="floating"
                Icon={Mail}
                register={register}
                rules={{
                    required: 'El asunto es obligatorio'
                }}
                errorMessage={errors.subject}
            /> */}

            <Input
                type="email"
                htmlFor="email"
                field="email"
                placeholder="Email"
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
                type="number"
                htmlFor="phone"
                field="phone"
                placeholder="Teléfono"
                variant="floating"
                Icon={Phone}
                register={register}
                rules={{
                    valueAsNumber: true,
                    required: 'El teléfono es obligatorio'
                }}
                errorMessage={errors.phone}
            />

            <button
                className="w-full bg-zinc-900/90 hover:bg-zinc-800 dark:bg-zinc-700/25 dark:hover:bg-zinc-800 text-gray-100 mt-4 mx-auto px-4 py-2 transition-transform-background rounded-md font-medium"
            >
                Enviar
            </button>
        </form>
    )
}
