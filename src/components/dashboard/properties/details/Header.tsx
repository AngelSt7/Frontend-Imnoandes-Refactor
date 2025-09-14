import { DetailsPropertyProps } from '../actions/DetailsProperty'
import { CheckCircle, MapPin, XCircle } from 'lucide-react'
import { formatCurrency } from '@/src/utils/frontend/format/currencyUtil'

export const PROPERTY_CATEGORY = {
    HOUSE: 'Casa',
    APARTMENT: 'Departamento',
    LAND: 'Terreno',
    COMMERCIAL: 'Comercial',
    OFFICE: 'Oficina',
    WAREHOUSE: 'Almacen'
}

export const PROPERTY_TYPE = {
    SALE: 'Venta',
    RENT: 'Alquiler'
}

export default function Header({ data }: DetailsPropertyProps) {
    const getPropertyLabel = (category: string) => PROPERTY_CATEGORY[category as keyof typeof PROPERTY_CATEGORY]
    const getTypeLabel = (type: string) => PROPERTY_TYPE[type as keyof typeof PROPERTY_TYPE]

    return (
        <header className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                    <h1
                        id="property-title"
                        className="text-3xl font-bold text-gray-800 mb-3 leading-tight"
                    >
                        {data.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">{data.address}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                            {getTypeLabel(data.propertyType)}
                        </span>
                        <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                            {getPropertyLabel(data.propertyCategory)}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold text-gray-800 mb-2">
                        {formatCurrency(data.price, data.currency)}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        {data.availability ? (
                            <>
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-green-600 font-medium">Disponible</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-500 font-medium">No disponible</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
