import { PropertyPublic } from "../../../schemas"

interface PropertyDescriptionProps {
    property: PropertyPublic
}

export function PropertyDescription({ property }: PropertyDescriptionProps) {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700">{property.description}</p>
            {property.extraInfo &&
                (
                    <>
                        <h3 className="text-xl font-semibold mb-2">Info adicional</h3>
                        <p className="text-gray-700">{property.extraInfo}</p>
                    </>
                )}
        </div>
    )
}
