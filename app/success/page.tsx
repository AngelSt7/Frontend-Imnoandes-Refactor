import ButtonParam from "./ButtonParam";

interface MapInterface {
  provinceId: string[] | null;
}

export default async function page() {

  return (
    <div className=" flex flex-col min-h-screen">
      <ButtonParam  />
    </div>
  )
}
