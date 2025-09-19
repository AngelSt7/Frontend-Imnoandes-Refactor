'use client'

import { useState } from "react";
import { MdBalcony } from "react-icons/md";
import { PropertyPublic } from "@/src/features/property";
import { FaBath, FaBed, FaBuilding, FaCalendarAlt, FaCarAlt, FaCouch, FaRulerCombined } from 'react-icons/fa';

type CharacteristicsyProps = {
    property: PropertyPublic
}

export const usePropertyCharacteristics = ({ property }: CharacteristicsyProps) => {
    const [showAll, setShowAll] = useState(false);

    const year = new Date().getFullYear();

    const dataProperty = [];

    if (property.area) {
        dataProperty.push({
            name: "Área",
            quantity: `${property.area} m²`,
            icon: <FaRulerCombined />,
        });
    }

    if (property.bedrooms) {
        dataProperty.push({
            name: "Dormitorios",
            quantity: property.bedrooms,
            icon: <FaBed />,
        });
    }

    if (property.bathrooms) {
        dataProperty.push({
            name: "Baños",
            quantity: property.bathrooms,
            icon: <FaBath />,
        });
    }

    if (property.yearBuilt) {
        dataProperty.push({
            name: "Antigüedad",
            quantity: `${year - property.yearBuilt} años`,
            icon: <FaCalendarAlt />,
        });
    }

    if (property.floor) {
        dataProperty.push({
            name: "Piso",
            quantity: property.floor,
            icon: <FaBuilding />,
        });
    }

    if (property.hasParking) {
        dataProperty.push({
            name: "Estacionamiento",
            quantity: property.parkingSpaces ?? 1,
            icon: <FaCarAlt />,
        });
    }

    if (property.furnished) {
        dataProperty.push({
            name: "Amoblado",
            quantity: "Sí",
            icon: <FaCouch />,
        });
    }

    if (property.hasTerrace) {
        dataProperty.push({
            name: "Terraza",
            quantity: "Sí",
            icon: <MdBalcony />,
        });
    }

    const itemsToShow = showAll ? dataProperty : dataProperty.slice(0, 6);

    return {
        showAll,
        setShowAll,
        itemsToShow,
        data: dataProperty
    }
}