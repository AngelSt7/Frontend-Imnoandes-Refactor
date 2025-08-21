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
      watchFields: ["property_category", "hasParking"],
      condition: (values) => !!values.property_category,
      getConfig: (values) =>
        getStepThreeConfig(
          values.property_category,
          Boolean(values.hasParking)
        ),
    }),
    useCreateStepRules<FormDataProperty>({
      stepIndex: 3,
      watchFields: ["property_category"],
      condition: (values) => !!values.property_category,
      getConfig: (values) => getStepFourConfig(values.property_category),
      onComplete: (values) => {
        if (values.property_category === PROPERTY_CATEGORY.TERRENO) {
          toast.success("Paso 4 completado automáticamente por la categoría del inmueble");
        }
      }
    })

  ];

  return rules;
}
