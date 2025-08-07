'use client';

import { CheckPasswordForm, CheckEmailForm, InputOtp } from '../steps';
import { useErrorToast } from '@/src/hooks/ui';
import ButtonGoogle from './ButtonGoogle';
import { useStatusForm } from '@/src/hooks';

export default function LoginOrquestForm() {
    useErrorToast();
    const { statusForm, setStatusForm } = useStatusForm();

    return (
        <div>
            <div className='shadow-md p-6'>
                {statusForm.init && (
                    <CheckEmailForm statusForm={statusForm} setStatusForm={setStatusForm} />
                )}
                {(statusForm.requiredPassword && statusForm.meta.email) && (
                    <CheckPasswordForm email={statusForm.meta.email} />
                )}
                {statusForm.requiredOtp && <InputOtp />}
                <ButtonGoogle />
            </div>
        </div>
    );
}
