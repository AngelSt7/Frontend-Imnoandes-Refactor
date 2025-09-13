import { AllowedFilters } from "./Filters";

export interface FilterOrquestProps {
  filters: (show: AllowedFilters[]) => React.ReactNode;
}

export default function FilterOrquest({ filters }: FilterOrquestProps) {

  return (
    <div>
      {filters(['currency', 'bedrooms', 'propertyType', 'area'])}
    </div>
  )
}
