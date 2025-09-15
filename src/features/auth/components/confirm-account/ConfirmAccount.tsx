'use client'

import { Auth, AuthToken } from '@/src/features/auth'
import { InputOtp } from '@/src/myLib'
import { useRouter } from 'next/navigation'

export function ConfirmAccount({ token } : AuthToken) {
    const router = useRouter()
    return (
        <div className=' flex justify-center flex-col gap-1 py-3'>
            <InputOtp
                serviceFunction={Auth.confirmAccount}
                token={token}
                onSuccessCallback={() => router.replace('/auth/login')}
            />
        </div>
    )
}
