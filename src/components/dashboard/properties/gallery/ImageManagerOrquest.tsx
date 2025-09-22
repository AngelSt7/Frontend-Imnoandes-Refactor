'use client'

import { ImageGallery as ImageGalleryType, ImageMain as ImageMainType } from "@/src/types/image/image";
import { useModalUtils } from "@/src/myLib/hooks/modal/useModalUtils/useModalUtils";
import { useEffect, useState } from "react";
import { validate } from "uuid";
import ControlTabs from "./ControlTabs";
import ImageGallery from "./ImageGallery";
import ImageMain from "./ImageMain";
import { AdminPropertyImages } from "@/src/types";

export interface MetaOrquest {
    imageMain: ImageMainType;
    imagesGallery: ImageGalleryType;
}

interface ImageManagerOrquestProps {
    defaultValues: AdminPropertyImages;
}

export default function ImageManagerOrquest({ defaultValues }: ImageManagerOrquestProps) {

    const { getParam } = useModalUtils();
    const propertyId = getParam("id");

    const mainImage = defaultValues.find(image => image.type === 'MAIN');
    const imagesGallery = defaultValues
        .filter(image => image.type === 'GALLERY')
        .map(image => image.url)
        .filter((url): url is string => Boolean(url))

    const [activeTab, setActiveTab] = useState<string>("main");
    const [meta, setMeta] = useState<MetaOrquest>({
        imageMain: mainImage?.url ?? null,
        imagesGallery
    });

    useEffect(() => {
    }, [meta, setMeta])

    if (propertyId && validate(propertyId)) return (
        <>
            <ControlTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "main" && <ImageMain currentId={mainImage?.id ?? ''} propertyId={propertyId} setMeta={setMeta} meta={meta} />}
            {activeTab === "gallery" && <ImageGallery propertyId={propertyId} setMeta={setMeta} meta={meta} />}
        </>
    )
}