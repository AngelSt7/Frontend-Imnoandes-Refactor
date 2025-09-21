import { CreateAccount } from '@/src/features/auth/subfeatures/CreateAccount'
import { LinkToAuth } from '@/src/features/auth/components/ui'

export default function CreateAccountPage() {
  return (
    <>
      <CreateAccount />
      <div className=' my-4 flex flex-col sm:flex-row justify-between px-6 gap-2'>
        <LinkToAuth
          href="/auth/login"
          message="¿Ya tienes cuenta?"
          label="Iniciar sesión"
        />
        <LinkToAuth
          href="/auth/forgot-password"
          message="¿Olvidaste tu contraseña?"
          label="Recuperar acceso"
        />
      </div>
    </>
  )
}