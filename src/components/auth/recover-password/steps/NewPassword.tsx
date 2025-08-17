import { AuthToken, RecoverPassword } from '@/src/types/auth/auth'
import Input from '../../../ui/inputs/Input'
import { useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import { useSubmitMutation } from '@/src/hooks';
import { Auth } from '@/src/services/auth';

export interface NewPasswordProps {
  tokenId: AuthToken['token']
}


export default function NewPassword({ tokenId }: NewPasswordProps) {

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<RecoverPassword>();

    const { mutate } = useSubmitMutation({
        serviceFunction: Auth.recoverPassword,
        onErrorCallback: () => reset(),
        onSuccessCallback: () => reset(),
        replace: "/auth/login",
    });

    const onSubmit = (data: RecoverPassword) => mutate({ ...data, tokenId })

    return (
        <div>
            <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Actualiza tu contraseña y recupera tu acceso a tu cuenta</h2>

            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="  flex w-full flex-col gap-4 p-6 shadow-md">

                <Input
                    type="password"
                    label="Contraseña"
                    field='password'
                    htmlFor='password'
                    placeholder='Ingresa tu contraseña'
                    register={register}
                    rules={{
                        required: "La contraseña es obligatoria", minLength: {
                            value: 6,
                            message: "La contraseña debe tener mínimo 6 caracteres"
                        }
                    }}
                    errorMessage={errors.password}
                    Icon={AiOutlineLock}
                />

                <Input
                    type="password"
                    htmlFor='repeatPassword'
                    label="Repetir contraseña"
                    field='repeatPassword'
                    placeholder='Repite tu contraseña'
                    register={register}
                    rules={{
                        required: "Debes confirmar la contraseña",
                        validate: (value) =>
                            value === getValues("password") || "Las contraseñas no coinciden"
                    }}
                    errorMessage={errors.repeatPassword}
                    Icon={AiOutlineLock}
                />

                <button
                    className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                    Actualizar contraseña
                </button>
            </form>
        </div>
    )
}
