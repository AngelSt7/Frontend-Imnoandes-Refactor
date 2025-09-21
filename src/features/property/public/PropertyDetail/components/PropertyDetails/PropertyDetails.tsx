import { PROPERTY_CATEGORY_TRANSLATE, PROPERTY_TYPE_TRANSLATE } from "@/src/utils/resolves/bases/enums"
import { PropertyPublic } from "../../../schemas"
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil"
import FormContact from "@/src/components/es/property/FormContact"
import { MapInteractive } from "@/src/components/ui/map/MapStatic"
import { PropertyServices } from "../PropertyServices"
import ToopLipContact from "@/src/components/es/property/ToopLipContact"
import ModalContact from "@/src/components/es/property/ModalContact"
import { PropertyCharacteristics } from "../PropertyCharacteristics/PropertyCharacteristics"
import { PropertyDescription } from "../PropertyDescription"

interface PropertyDetailsProps {
    property: PropertyPublic
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
    const address = `${property.address}, ${property.district}, ${property.department}`

    return (
        <section className="w-full py-6 flex gap-8">

            <article className="w-full">
                <header className="mb-4 space-y-2 pb-2 border-b border-gray-200">
                    <p>
                        {PROPERTY_CATEGORY_TRANSLATE[property.propertyCategory]} ·{" "}
                        {property.area} m² ·{" "}
                        {property.bedrooms && `${property.bedrooms} Dormitorios`}
                    </p>
                    <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
                    <p className="font-bold text-xl">
                        {PROPERTY_TYPE_TRANSLATE[property.propertyType]}
                        <span className="text-xl font-semibold mt-4 ">
                            {" "}
                            {formatCurrency(property.price, property.currency)}
                        </span>
                    </p>
                </header>

                <MapInteractive
                    latitude={property.latitude}
                    longitude={property.longitude}
                    address={address}
                />

                <PropertyCharacteristics property={property} />
                <ToopLipContact />
                <PropertyDescription property={property} />
                <PropertyServices services={property.services} />
                
            </article>

            <aside className="hidden xl:block xl:min-w-[320px]">
                <div className="sticky top-[92px]">
                    <FormContact
                        phone={property.phone}
                        address={address}
                        ownerEmail={property.email}
                    />
                    <ModalContact
                        phone={property.phone}
                        address={address}
                        ownerEmail={property.email}
                    />
                </div>
            </aside>
        </section>
    )
}
