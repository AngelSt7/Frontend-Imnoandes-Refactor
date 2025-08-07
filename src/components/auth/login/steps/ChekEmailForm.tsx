'use client'

import { useForm } from 'react-hook-form';
import { AuthCheckEmail } from '@/src/types/auth/auth';
import { AiOutlineMail } from 'react-icons/ai';
import { useSubmitMutation } from "@/src/hooks";
import { Auth } from '@/src/services/auth';
import { Dispatch } from 'react';
import Input from '@/src/components/ui/inputs/Input';

export interface StatusForm {
    init: boolean,
    requiredPassword: boolean,
    requiredOtp: boolean,
    meta: { email: string | null }
}

interface CheckEmailFormProps {
    statusForm: StatusForm,
    setStatusForm: Dispatch<StatusForm>
}

export default function CheckEmailForm({ statusForm, setStatusForm }: CheckEmailFormProps) {
    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<AuthCheckEmail>();

    const { mutate } = useSubmitMutation({
        serviceFunction: Auth.checkEmail,
        onErrorCallback: () => reset(),
        onSuccessCallback: (data) => setStatusForm({
            requiredOtp: data.requiredOtp,
            requiredPassword: data?.requiredPassword,
            init: false,
            meta: { email: getValues("email") }
        })
    });

    const onSubmit = async (data: AuthCheckEmail) => mutate(data)

    return (

            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4  ">
                <Input
                    type="email"
                    label="Email"
                    htmlFor='email'
                    placeholder='Enter your email'
                    register={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email is not valid"
                        }
                    })}
                    errorMessage={errors.email}
                    Icon={AiOutlineMail}
                />

                <button
                    className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                    Continue
                </button>
            </form>
    )
}
