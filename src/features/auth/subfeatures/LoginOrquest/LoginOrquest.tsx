'use client';

import { Auth } from '@/src/features/auth/services';
import { ButtonGoogle } from '../ButtonGoogle'
import { CheckEmailForm, CheckPasswordForm } from './components';
import { InputOtp } from '@/src/myLib';
import { useErrorToast, useStatusForm } from './hooks';
import { useRouter } from 'next/navigation';

export function LoginOrquest() {
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
