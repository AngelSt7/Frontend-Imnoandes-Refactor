import { LocationService } from "../../../services/location.service";
import { useSearchLocation } from "../hooks/useSearchLocation";
import { LocationSearch } from "../../../schemas";
import { SearchIcon } from "lucide-react";
import { Input } from "@heroui/react";

export default function InputSearch() {

    const { search, setSearch, data } = useSearchLocation<LocationSearch>({
        baseKey: ["location"],
        functionService: LocationService.search
    })


    return (
        <div>

            <Input
                isClearable
                className="w-full min-h-24"
                placeholder="Buscar..."
                startContent={<SearchIcon />}
                value={search}
                onClear={() => {
                    setSearch('')

                }}
                onValueChange={v => setSearch(v)}
            />


            {data.map((d) => (
                <div key={d.slug}>
                    {d.label}
                </div>
            ))}
        </div>
    )
}
