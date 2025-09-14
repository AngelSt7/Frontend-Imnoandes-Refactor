'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Errors from '../errors/Errors';
import { useState, useCallback } from 'react';

const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function ChangeMapView({ coords }: { coords: [number, number] }) {
    const map = useMap();
    map.setView(coords, 15);
    return null;
}

interface MapProps<T extends FieldValues> {
    valueLatitude: Path<T>;
    valueLongitude: Path<T>;
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
    errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default function Map<T extends FieldValues>({
    setValue, watch, valueLatitude, valueLongitude, errorMessage
}: MapProps<T>) {

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

    const inputClass = `
        text-base h-12 block w-full p-2 border rounded-md outline-none
        bg-[#f4f4f5] hover:bg-[#e4e4e7]
        dark:bg-[#242428] dark:hover:bg-[#3f3f46]
        ${errorMessage
            ? 'border-[#d10b30] ring-[#d10b30]'
            : 'border-[#afaeae] dark:border-[#3f3f46] focus:ring-white/10'
        }
    `;

    return (
        <div className="flex flex-col gap-4 py-6">
            <input
                placeholder="Buscar dirección"
                defaultValue={address}
                className={inputClass}
            />
            <button
                type="button"
                onClick={onSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Buscar
            </button>

            <MapContainer
                center={markerPos}
                zoom={15}
                scrollWheelZoom={false}
                className="h-[300px] w-full rounded-lg"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                    position={markerPos}
                    icon={customIcon}
                    draggable={true}
                    eventHandlers={{ dragend: onMarkerDragEnd }}
                >
                    <Popup>Arrástrame para mover la ubicación</Popup>
                </Marker>
                <ChangeMapView coords={markerPos} />
            </MapContainer>

            {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
        </div>
    );
}
