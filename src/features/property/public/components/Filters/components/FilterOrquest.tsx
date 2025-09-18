import DrawerHero from "@/app/success/DrawerHero";
import { InputSearch } from "@/src/features/property/public/components/Search";
import { Filters } from './Filters';

export interface FilterOrquestProps {
  locales?: any
}

export default function FilterOrquest({ locales }: FilterOrquestProps) {

  return (
    <>
      <div className="flex flex-col justify-center p-5 gap-3 xs:gap-0">
        <div className="flex flex-col md:flex-row xs:justify-between gap-3 items-center">
          <InputSearch locales={locales} />

          <div className="hidden w-full xs:flex md:justify-end gap-3">
            {<Filters show={["propertyCategory", "propertyType", "filters"]} />}
          </div>

        </div>

        <div className="xs:hidden">{
          <Filters show={["filters"]} />
        }</div>

        <DrawerHero
          renderFilters={
            <Filters show={["area", "currency", "bathrooms", "minBathrooms", "minParkingSpaces", "propertyCategory", "propertyType", "published", "bedrooms"]} />
          }
        />
      </div>
    </>
  )
}
