'use client'

import { AiOutlineUser } from "react-icons/ai";
import { Auth } from "@/src/features/auth/services";
import { AuthCompleteAccount } from '@/src/features/auth/interfaces';
import { DateForForm, CountdownTimer } from "./components";
import { formatCompleteAccount } from "./utils";
import { Input } from "@/src/myLib/components";
import { Phone } from "lucide-react";
import { useForm } from 'react-hook-form';
import { useSubmitMutation } from "@/src/myLib/hooks";

import { User } from '@/src/types/userTypes/user';

export function CompleteAccountForm({ user }: { user: User }) {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<AuthCompleteAccount>({
        defaultValues: formatCompleteAccount(user)
    });

    const { mutate } = useSubmitMutation({
        serviceFunction: Auth.completeAccount,
        replace: '/dashboard/properties?page=1&limit=10',
        onSuccessCallback: () => reset(),
    })

    const onSubmit = (data: AuthCompleteAccount) => mutate(data)
    return (
        <div>
            <CountdownTimer exp={user.exp} />
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 p-6 shadow-md">
                <div className='flex gap-3 flex-1'>
                    <Input
                        type="text"
                        htmlFor="name"
                        field="name"
                        label="Nombre"
                        placeholder='Ingresa tu nombre'
                        register={register}
                        rules={{ required: "El nombre es obligatorio" }}
                        errorMessage={errors.name}
                        Icon={AiOutlineUser}
                    />
                    <Input
                        type="text"
                        htmlFor="lastname"
                        field="lastname"
                        label="Apellido"
                        placeholder='Ingresa tu apellido'
                        register={register}
                        rules={{ required: "El apellido es obligatorio" }}
                        errorMessage={errors.lastname}
                        Icon={AiOutlineUser}
                    />
                </div>

                <Input
                    type="tel"
                    htmlFor="phone"
                    label="Teléfono"
                    placeholder='Ingresa tu teléfono'
                    field="phone"
                    register={register}
                    rules={{
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^\d{9}$/,
                            message: "El teléfono debe tener exactamente 9 dígitos numéricos"
                        }
                    }}
                    errorMessage={errors.phone}
                    Icon={Phone}
                />

                <DateForForm
                    htmlFor="birthDate"
                    label="Fecha de Nacimiento"
                    name="birthDate"
                    register={register}
                    errorMessage={errors.birthDate}
                    setValue={setValue}
                />

                <button
                    className="custom-button"
                >
                    Completar mi Cuenta
                </button>
            </form>
        </div>
    );
}
