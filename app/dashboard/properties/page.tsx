import { redirect } from "next/navigation";
import ClientPageProperties from "@/src/components/dashboard/properties/content/ClientPageProperties";

export default async function PageProperties({ searchParams }: { searchParams: { page: string } }) {
  const { page } = await searchParams
  if (!Number(page) || Number(page) < 0) return redirect('/dashboard/properties?page=1')

  return (

    <div className='custom-container'>
      <ClientPageProperties />
    </div>
  )
}
