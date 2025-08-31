'use client'

import { ImageGallery as ImageGalleryType, ImageMain as ImageMainType } from "@/src/types/image/image";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { useState } from "react";
import { validate } from "uuid";
import ControlTabs from "./ControlTabs";
import ImageGallery from "./ImageGallery";
import ImageMain from "./ImageMain";

export interface MetaOrquest {
    imageMain: ImageMainType;
    imagesGallery: ImageGalleryType;
}

export default function ImageManagerOrquest() {
    const { getParam } = useModalUtils();
    const propertyId = getParam("id");
    const [activeTab, setActiveTab] = useState<string>("main");
    const [meta, setMeta] = useState<MetaOrquest>({
        imageMain: null,
        imagesGallery: []
    });

    if (propertyId && validate(propertyId)) return (
        <>
            <ControlTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "main" && <ImageMain propertyId={propertyId} setMeta={setMeta} meta={meta} />}
            {activeTab === "gallery" && <ImageGallery propertyId={propertyId} setMeta={setMeta} meta={meta} />}
        </>
    )
}