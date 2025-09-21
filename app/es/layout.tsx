import { HeaderMenu } from '@/src/myLib'
import Footer from '@/src/components/es/ui/footer/Footer'
import ImageHeader from '@/src/components/es/ui/header/ImageHeader'
import { cookies } from 'next/headers'
import { User } from '@/src/types';

export default async function layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('SESSION')?.value

  const user = {} as User


  return (
    <div className=' min-h-screen flex flex-col'>
      <HeaderMenu user={user} routeLogin={'/auth/login'} />
      <ImageHeader />
      <main className=' flex flex-col flex-1 h-full'>
        {children}
      </main>
      <Footer
      />
    </div>
  )
}
