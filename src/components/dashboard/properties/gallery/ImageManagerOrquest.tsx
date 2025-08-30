'use client'
import ImageMain from "./ImageMain";
import ImageGallery from "./ImageGallery";
import ControlTabs from "./ControlTabs";
import { useState } from "react";

interface ImageManagerOrquestProps {
    tittle: string;
}

export interface MetaOrquest {
    main: File | undefined | null,
    gallery: File[] | undefined | null
}

export default function ImageManagerOrquest() {
    const [activeTab, setActiveTab] = useState<string>("main");
    const [meta, setMeta] = useState<MetaOrquest>({
        main: null,
        gallery: null
    });

    console.log(meta.gallery)

    return (
        <>
            <ControlTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "main" && <ImageMain setMeta={setMeta} meta={meta} />}
            {activeTab === "gallery" && <ImageGallery setMeta={setMeta} meta={meta} />}
        </>
    )
}