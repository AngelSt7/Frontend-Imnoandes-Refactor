import { PROPERTY_CATEGORY } from "@/src/utils/resolves/bases/enums";
import { useCallback } from "react";

export const DEFINE_STEPS = {
    stepOne: ['name', 'property_type', 'property_category', 'currency', 'price'],
    stepTwo: ['location', 'departmentId', 'provinceId', 'districtId', 'latitude', 'longitude'],
    stepThree: ['area', 'yearBuilt', 'bathrooms', 'floor', 'hasTerrace', 'furnished', 'hasParking', 'description', 'bedrooms', 'parkingSpaces'],
    stepFour: ['servicesId', 'extraInfo']
}

export const useStepFields = () => {

    const getStepOneFields = useCallback((): string[] => {
        return DEFINE_STEPS.stepOne;
    }, []);

    const getStepTwoFields = useCallback((): string[] => {
        return DEFINE_STEPS.stepTwo;
    }, []);


    const getStepThreeFields = useCallback(
        (propertyCategory?: string, hasParking?: boolean): string[] => {
            const baseFields = ['area', 'description'];

            if (propertyCategory === PROPERTY_CATEGORY.TERRENO) {
                return baseFields;
            }

            const constructedPropertyFields = [
                'area',
                'yearBuilt',
                'bathrooms',
                'floor',
                'hasTerrace',
                'furnished',
                'hasParking',
                'description'
            ];

            if (
                propertyCategory === PROPERTY_CATEGORY.CASA ||
                propertyCategory === PROPERTY_CATEGORY.APARTAMENTO
            ) {
                const fieldsWithBedrooms = [...constructedPropertyFields];
                fieldsWithBedrooms.splice(-1, 0, 'bedrooms');

                if (hasParking) {
                    fieldsWithBedrooms.splice(-1, 0, 'parkingSpaces');
                }

                return fieldsWithBedrooms;
            }

            if (hasParking) {
                const fieldsWithParking = [...constructedPropertyFields];
                fieldsWithParking.splice(-1, 0, 'parkingSpaces');
                return fieldsWithParking;
            }

            return constructedPropertyFields;
        },
        []
    );

    const getStepFourFields = useCallback((propertyCategory?: string): string[] => {
        let returnFiels : string[] = []
        if(propertyCategory === PROPERTY_CATEGORY.TERRENO){
            returnFiels = []
        } else {
            returnFiels = DEFINE_STEPS.stepFour
        }
        return returnFiels
    }, []);

    return {
        getStepOneFields,
        getStepTwoFields,
        getStepThreeFields,
        getStepFourFields
    }

}