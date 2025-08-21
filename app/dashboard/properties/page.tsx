import { redirect } from "next/navigation";
import PruebaButton from "../ui/PruebaButton";
import TableContent from "@/src/components/dashboard/ui/table/TableContent";
import { AdminProperty } from "@/src/types";
import { Columns } from "@/src/components/dashboard/properties/columns/columns";

export default async function PageProperties({ searchParams }: { searchParams: { page: string } }) {
  const { page } = await searchParams

  if (!Number(page) || Number(page) < 0) return redirect('/dashboard/properties?page=1')


     return (
    
    <div>
      <div className='relative w-11/12 max-w-[900px] mx-auto flex-1 flex flex-col justify-between'>
      
        <TableContent<AdminProperty>
          queryKey={'properties'}
          columns={Columns}
          defaultVisibleColumns={['id', 'title', 'price', 'status', 'actions']}
        />

      </div>
      {/* <LoadingModal /> */}
      {/* <DeleteModal page={Number(page)} key={session.user.email} />  */}
      <div className=" fixed bottom-2 right-2 z-10">
        <PruebaButton />
      </div>
    </div>
  )
}
