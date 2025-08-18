// hooks/useStepRules.ts
import { FormDataProperty } from "@/src/types";
import { useControlStep } from "../hooks/useControlStep";
import { useCreateStepRules } from "./useCreateStepRule";

export function useStepRules() {
  const { getStepThreeConfig } = useControlStep();

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
  ];

  return rules;
}
