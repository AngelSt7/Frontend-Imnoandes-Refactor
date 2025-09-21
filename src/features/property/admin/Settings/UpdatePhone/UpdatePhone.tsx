'use client'
import { UserUpdatePhone } from "@/src/types/userTypes/user";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Input, useSubmitMutation } from "@/src/myLib";
import { User as UserService } from "@/src/features/property/admin/services";
import { User } from "@/src/types";

type UserFormProps = { user: User }

export function UpdatePhone({ user }: UserFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserUpdatePhone>({
        defaultValues: {
            phone: user.phone!
        }
    });


    const { mutate } = useSubmitMutation({
        serviceFunction: UserService.updatePhone,
    })

    const onSubmit = (data: UserUpdatePhone) => mutate(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4  ">
            <Input
                label="Teléfono"
                variant="floating"
                placeholder="Tu teléfono"
                type="tel"
                field="phone"
                htmlFor="phone"
                register={register}
                rules={{ required: "El teléfono es obligatorio" }}
                errorMessage={errors.phone}
            />
            <div className="flex gap-2 ">
                <Button type='submit' radius='md' className='bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 w-full'>
                    Actualizar teléfono
                </Button>
            </div>
        </form>
    )
}
