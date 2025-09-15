'use client'

import { useForm } from 'react-hook-form';
import Input from '../../../myLib/components/input/Input';
import { AuthForgotPassword } from '@/src/types/auth/auth';
import { AiOutlineMail } from 'react-icons/ai';
import { useSubmitMutation } from '@/src/hooks';
import { Auth } from '@/src/services/auth';

export default function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthForgotPassword>();

    const { mutate } = useSubmitMutation({
        serviceFunction: Auth.forgotPassword,
        onSuccessCallback: () => reset(),
    });

    const onSubmit = (data: AuthForgotPassword) => mutate(data)
    
    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="  flex w-full flex-col gap-4 p-6 shadow-md">

                <Input
                    type="email"
                    label="Email"
                    field='email'
                    htmlFor='email'
                    placeholder='Ingresa tu email'
                    register={register}
                    rules={{
                        required: "El email es obligatorio",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El email no es válido"
                        }
                    }}
                    errorMessage={errors.email}
                    Icon={AiOutlineMail}
                />

                <button
                    className="mt-4 bg-zinc-800 text-white font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                   Request Token
                </button>
            </form>
        </div>
    )
}
