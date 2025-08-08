'use client';

import { useErrorToast, useStatusForm } from '@/src/hooks';
import { InputOtp, CheckPasswordForm, CheckEmailForm, ButtonGoogle } from '@/src/components/auth';
import { Auth } from '@/src/services/auth';
import { useRouter } from 'next/navigation';

export default function LoginOrquestForm() {
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
