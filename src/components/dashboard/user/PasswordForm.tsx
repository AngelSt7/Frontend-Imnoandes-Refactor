'use client'
import { User, UserUpdatePassword } from "@/src/types";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Key } from "lucide-react";
import { Input, useSubmitMutation } from "@/src/myLib";
import { User as UserService } from "@/src/features/property/admin/services";

export default function PasswordForm({ user }: { user: User }) {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<UserUpdatePassword>();

    const { mutate } = useSubmitMutation({
        serviceFunction: UserService.updatePassword,
        onSuccessCallback: () => reset(),
    })

    const onSubmit = (data: UserUpdatePassword) => mutate({...data, email: user.email})

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
            <Input
                htmlFor="currentPassword"
                field="currentPassword"
                variant="floating"
                label="Contraseña actual"
                placeholder="Tu contraseña actual"
                type="password"
                register={register}
                rules={{
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 8,
                        message: "La contraseña debe tener mínimo 6 caracteres"
                    }
                }}
                errorMessage={errors.currentPassword}
                Icon={Key}
            />
            <Input
                htmlFor="newPassword"
                field="newPassword"
                variant="floating"
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                type="password"
                register={register}
                rules={{
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 8,
                        message: "La contraseña debe tener mínimo 6 caracteres"
                    }
                }}
                errorMessage={errors.newPassword}
                Icon={Key}
            />

            <Input
                htmlFor="repeatPassword"
                field="repeatPassword"
                variant="floating"
                label="Repetir contraseña"
                placeholder="Repite tu contraseña"
                type="password"
                register={register}
                rules={{
                    required: "Debes confirmar la contraseña",
                    validate: (value) =>
                        value === getValues("newPassword") || "Las contraseñas no coinciden"
                }}
                errorMessage={errors.repeatPassword}
                Icon={Key}
            />
            <div className="flex gap-2 ">
                <Button type='submit' radius='md' className='bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 w-full'>
                    Actualizar contraseña
                </Button>
            </div>
        </form>
    );
}
