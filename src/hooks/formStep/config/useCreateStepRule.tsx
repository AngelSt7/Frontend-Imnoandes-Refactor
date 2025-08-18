/** Hook para crear reglas de validación */
import { FieldValues } from "react-hook-form";
import { StepRule } from "../hooks/useStepUpdater";

export function useCreateStepRules<T extends FieldValues>(
  rule: StepRule<T>
): StepRule<T> {
  return rule;
}