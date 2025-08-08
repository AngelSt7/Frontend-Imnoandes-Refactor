'use client'

import { Auth } from '@/src/services/auth'
import { InputOtp } from '@/src/components/auth'
import { AuthToken } from '@/src/types'
import { useRouter } from 'next/navigation'

export default function ConfirmAccount({ token } : AuthToken) {
    const router = useRouter()
    return (
        <div className=' flex justify-center flex-col gap-1 py-3'>
            <InputOtp
                serviceFunction={Auth.confirmAccount}
                token={token}
                onSuccessCallback={(data) => router.replace('/auth/login')}
            />
        </div>
    )
}
