'use client'

import { useForm } from 'react-hook-form';
import Input from '../../ui/inputs/Input';
import { AuthCreateAccount } from '@/src/types/auth/auth';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Phone } from 'lucide-react';
import { Auth } from '@/src/services/auth';
import { useSubmitMutation } from '@/src/hooks';

interface DataAccountFormProps {
    birthDate: string
}

export default function DataAccountForm({ birthDate }: DataAccountFormProps) {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<AuthCreateAccount>();

    const { mutate } = useSubmitMutation({
        serviceFunction: Auth.createAccount,
        onSuccessCallback: () => reset(),
        replace: "/auth/login",
    })

    const onSubmit = (data: AuthCreateAccount) => mutate({ ...data, birthDate })

    return (
        <div>
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-4 p-6 shadow-md">

                <div className='flex gap-3 flex-1'>
                    <Input
                        type="text"
                        label="Name"
                        htmlFor='name'
                        placeholder='Enter your name'
                        register={register("name", { required: "The name is required" })}
                        errorMessage={errors.name}
                        Icon={AiOutlineUser}
                    />
                    <Input
                        type="text"
                        label="Last name"
                        htmlFor='lastname'
                        placeholder='Enter your last name'
                        register={register("lastname", { required: "Last name is required" })}
                        errorMessage={errors.lastname}
                        Icon={AiOutlineUser}
                    />
                </div>

                <Input
                    type="tel"
                    label="Phone"
                    htmlFor='phone'
                    placeholder='Enter your last name'
                    register={register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^\d{9}$/,
                            message: "Phone number must have exactly 9 numeric digits"
                        }
                    })}
                    errorMessage={errors.phone}
                    Icon={Phone}
                />

                <Input
                    type="email"
                    label="Email"
                    htmlFor='email'
                    placeholder='Enter your email address'
                    register={register("email", {
                        required: "Email number is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email is not valid"
                        }
                    })}
                    errorMessage={errors.email}
                    Icon={AiOutlineMail}
                />

                <Input
                    type="password"
                    label="Password"
                    htmlFor='password'
                    placeholder='Enter your password'
                    register={register("password", {
                        required: "Password is required", minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    errorMessage={errors.password}
                    Icon={AiOutlineLock}
                />

                <Input
                    type="password"
                    label="Repeat Password"
                    htmlFor='repeatPassword'
                    placeholder='Repeat your password'
                    register={register("repeatPassword", {
                        required: "You must confirm the password",
                        validate: (value) =>
                            value === getValues("password") || "Passwords they don't match"
                    })}
                    errorMessage={errors.repeatPassword}
                    Icon={AiOutlineLock}
                />

                <button
                    className="custom-button"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}
