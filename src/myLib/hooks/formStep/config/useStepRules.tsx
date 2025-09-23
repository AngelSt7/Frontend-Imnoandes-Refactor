import { FormDataProperty } from "@/src/types";
import { useControlStep } from "../hooks/useControlStep";
import { useCreateStepRules } from "./useCreateStepRule";
import { PROPERTY_CATEGORY } from "@/src/utils/resolves/bases/enums";
import toast from "react-hot-toast";

export function useStepRules() {
  const { getStepThreeConfig, getStepFourConfig } = useControlStep();

  const rules = [
    useCreateStepRules<FormDataProperty>({
      stepIndex: 2,
      watchFields: ["propertyCategory", "hasParking"],
      condition: (values) => !!values.propertyCategory,
      getConfig: (values) =>
        getStepThreeConfig(
          values.propertyCategory,
          Boolean(values.hasParking)
        ),
    }),
    useCreateStepRules<FormDataProperty>({
      stepIndex: 3,
      watchFields: ["propertyCategory"],
      condition: (values) => !!values.propertyCategory,
      getConfig: (values) => getStepFourConfig(values.propertyCategory),
      onComplete: (values) => {
        if (values.propertyCategory === PROPERTY_CATEGORY.TERRENO) {
          toast.success("Paso 4 completado automáticamente por la categoría del inmueble");
        }
      }
    })

  ];

  return rules;
}
