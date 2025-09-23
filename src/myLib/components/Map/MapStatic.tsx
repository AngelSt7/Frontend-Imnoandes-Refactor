'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface MapProps {
  latitude: number
  longitude: number
  address?: string
}

export function MapStatic({ latitude, longitude, address }: MapProps) {
  const coords: [number, number] = [latitude, longitude]

  return (
    <figure className="w-full h-[350px] rounded-lg overflow-hidden mb-4 space-y-2 pb-2 border-b border-gray-200">
      <h2 className='text-xl font-bold mb-2 text-gray-900'>Ubicación</h2>
      <MapContainer
        center={coords}
        zoom={15}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coords} icon={customIcon}>
          {address && <Popup className="text-base font-medium">{address}</Popup>}
        </Marker>
      </MapContainer>

      {address && (
        <figcaption className="text-sm text-gray-600 mt-2">
          {address}
        </figcaption>
      )}
    </figure>
  )
}
