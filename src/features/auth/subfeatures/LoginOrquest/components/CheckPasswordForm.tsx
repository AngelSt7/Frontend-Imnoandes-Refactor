import { AiOutlineLock } from "react-icons/ai";
import { Auth } from "@/src/features/auth/services";
import { AuthCheckEmail } from "@/src/features/auth";
import { AuthLogin } from "@/src/features/auth/interfaces";
import { Input } from "@/src/myLib/components";
import { useForm } from "react-hook-form";
import { useSubmitMutation } from "@/src/myLib/hooks";

export function CheckPasswordForm({ email }: AuthCheckEmail) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthLogin>();

    const { mutate } = useSubmitMutation({
        serviceFunction: Auth.login,
        onErrorCallback: () => reset(),
        replace: "/success",
    });

    const onSubmit = async (data: AuthLogin) => mutate({ ...data, email })

    return (
        <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4  ">
            <Input
                field="password"
                type="password"
                label="Password"
                htmlFor='password'
                placeholder='Enter your password'
                register={register}
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }
                }}
                errorMessage={errors.password}
                Icon={AiOutlineLock}
            />

            <button
                className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
            >
                Sign in
            </button>
        </form>
    )
}
