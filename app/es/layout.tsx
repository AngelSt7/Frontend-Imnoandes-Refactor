import { HeaderMenu } from '@/src/myLib'
import Footer from '@/src/components/es/ui/footer/Footer'
import ImageHeader from '@/src/components/es/ui/header/ImageHeader'

export default async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=' min-h-screen flex flex-col'>
      <HeaderMenu />
      <ImageHeader />
      <main className=' flex flex-col flex-1 h-full'>
        {children}
      </main>
      <Footer
      />
    </div>
  )
}
