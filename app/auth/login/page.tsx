import LoginOrquestForm from '@/src/components/auth/login/logic/LoginOrquestForm'
import LinkToAuth from '@/src/components/auth/ui/LinkToAuth'

export default async function LoginPage() {
    return (
        <>
            <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-300 font-semibold text-center'>
                Welcome to Inmoandes, please log in to continue
            </h2>
            <LoginOrquestForm />
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