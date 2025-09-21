import { LinkToAuth } from "@/src/features/auth/components/ui"
import { LoginOrquest } from "@/src/features/auth/subfeatures/LoginOrquest"

export default async function LoginPage() {
    return (
        <>
            <h2 className=' px-6 text-base text-zinc-800 font-semibold text-center'>
                Welcome to Inmoandes, please log in to continue
            </h2>
            <LoginOrquest />
            <div className=' my-4 flex flex-col sm:flex-row justify-between px-6 gap-2'>
                <LinkToAuth
                    href="/auth/create-account"
                    message="Don't have an account?"
                    label="Create one now"
                />
                <LinkToAuth
                    href="/auth/create-account"
                    message="Forgot your password?"
                    label="Recover"
                />
            </div>
        </>
    )
}