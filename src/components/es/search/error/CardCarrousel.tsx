import { Card, CardBody, Image } from "@heroui/react";
import { Bath, Bed, Building2, Heart } from "lucide-react";
import { formatCurrency } from "@/src/utils/frontend/format/currencyUtil";
import Link from "next/link";
import { CarrouselItem } from "@/src/types";
import { PROPERTY_CATEGORY_TRANSLATE, PROPERTY_TYPE_TRANSLATE } from "@/src/utils/resolves/bases/enums";
import { formatDate } from "@/src/utils/frontend/format/dateUtils";

export type CardCarrouselProps = {
    item: CarrouselItem
}

export default function CardCarrousel({ item }: CardCarrouselProps) {
    return (
        <Card
            isPressable
            isHoverable={true}
            shadow="sm"
        >
            <Link href={item.url}>
                <CardBody className="p-0 bg-[#f5f5f5]">
                    <div className="flex relative min-h-[200px] max-[200px]: bg-red-100">
                        <Image
                            alt="Propiedad image"
                            height={"100%"}
                            width={"100%"}
                            className="object-cover"
                            radius="sm"
                            shadow="md"
                            fetchPriority="high"
                            src={'https://res.cloudinary.com/dihj0ezqt/image/upload/v1757214009/images/ebtb5rqotek7e1rv1f0e.jpg'}
                        />
                    </div>
                    
                    <div className="p-4 space-y-1">
                        {/* Tipo de propiedad y precio */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">
                                    {PROPERTY_TYPE_TRANSLATE[item.propertyType]} · {PROPERTY_CATEGORY_TRANSLATE[item.propertyCategory]}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-2xl font-bold">
                                    {formatCurrency(item.price, item.currency)}
                                </p>
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="">
                            <p className="text-sm font-normal text-zinc-900">{item.location}</p>
                            <p className="text-sm font-normal text-neutral-600 capitalize">{item.district}, {item.department}</p>
                        </div>

                        {/* Características */}
                        <div className="flex items-center gap-4 text-neutral-600 pt-1">
                            <div className="flex items-center gap-1">
                                <span className="text-sm">{item.area}m²</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm">{item.bedrooms} Dorm</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm">{item.bathrooms} Baños</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Link>
        </Card>
    );
}