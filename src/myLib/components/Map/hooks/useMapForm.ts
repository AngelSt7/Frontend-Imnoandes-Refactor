import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useCallback, useState } from "react";
import { useMap } from "react-leaflet";

interface MapProps<T extends FieldValues> {
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
    valueLatitude: Path<T>;
    valueLongitude: Path<T>;
}

export const useMapForm = <T extends FieldValues>({ setValue, watch, valueLatitude, valueLongitude }: MapProps<T>) => {

    const address = watch('address' as Path<T>);
    const latValue = watch(valueLatitude as Path<T>) as number || -12.0464;
    const lngValue = watch(valueLongitude as Path<T>) as number || -77.0428;
    const provider = new OpenStreetMapProvider();

    const [markerPos, setMarkerPos] = useState<[number, number]>([latValue, lngValue]);

    const onSearch = async () => {
        const results = await provider.search({ query: address });
        if (results.length > 0) {
            const { y, x } = results[0];
            setValue(valueLatitude as Path<T>, y as PathValue<T, Path<T>>, { shouldValidate: true });
            setValue(valueLongitude as Path<T>, x as PathValue<T, Path<T>>, { shouldValidate: true });
            setMarkerPos([y, x]);
        }
    };

    const onMarkerDragEnd = useCallback((e: any) => {
        const marker = e.target;
        const { lat, lng } = marker.getLatLng();
        setMarkerPos([lat, lng]);
        setValue(valueLatitude as Path<T>, lat as PathValue<T, Path<T>>, { shouldValidate: true });
        setValue(valueLongitude as Path<T>, lng as PathValue<T, Path<T>>, { shouldValidate: true });
    }, [setValue, valueLatitude, valueLongitude]);

    function ChangeMapView({ coords }: { coords: [number, number] }) {
        const map = useMap();
        map.setView(coords, 15);
        return null;
    }


    return {
        onSearch,
        markerPos,
        onMarkerDragEnd,
        address,
        ChangeMapView
    }
};