'use client';

import { useRouter } from 'next/navigation';
import { InputOtp } from '@/src/myLib';
import { CheckEmailForm, CheckPasswordForm, ButtonGoogle } from '@/src/features/auth/components'
import { useErrorToast, useStatusForm } from '@/src/features/auth/components/login/hooks'
import { Auth } from '@/src/features/auth/services';

export function LoginOrquestForm() {
    useErrorToast();
    const { statusForm, setStatusForm } = useStatusForm();
    const router = useRouter()

    return (
        <div>
            <div className='shadow-md p-6'>
                {statusForm.init && (
                    <>
                        <CheckEmailForm statusForm={statusForm} setStatusForm={setStatusForm} />
                        <ButtonGoogle />
                    </>
                )}
                {(statusForm.requiredPassword && statusForm.meta.email) && (
                    <CheckPasswordForm email={statusForm.meta.email} />
                )}
                {statusForm.requiredOtp && 
                    <InputOtp 
                    serviceFunction={Auth.confirmAccess} 
                    onSuccessCallback={(data) => router.replace(data.redirect)}
                />}
            </div>
        </div>
    );
}
