import CompleteAccountForm from '@/src/components/auth/complete-account/logic/CompleteAccountForm'
import { User } from '@/src/features/property/admin/services';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("SESSION")?.value;
    if (!jwt) return redirect('/404');

    const user = await User.validate(jwt);
    
    return <CompleteAccountForm user={user} />;

  } catch (error) {
    return redirect('/404');
  }
}
