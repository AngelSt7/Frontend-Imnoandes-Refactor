import DrawerHero from "@/app/success/DrawerHero";
import { AllowedFilters } from "./Filters";
import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import InputSearch from "../../Search/components/InputSearch";

export interface FilterOrquestProps {
  locales?: any
  renderFilters: (show: AllowedFilters[]) => React.ReactNode;
}

export default function FilterOrquest({ renderFilters, locales }: FilterOrquestProps) {

  return (
    <div>

      <div className="flex flex-col gap-4 px-4 pt-4 pb-2">
        <div className="flex justify-between gap-3 items-end">
          <InputSearch locales={locales}/>

          <div className="hidden md:flex items-center gap-3">{renderFilters(["propertyCategory" ,"propertyType","bathrooms", "filters"])}</div>

        </div>

        <div className=" flex justify-between items-center">
          <div className="md:hidden">{renderFilters(["filters"])}</div>
        </div>

        <DrawerHero
          renderFilters={renderFilters(["area", "currency", "bathrooms", "minBathrooms", "minParkingSpaces", "propertyCategory", "propertyType", "published"])}
        />
      </div>
    </div>
  )
}
