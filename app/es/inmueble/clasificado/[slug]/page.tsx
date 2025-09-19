import { buildMetadata } from "@/src/config/metadata/metadata";
import { HeaderImages, PropertyCarrousel, PropertyDetails } from "@/src/features/property";
import { PropertyPublic } from "@/src/features/property/public/services";
import { PropertyTypeEnum } from "@/src/utils/url/enum";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CarrouselItem } from '../../../../../src/types/publicTypes/publicProperty';
import CardCarrousel from "@/src/components/es/search/error/CardCarrousel";
import Carrousel from "@/src/components/es/Carrousel/Carrousel";

function isValidUuidSegment(segment: string) {
    return /^[0-9a-f]{8}$/i.test(segment) ? "true" : "false";
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const awaitedParams = await params;
    const shortId = awaitedParams.slug.split("-").at(-1);
    if (!shortId || !isValidUuidSegment(shortId)) return {};
    const property = await PropertyPublic.find(shortId);
    if (!property) return {};

    const title = `${property.name} en ${property.district} | ${property.department}`;
    const description =
        property.description?.slice(0, 160) || "Propiedad en venta o alquiler.";
    const url = `https://tusitio.com${property.url}`;
    const image = property.images.filter(img => img.type === "MAIN")[0]?.url || "/default-image.jpg";

    return buildMetadata({ title, description, url, image });
}

export default async function page({ params }: { params: { slug: string } }) {
    const awaitedParams = await params
    const shortId = awaitedParams.slug.split('-').at(-1)
    const regex = /^([^ -]+)(?=-de-)/
    const match = awaitedParams.slug.match(regex);
    if (!shortId || !isValidUuidSegment(shortId) || !match || !Object.keys(PropertyTypeEnum).includes(match[1])) redirect('/404')

    const [property, carrousel] = await Promise.all([
        PropertyPublic.find(shortId),
        PropertyPublic.carrousel(PropertyTypeEnum[match[1]], 5)
    ])

    if (!property || !carrousel) redirect('/404')

    return (
        <div className="max-w-[95%] mx-auto w-11/12 space-y-3">
            <HeaderImages images={property.images} />
            <PropertyDetails property={property} />
            <PropertyCarrousel data={carrousel} />
        </div>
    )

}
