import { Auth } from '@/src/features/auth/services';
import { ConfirmAccount } from '@/src/features/auth/subfeatures/ConfirmAccount';
import { redirect } from 'next/navigation';
import { validate } from 'uuid';

export default async function page({ params }: { params: { token: string } }) {
    const { token } = await params
    try {
        if (!validate(token)) return redirect('/404');
        await Auth.checkToken({ token })
    } catch (error) {
        return redirect('/404');
    }
    return (
        <div>
            <ConfirmAccount token={token} />
        </div>
    )
}
