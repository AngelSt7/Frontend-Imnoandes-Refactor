import { Dispatch, SetStateAction } from 'react'
import { Auth } from '@/src/features/auth/services'
import { StatusOrquestPassword } from '../../RecoverPassword'
import { AuthToken } from '@/src/features/auth/interfaces'
import { InputOtp } from '@/src/myLib/components'

type TokenPasswordProps = {
    setStatusOrquestPassword: Dispatch<SetStateAction<StatusOrquestPassword>>
    token: AuthToken['token']
}

export function TokenPassword({ setStatusOrquestPassword, token }: TokenPasswordProps) {
    return (
        <>
            <h2 className=' px-6 text-base text-zinc-800 dark:text-zinc-500 font-semibold text-center'>Completa el código que llegó a tu email e inmediatamente será validado</h2>
            <InputOtp
                serviceFunction={Auth.validateToken}
                token={token}
                onSuccessCallback={(data) => setStatusOrquestPassword(({ tokenId: data.id, valid: true }))}
            />
        </>
    )
}
