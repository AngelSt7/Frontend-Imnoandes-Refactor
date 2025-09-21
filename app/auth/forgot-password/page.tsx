import { ForgotPasswordForm } from '@/src/features/auth/subfeatures/ForgotPassword'
import LinkToAuth from '@/src/components/auth/ui/LinkToAuth'

export default function ForgotPasswordPage() {
  return (
    <>
      <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>We will send you an email to regain your access, please enter your email below:</h2>
      <ForgotPasswordForm />
      <div className=' my-4 flex flex-col sm:flex-row justify-between px-6 gap-2'>
        <LinkToAuth
          href="/auth/login"
          message="Do you already have an account?"
          label="Login"
        />
      </div>
    </>
  )
}