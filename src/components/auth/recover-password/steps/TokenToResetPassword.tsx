import React, { Dispatch, SetStateAction } from 'react'
import { InputOtp } from '@/src/components/auth'
import { Auth } from '@/src/services/auth'
import { StatusOrquestPassword } from '../logic/RecoverOrquestPassword'
import { AuthToken } from '@/src/types'

type TokenToResetPasswordProps = {
    setStatusOrquestPassword: Dispatch<SetStateAction<StatusOrquestPassword>>
    token: AuthToken['token']
}

export default function TokenToResetPassword({ setStatusOrquestPassword, token }: TokenToResetPasswordProps) {
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
