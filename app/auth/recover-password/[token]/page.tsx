import { Auth } from "@/src/features/auth/services";
import { RecoverPassword } from "@/src/features/auth/subfeatures/RecoverPassword";
import { redirect } from "next/navigation";
import { validate } from "uuid";
import { LinkToAuth } from "@/src/features/auth/components/ui";

export default async function page({ params }: { params: { token: string } }) {
    const { token } = await params

    try {
        if (!validate(token)) return redirect('/404');
        await Auth.checkToken({ token })
    } catch (error) {
        return redirect('/404');
    }

    return (
        <div>
            <RecoverPassword token={token} />

            <div className=' my-4 flex flex-col sm:flex-row justify-between px-6 gap-2'>
                <LinkToAuth
                    href="/auth/create-account"
                    message="¿No tienes cuenta?"
                    label="Crea una ahora"
                />
                <LinkToAuth
                    href="/auth/forgot-password"
                    message="¿Token expirado?"
                    label="Solicitar uno"
                />
            </div>
        </div>
    )
}
