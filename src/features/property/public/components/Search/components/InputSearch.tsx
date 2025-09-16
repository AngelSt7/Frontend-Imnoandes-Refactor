import { LocationService } from "@/src/features/property/public/services";
import { useSearchLocation } from "../../Location/hooks/useSearchLocation";
import { LocationSearch } from "../../../schemas";
import { SearchIcon } from "lucide-react";
import { Input } from "@heroui/react";
import { PopoverSearch } from "./PopoverSearch/PopoverSearch";
import { useEffect, useState } from "react";
import { useUrlTransformer } from "@/src/myLib";
import { usePathname, useRouter } from "next/navigation";

export default function InputSearch({locales}: {locales: LocationSearch[]}) {
    const router = useRouter();
    const { search, setSearch, data, showNoResults } = useSearchLocation<LocationSearch>({
        baseKey: ["location"],
        functionService: LocationService.search
    });

    const regex = /^(.*\/search\/[^?]+?)(-en-[^?]*)?(\?.*)?$/;

    const { buildUrl } = useUrlTransformer({
        regex,
        mode: "multiple",
        joiner: "-o-",
    });

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [slug, setSlugs] = useState<LocationSearch[]>(locales ||  []);

    useEffect(() => {
        if (slug.length === 0) return;

        const slugsArray = slug.map(s => s.slug);
        const newUrl = buildUrl(slugsArray, "-en-");

        router.push(newUrl);
    }, [slug, buildUrl]);

    const handleValueChange = (value: string) => {
        setSearch(value);
        if (value.length > 0) {
            setIsPopoverOpen(true);
        } else {
            setIsPopoverOpen(false);
        }
    };

    const handleSelectLocation = (location: LocationSearch) => {
        setSearch('');
        setSlugs([...slug, location])
        setIsPopoverOpen(false);
    };

    const handleInputFocus = () => {
        if (search.length > 0 && data.length > 0) {
            setIsPopoverOpen(true);
        }
    };

    return (
        <div className="relative w-full">
            <Input
                isClearable
                className="w-full min-h-24"
                placeholder="Buscar..."
                startContent={<SearchIcon />}
                value={search}
                onClear={() => {
                    setSearch('');
                    setIsPopoverOpen(false);
                }}
                onValueChange={handleValueChange}
                onFocus={handleInputFocus}
            />

            <PopoverSearch
                isOpen={isPopoverOpen && search.length > 0}
                data={data}
                setIsOpen={setIsPopoverOpen}
                selects={slug}
                setSlugs={setSlugs}
                onSelect={handleSelectLocation}
                showNoResults={showNoResults}
            />
        </div>
    );
}