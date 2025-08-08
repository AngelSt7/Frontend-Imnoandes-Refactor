import { RecoverOrquestPassword } from "@/src/components/auth";
import LinkToAuth from "@/src/components/auth/ui/LinkToAuth";
import { Auth } from "@/src/services/auth";
import { redirect } from "next/navigation";
import { validate } from "uuid";

export default async function page({ params }: { params: { token: string } }) {
    const { token } = await params

    try {
        if(!validate(token)) return redirect('/404');
        await Auth.checkToken({ token })
    } catch (error) {
        return redirect('/404');
    }
    
    return (
        <div>
            <RecoverOrquestPassword token={token} />

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
