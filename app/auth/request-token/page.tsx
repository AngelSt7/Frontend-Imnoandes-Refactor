import { RequestTokenForm } from '@/src/features/auth/subfeatures/RequestToken'
import LinkToAuth from '@/src/components/auth/ui/LinkToAuth'

export default function page() {
  return (
    <>
      <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Ingresa tu email para solicitar y enviarte un nuevo token</h2>
      <RequestTokenForm />
      <div className=' my-4 flex flex-col sm:flex-row justify-between px-6 gap-2'>
        <LinkToAuth
          href="/auth/login"
          message="¿Ya tienes cuenta?"
          label="Iniciar sesión"
        />
        <LinkToAuth
          href="/auth/create-account"
          message="¿No tienes cuenta?"
          label="Crea una ahora"
        />
      </div>
    </>
  )
}